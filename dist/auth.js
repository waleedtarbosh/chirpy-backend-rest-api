import * as argon2 from "argon2";
import jwt from "jsonwebtoken";
import * as crypto from "crypto";
export async function hashPassword(password) {
    return await argon2.hash(password);
}
export async function checkPasswordHash(password, hash) {
    return await argon2.verify(hash, password);
}
export function makeJWT(userID, expiresIn, secret) {
    const iat = Math.floor(Date.now() / 1000);
    const exp = iat + expiresIn;
    const payload = {
        iss: "chirpy",
        sub: userID,
        iat: iat,
        exp: exp
    };
    return jwt.sign(payload, secret);
}
export function validateJWT(tokenString, secret) {
    const decoded = jwt.verify(tokenString, secret);
    if (!decoded.sub) {
        throw new Error("Invalid token payload: missing subject");
    }
    return decoded.sub;
}
export function getBearerToken(req) {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
        throw new Error("Authorization header is missing");
    }
    const parts = authHeader.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
        throw new Error("Invalid Authorization header format");
    }
    return parts[1];
}
export function makeRefreshToken() {
    return crypto.randomBytes(32).toString("hex");
}
export function getAPIKey(req) {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
        throw new Error("Authorization header is missing");
    }
    const parts = authHeader.split(" ");
    if (parts.length !== 2 || parts[0] !== "ApiKey") {
        throw new Error("Invalid Authorization header format");
    }
    return parts[1];
}
