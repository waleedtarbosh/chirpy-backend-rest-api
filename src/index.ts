import express, { Request, Response, NextFunction } from "express";
import { apiConfig } from "./config.js";

import postgres from "postgres";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { drizzle } from "drizzle-orm/postgres-js";

import { createUser, deleteAllUsers, getUserByEmail, updateUser, upgradeUserToChirpyRed } from "./db/queries/users.js";
import { createChirp, getAllChirps, getChirpById, deleteChirp } from "./db/queries/chirps.js";
import { createRefreshToken, getRefreshToken, revokeRefreshToken } from "./db/queries/refreshTokens.js";
import { hashPassword, checkPasswordHash, getBearerToken, validateJWT, makeJWT, makeRefreshToken, getAPIKey } from "./auth.js";

const migrationClient = postgres(apiConfig.db.url, { max: 1 });
await migrate(drizzle(migrationClient), apiConfig.db.migrationConfig);
console.log("Database migrated successfully!");

class BadRequestError extends Error { constructor(message: string) { super(message); } }
class UnauthorizedError extends Error { constructor(message: string) { super(message); } }
class ForbiddenError extends Error { constructor(message: string) { super(message); } }
class NotFoundError extends Error { constructor(message: string) { super(message); } }

const app = express();
const PORT = 8080;

const middlewareLogResponses = (req: Request, res: Response, next: NextFunction) => {
  res.on("finish", () => {
    if (res.statusCode >= 400) {
      console.log(`[NON-OK] ${req.method} ${req.url} - Status: ${res.statusCode}`);
    }
  });
  next();
};

app.use(middlewareLogResponses);

const middlewareMetricsInc = (req: Request, res: Response, next: NextFunction) => {
  apiConfig.fileserverHits++;
  next();
};

app.use("/app", middlewareMetricsInc, express.static("./src/app"));

app.get("/api/healthz", (req: Request, res: Response) => {
  res.set("Content-Type", "text/plain; charset=utf-8");
  res.status(200).send("OK");
});


app.post("/api/chirps", (req: Request, res: Response, next: NextFunction) => {
  let bodyData = "";
  req.on("data", (chunk) => { bodyData += chunk; });

  req.on("end", async () => {
    try {
      const token = getBearerToken(req);
      const userId = validateJWT(token, apiConfig.jwtSecret);

      const parsedBody = JSON.parse(bodyData);
      
      if (parsedBody.body.length > 140) {
        throw new BadRequestError("Chirp is too long. Max length is 140");
      }

      const profaneWords = ["kerfuffle", "sharbert", "fornax"];
      const words = parsedBody.body.split(" ");
      const cleanedWords = words.map((word: string) => {
        if (profaneWords.includes(word.toLowerCase())) { return "****"; }
        return word;
      });
      const cleanedBody = cleanedWords.join(" ");

      const newChirp = await createChirp({
        body: cleanedBody,
        userId: userId
      });

      res.status(201).json(newChirp);
    } catch (error) {
      if (error instanceof Error && (error.message.includes("jwt") || error.message.includes("Token") || error.message.includes("Authorization"))) {
        return next(new UnauthorizedError("Unauthorized"));
      }
      next(error);
    }
  });
});

app.get("/api/chirps", async (req: Request, res: Response, next: NextFunction) => {
  try {
    let authorId: string | undefined = undefined;
    const authorIdQuery = req.query.authorId;
    if (typeof authorIdQuery === "string") {
      authorId = authorIdQuery;
    }

    let sortOrder = "asc";
    const sortQuery = req.query.sort;
    if (typeof sortQuery === "string" && (sortQuery === "asc" || sortQuery === "desc")) {
      sortOrder = sortQuery;
    }

    const chirpsList = await getAllChirps(authorId);

    chirpsList.sort((a, b) => {
      const timeA = new Date(a.createdAt).getTime();
      const timeB = new Date(b.createdAt).getTime();

      if (sortOrder === "desc") {
        return timeB - timeA; 
      } else {
        return timeA - timeB;
      }
    });

    res.status(200).json(chirpsList);
  } catch (error) {
    next(error);
  }
});

app.get("/api/chirps/:chirpId", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const chirpId = req.params.chirpId as string;
    const chirp = await getChirpById(chirpId);
    
    if (!chirp) {
      throw new NotFoundError("Chirp not found");
    }

    res.status(200).json(chirp);
  } catch (error) {
    next(error);
  }
});

app.delete("/api/chirps/:chirpId", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = getBearerToken(req);
    const userId = validateJWT(token, apiConfig.jwtSecret);

    const chirpId = req.params.chirpId as string;
    const chirp = await getChirpById(chirpId);

    if (!chirp) {
      throw new NotFoundError("Chirp not found");
    }

    if (chirp.userId !== userId) {
      throw new ForbiddenError("Forbidden: You cannot delete another user's chirp");
    }

    await deleteChirp(chirpId);

    res.status(204).send();
  } catch (error) {
    if (error instanceof Error && (error.message.includes("jwt") || error.message.includes("Token") || error.message.includes("Authorization"))) {
      return next(new UnauthorizedError("Unauthorized"));
    }
    next(error);
  }
});



app.post("/api/users", (req: Request, res: Response, next: NextFunction) => {
  let bodyData = "";
  req.on("data", (chunk) => { bodyData += chunk; });
  
  req.on("end", async () => {
    try {
      const parsedBody = JSON.parse(bodyData);
      const hashedPassword = await hashPassword(parsedBody.password);
      
      const newUser = await createUser({ 
        email: parsedBody.email,
        hashedPassword: hashedPassword
      });

      const userResponse = {
        id: newUser.id,
        createdAt: newUser.createdAt,
        updatedAt: newUser.updatedAt,
        email: newUser.email,
        isChirpyRed: newUser.isChirpyRed
      };

      res.status(201).json(userResponse);
    } catch (error) {
      next(error); 
    }
  });
});

app.put("/api/users", (req: Request, res: Response, next: NextFunction) => {
  let bodyData = "";
  req.on("data", (chunk) => { bodyData += chunk; });

  req.on("end", async () => {
    try {
      const token = getBearerToken(req);
      const userId = validateJWT(token, apiConfig.jwtSecret);

      const parsedBody = JSON.parse(bodyData);
      const hashedPassword = await hashPassword(parsedBody.password);
      const updatedUser = await updateUser(userId, parsedBody.email, hashedPassword);

      if (!updatedUser) {
        throw new NotFoundError("User not found");
      }

      const userResponse = {
        id: updatedUser.id,
        createdAt: updatedUser.createdAt,
        updatedAt: updatedUser.updatedAt,
        email: updatedUser.email,
        isChirpyRed: updatedUser.isChirpyRed
      };

      res.status(200).json(userResponse);
    } catch (error) {
      if (error instanceof Error && (error.message.includes("jwt") || error.message.includes("Token") || error.message.includes("Authorization"))) {
        return next(new UnauthorizedError("Unauthorized"));
      }
      next(error);
    }
  });
});

app.post("/api/login", (req: Request, res: Response, next: NextFunction) => {
  let bodyData = "";
  req.on("data", (chunk) => { bodyData += chunk; });
  
  req.on("end", async () => {
    try {
      const parsedBody = JSON.parse(bodyData);
      const user = await getUserByEmail(parsedBody.email);
      
      if (!user) {
        throw new UnauthorizedError("incorrect email or password");
      }

      const isPasswordValid = await checkPasswordHash(parsedBody.password, user.hashedPassword);
      if (!isPasswordValid) {
        throw new UnauthorizedError("incorrect email or password");
      }

      const accessToken = makeJWT(user.id, 3600, apiConfig.jwtSecret);

      const refreshTokenString = makeRefreshToken();
      const expiresAt = new Date(Date.now() + 60 * 24 * 60 * 60 * 1000);

      await createRefreshToken({
        token: refreshTokenString,
        userId: user.id,
        expiresAt: expiresAt,
        revokedAt: null,
      });

      const userResponse = {
        id: user.id,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        email: user.email,
        isChirpyRed: user.isChirpyRed,
        token: accessToken,
        refreshToken: refreshTokenString,
      };

      res.status(200).json(userResponse);
    } catch (error) {
      next(error);
    }
  });
});

app.post("/api/refresh", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tokenString = getBearerToken(req);
    const dbToken = await getRefreshToken(tokenString);

    if (!dbToken) {
      throw new UnauthorizedError("Token not found");
    }

    if (dbToken.revokedAt || new Date() > new Date(dbToken.expiresAt)) {
      throw new UnauthorizedError("Token is expired or revoked");
    }

    const newAccessToken = makeJWT(dbToken.userId, 3600, apiConfig.jwtSecret);

    res.status(200).json({ token: newAccessToken });
  } catch (error) {
    if (error instanceof Error && (error.message.includes("Authorization") || error.message.includes("Token"))) {
      return next(new UnauthorizedError("Unauthorized"));
    }
    next(error);
  }
});

app.post("/api/revoke", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tokenString = getBearerToken(req);
    await revokeRefreshToken(tokenString);

    res.status(204).send();
  } catch (error) {
    if (error instanceof Error && error.message.includes("Authorization")) {
      return next(new UnauthorizedError("Unauthorized"));
    }
    next(error);
  }
});


app.post("/api/polka/webhooks", async (req: Request, res: Response, next: NextFunction) => {
  let bodyData = "";
  req.on("data", (chunk) => { bodyData += chunk; });

  req.on("end", async () => {
    try {
      const apiKey = getAPIKey(req);
      if (apiKey !== apiConfig.polkaKey) {
        throw new UnauthorizedError("Unauthorized API Key");
      }

      const parsedBody = JSON.parse(bodyData);

      if (parsedBody.event !== "user.upgraded") {
        res.status(204).send();
        return;
      }

      const userId = parsedBody.data?.userId;
      if (!userId) {
        throw new NotFoundError("User not found");
      }

      const upgradedUser = await upgradeUserToChirpyRed(userId);

      if (!upgradedUser) {
        throw new NotFoundError("User not found");
      }

      res.status(204).send();
    } catch (error) {
      if (error instanceof Error && (error.message.includes("Authorization") || error.message.includes("API Key"))) {
        return next(new UnauthorizedError("Unauthorized"));
      }
      next(error);
    }
  });
});



app.get("/admin/metrics", (req: Request, res: Response) => {
  res.set("Content-Type", "text/html; charset=utf-8");
  res.send(`<html>
  <body>
    <h1>Welcome, Chirpy Admin</h1>
    <p>Chirpy has been visited ${apiConfig.fileserverHits} times!</p>
  </body>
</html>`);
});

app.post("/admin/reset", async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (apiConfig.platform !== "dev") {
      throw new ForbiddenError("Forbidden");
    }

    await deleteAllUsers();
    apiConfig.fileserverHits = 0;
    res.status(200).send("OK");
  } catch (error) {
    next(error);
  }
});


app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof BadRequestError) {
    res.status(400).json({ error: err.message });
  } else if (err instanceof UnauthorizedError) {
    res.status(401).json({ error: err.message });
  } else if (err instanceof ForbiddenError) {
    res.status(403).json({ error: err.message });
  } else if (err instanceof NotFoundError) {
    res.status(404).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({
      error: "Something went wrong on our end"
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});