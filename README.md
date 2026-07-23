<a id="top"></a>

<p align="center">
  <img src="src/app/assets/logo.png" alt="Chirpy Logo" width="180">
  <br>
  <img src="assets/logo.png" alt="Boot.dev" width="160">
</p>

<h1 align="center">Chirpy — Backend REST API</h1>

<p align="center">
  <strong>A TypeScript REST API featuring JWT authentication, database migrations with Drizzle ORM, and webhooks.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-22.14-339933?logo=node.js&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/TypeScript-7.0-3178C6?logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Express-5.x-000000?logo=express&logoColor=white" alt="Express">
  <img src="https://img.shields.io/badge/PostgreSQL-15+-4169E1?logo=postgresql&logoColor=white" alt="PostgreSQL">
  <img src="https://img.shields.io/badge/Drizzle_ORM-0.45-C5F74F?logo=drizzle&logoColor=black" alt="Drizzle ORM">
  <img src="https://img.shields.io/badge/License-ISC-blue" alt="License">
</p>

<p align="center">
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-usage">Usage</a> •
  <a href="#-features">Features</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-certificate">Certificate</a>
</p>

---

## 📖 Project Overview

Chirpy is a backend REST API that mimics a microblogging platform (like Twitter). Users can register, log in, post short messages called **"chirps"** (max 140 characters), and manage their accounts — all through a clean RESTful JSON API.

This project was built as the capstone for the **[Learn HTTP Servers in TypeScript](https://www.boot.dev)** course on **[Boot.dev](https://www.boot.dev)**, covering everything from basic routing and middleware to full authentication, authorization, and webhook integrations.

---

## 📚 Course Chapters Completed

| #  | Chapter            | What I Learned | Status |
| -- | ------------------ | -------------- | :----: |
| 1  | **Servers**        | Basics of web servers, and why TypeScript is great for building them | ✅ |
| 2  | **Routing**        | HTTP routing basics and building a router using Express | ✅ |
| 3  | **Architecture**   | Different web architectures and how to choose the right one | ✅ |
| 4  | **JSON**           | Parsing and sending JSON data from a TypeScript server | ✅ |
| 5  | **Error Handling** | Effectively handling errors in a TypeScript server | ✅ |
| 6  | **Storage**        | Adding a PostgreSQL database, data storage, and database migrations | ✅ |
| 7  | **Authentication** | Building an auth system using JWTs from scratch, comparing to other methods | ✅ |
| 8  | **Authorization**  | How authorization differs from authentication and how to implement it | ✅ |
| 9  | **Webhooks**       | A special kind of HTTP handler used often in modern web apps | ✅ |
| 10 | **Documentation**  | Why documentation matters, and tools to help write good docs | ✅ |

---

## ✨ Features

- 🔐 **User Authentication** — Register, login, and manage accounts with secure password hashing (Argon2)
- 🎫 **JWT Access Tokens** — Short-lived access tokens (1 hour) for API authorization
- 🔄 **Refresh Tokens** — Long-lived refresh tokens (60 days) with revocation support
- 📝 **Chirps (Posts)** — Create, read, list, and delete short messages (max 140 characters)
- 🚫 **Profanity Filter** — Automatic censoring of inappropriate words
- 🔍 **Filtering & Sorting** — Query chirps by author and sort by date (asc/desc)
- 🪝 **Webhook Integration** — Polka webhook endpoint for premium user upgrades (Chirpy Red)
- 🛡️ **Authorization** — Users can only delete their own chirps
- 📊 **Admin Dashboard** — Metrics and reset endpoints (dev mode only)
- ⚕️ **Health Check** — `/api/healthz` endpoint for monitoring
- 🗄️ **Database Migrations** — Automated schema management with Drizzle Kit
- ⚠️ **Centralized Error Handling** — Consistent JSON error responses with proper HTTP status codes

---

## 🧠 How It Works

```
┌──────────┐       HTTP        ┌─────────────────┐       SQL        ┌────────────┐
│  Client  │  ◄──────────────► │  Express Server  │ ◄──────────────► │ PostgreSQL │
│ (cURL /  │   JSON REST API   │  (TypeScript)    │   Drizzle ORM    │  Database  │
│ Postman) │                   └────────┬─────────┘                  └────────────┘
└──────────┘                            │
                                        ├── Middleware (logging, metrics, static files)
                                        ├── Routes (/api/users, /api/chirps, /api/login, ...)
                                        ├── Auth (JWT creation/validation, Argon2 hashing)
                                        └── Error Handler (centralized, typed errors)
```

1. **Request comes in** → Express middleware logs the response and tracks file server hits
2. **Routing** → The request is matched to the appropriate handler (users, chirps, auth, webhooks, admin)
3. **Authentication** → Protected routes extract and validate JWT from the `Authorization: Bearer` header
4. **Business Logic** → Input validation, profanity filtering, authorization checks
5. **Database** → Drizzle ORM executes type-safe queries against PostgreSQL
6. **Response** → JSON response with appropriate HTTP status code, or a typed error

---

## 🛠 Tech Stack

| Layer            | Technology                          | Purpose                          |
| ---------------- | ----------------------------------- | -------------------------------- |
| **Runtime**      | Node.js 22.14                       | JavaScript runtime               |
| **Language**     | TypeScript 7                        | Type-safe development            |
| **Framework**    | Express 5                           | HTTP server & routing            |
| **ORM**          | Drizzle ORM + Drizzle Kit           | Type-safe queries & migrations   |
| **Database**     | PostgreSQL                          | Persistent data storage          |
| **Auth**         | JWT (`jsonwebtoken`) + Argon2       | Token auth & password hashing    |
| **Testing**      | Vitest                              | Fast unit testing                |

---

## 🖥️ Development Environment

This project was developed on **Windows with WSL** (Windows Subsystem for Linux), providing a native Linux development experience.

### Tools Used

<table>
  <tr>
    <td align="center" width="120">
      <img src="assets/linux.svg" alt="Linux" width="48"><br>
      <strong>Linux</strong><br>
      <sub>WSL Runtime</sub>
    </td>
    <td align="center" width="120">
      <img src="assets/ubuntu.svg" alt="Ubuntu" width="48"><br>
      <strong>Ubuntu</strong><br>
      <sub>WSL Distro</sub>
    </td>
    <td align="center" width="120">
      <img src="assets/terminal.svg" alt="Terminal" width="48"><br>
      <strong>Terminal</strong><br>
      <sub>CLI Interface</sub>
    </td>
    <td align="center" width="120">
      <img src="assets/git.svg" alt="Git" width="48"><br>
      <strong>Git</strong><br>
      <sub>Version Control</sub>
    </td>
    <td align="center" width="120">
      <img src="assets/github.svg" alt="GitHub" width="48"><br>
      <strong>GitHub</strong><br>
      <sub>Repository</sub>
    </td>
  </tr>
</table>

### Prerequisites

| Requirement                    | Version  | Notes                          |
| ------------------------------ | -------- | ------------------------------ |
| **WSL 2** (or native Linux)    | Latest   | Ubuntu distro recommended      |
| **Node.js**                    | ≥ 22.14  | See `.nvmrc` for exact version |
| **PostgreSQL**                 | ≥ 15     | Local or remote instance       |
| **npm**                        | ≥ 10     | Comes with Node.js             |
| **Git**                        | Latest   | Version control                |

### Environment Variables

Create a `.env` file based on `.env.example`:

| Variable     | Description                                    | Example                                                             |
| ------------ | ---------------------------------------------- | ------------------------------------------------------------------- |
| `DB_URL`     | PostgreSQL connection string                   | `postgres://postgres:postgres@localhost:5432/chirpy?sslmode=disable` |
| `PLATFORM`   | Running environment (`dev` enables admin reset) | `dev`                                                               |
| `JWT_SECRET` | Secret key used to sign JWTs                   | `your_jwt_secret_here`                                              |
| `POLKA_KEY`  | API key for the Polka webhook integration      | `your_polka_key_here`                                               |

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/waleedtarbosh/chirpy-backend-rest-api.git
cd chirpy-backend-rest-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment

```bash
cp .env.example .env
# Edit .env with your database credentials and secrets
```

### 4. Set up the database

```bash
# Create the database (if it doesn't exist)
createdb chirpy

# Run migrations
npm run migrate
```

### 5. Start the server

```bash
npm run dev
```

✅ Server is now running at **`http://localhost:8080`**

---

## 🎮 Usage

### API Endpoints Overview

> 🔐 = Requires authentication &nbsp;&nbsp;|&nbsp;&nbsp; 🌐 = Public (no auth needed) &nbsp;&nbsp;|&nbsp;&nbsp; 🔑 = API Key required

#### Health

| Method | Endpoint       | Auth        | Description    |
| ------ | -------------- | ----------- | -------------- |
| `GET`  | `/api/healthz` | 🌐 Public   | Health check   |

#### Users

| Method | Endpoint     | Auth           | Description       |
| ------ | ------------ | -------------- | ----------------- |
| `POST` | `/api/users` | 🌐 Public      | Register new user |
| `PUT`  | `/api/users` | 🔐 Bearer JWT  | Update user       |

#### Authentication

| Method | Endpoint       | Auth              | Description           |
| ------ | -------------- | ----------------- | --------------------- |
| `POST` | `/api/login`   | 🌐 Public         | Login & get tokens    |
| `POST` | `/api/refresh` | 🔐 Bearer Refresh | Get new access token  |
| `POST` | `/api/revoke`  | 🔐 Bearer Refresh | Revoke refresh token  |

#### Chirps

| Method   | Endpoint              | Auth          | Description         |
| -------- | --------------------- | ------------- | ------------------- |
| `POST`   | `/api/chirps`         | 🔐 Bearer JWT | Create a chirp      |
| `GET`    | `/api/chirps`         | 🌐 Public     | List all chirps     |
| `GET`    | `/api/chirps/:id`     | 🌐 Public     | Get chirp by ID     |
| `DELETE` | `/api/chirps/:id`     | 🔐 Bearer JWT | Delete own chirp    |

> **Query Params for `GET /api/chirps`:**
> - `authorId` — filter by user UUID
> - `sort` — `asc` (default) or `desc`

#### Webhooks

| Method | Endpoint               | Auth           | Description                |
| ------ | ---------------------- | -------------- | -------------------------- |
| `POST` | `/api/polka/webhooks`  | 🔑 ApiKey      | Polka user upgrade webhook |

#### Admin (dev mode only)

| Method | Endpoint          | Auth        | Description                          |
| ------ | ----------------- | ----------- | ------------------------------------ |
| `GET`  | `/admin/metrics`  | 🌐 Public   | View file server hit count           |
| `POST` | `/admin/reset`    | 🌐 Public   | Delete all users & reset hit counter |

### 📬 How to Test with Postman (Step-by-Step)

> Make sure the server is running first: `npm run dev`
> Base URL: `http://localhost:8080`

---

<details>
<summary><strong>Step 1: 🏥 Health Check — Make sure the server is alive</strong></summary>

| Setting | Value |
|---------|-------|
| **Method** | `GET` |
| **URL** | `http://localhost:8080/api/healthz` |

No Body or Headers needed. Just press **Send**.

**✅ Expected Response** — Status `200 OK`:
```
OK
```

</details>

---

<details>
<summary><strong>Step 2: 📝 Register a New User</strong></summary>

| Setting | Value |
|---------|-------|
| **Method** | `POST` |
| **URL** | `http://localhost:8080/api/users` |

**Body tab:**
1. Select **raw**
2. Change the dropdown from `Text` to **JSON**
3. Paste:
```json
{
  "email": "waleed@test.com",
  "password": "123456"
}
```

Press **Send**.

**✅ Expected Response** — Status `201 Created`:
```json
{
  "id": "e80f21f7-...",
  "createdAt": "2026-07-22T...",
  "updatedAt": "2026-07-22T...",
  "email": "waleed@test.com",
  "isChirpyRed": false
}
```

> 📌 Save the `id` — you'll need it later.

</details>

---

<details>
<summary><strong>Step 3: 🔑 Login — Get Your Tokens</strong></summary>

| Setting | Value |
|---------|-------|
| **Method** | `POST` |
| **URL** | `http://localhost:8080/api/login` |

**Body tab** → **raw** → **JSON**:
```json
{
  "email": "waleed@test.com",
  "password": "123456"
}
```

Press **Send**.

**✅ Expected Response** — Status `200 OK`:
```json
{
  "id": "e80f21f7-...",
  "createdAt": "...",
  "updatedAt": "...",
  "email": "waleed@test.com",
  "isChirpyRed": false,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "refreshToken": "cc5a9d13ce7db7db360f..."
}
```

> ⚠️ **IMPORTANT:** Copy the `token` value — you'll need it for all 🔐 protected endpoints!
>
> - `token` = Access Token (expires in **1 hour**)
> - `refreshToken` = Refresh Token (expires in **60 days**)

</details>

---

<details>
<summary><strong>Step 4: 🐦 Create a Chirp (requires token)</strong></summary>

| Setting | Value |
|---------|-------|
| **Method** | `POST` |
| **URL** | `http://localhost:8080/api/chirps` |

**Headers tab** — Add a new header:

| Key | Value |
|-----|-------|
| `Authorization` | `Bearer <paste_your_token_here>` |

> ⚠️ Make sure there is **one space** between `Bearer` and the token.

**Body tab** → **raw** → **JSON**:
```json
{
  "body": "Hello from Chirpy! 🐦 My first chirp!"
}
```

Press **Send**.

**✅ Expected Response** — Status `201 Created`:
```json
{
  "id": "a1b2c3d4-...",
  "createdAt": "2026-07-22T...",
  "updatedAt": "2026-07-22T...",
  "body": "Hello from Chirpy! 🐦 My first chirp!",
  "userId": "e80f21f7-..."
}
```

> 📌 Save the chirp `id` if you want to delete it later.
>
> 💡 **Note:** Chirps have a max of **140 characters**. Words like `kerfuffle`, `sharbert`, and `fornax` will be replaced with `****`.

</details>

---

<details>
<summary><strong>Step 5: 📋 List All Chirps (no token needed)</strong></summary>

| Setting | Value |
|---------|-------|
| **Method** | `GET` |
| **URL** | `http://localhost:8080/api/chirps` |

No Body or Headers needed. Just press **Send**.

**✅ Expected Response** — Status `200 OK`:
```json
[
  {
    "id": "a1b2c3d4-...",
    "createdAt": "...",
    "updatedAt": "...",
    "body": "Hello from Chirpy! 🐦 My first chirp!",
    "userId": "e80f21f7-..."
  }
]
```

**Optional Query Parameters:**

| URL | What it does |
|-----|-------------|
| `/api/chirps?sort=desc` | Newest chirps first |
| `/api/chirps?sort=asc` | Oldest chirps first (default) |
| `/api/chirps?authorId=<user_id>` | Only chirps from a specific user |

</details>

---

<details>
<summary><strong>Step 6: 🔍 Get a Single Chirp by ID (no token needed)</strong></summary>

| Setting | Value |
|---------|-------|
| **Method** | `GET` |
| **URL** | `http://localhost:8080/api/chirps/<chirp_id>` |

Replace `<chirp_id>` with the actual chirp ID from Step 5.

No Body or Headers needed. Just press **Send**.

**✅ Expected Response** — Status `200 OK`:
```json
{
  "id": "a1b2c3d4-...",
  "createdAt": "...",
  "updatedAt": "...",
  "body": "Hello from Chirpy! 🐦 My first chirp!",
  "userId": "e80f21f7-..."
}
```

</details>

---

<details>
<summary><strong>Step 7: 🗑️ Delete a Chirp (requires token — must be your chirp)</strong></summary>

| Setting | Value |
|---------|-------|
| **Method** | `DELETE` |
| **URL** | `http://localhost:8080/api/chirps/<chirp_id>` |

Replace `<chirp_id>` with the chirp ID you want to delete.

**Headers tab:**

| Key | Value |
|-----|-------|
| `Authorization` | `Bearer <paste_your_token_here>` |

No Body needed. Press **Send**.

**✅ Expected Response** — Status `204 No Content` (empty body = success!)

**❌ Error Responses:**
- `401 Unauthorized` — Token missing or invalid
- `403 Forbidden` — You're trying to delete someone else's chirp
- `404 Not Found` — Chirp ID doesn't exist

</details>

---

<details>
<summary><strong>Step 8: ✏️ Update Your Profile (requires token)</strong></summary>

| Setting | Value |
|---------|-------|
| **Method** | `PUT` |
| **URL** | `http://localhost:8080/api/users` |

**Headers tab:**

| Key | Value |
|-----|-------|
| `Authorization` | `Bearer <paste_your_token_here>` |

**Body tab** → **raw** → **JSON**:
```json
{
  "email": "new-email@test.com",
  "password": "newpassword123"
}
```

Press **Send**.

**✅ Expected Response** — Status `200 OK`:
```json
{
  "id": "e80f21f7-...",
  "createdAt": "...",
  "updatedAt": "2026-07-22T...",
  "email": "new-email@test.com",
  "isChirpyRed": false
}
```

</details>

---

<details>
<summary><strong>Step 9: 🔄 Refresh Your Access Token</strong></summary>

When your access token expires (after 1 hour), use the refresh token to get a new one.

| Setting | Value |
|---------|-------|
| **Method** | `POST` |
| **URL** | `http://localhost:8080/api/refresh` |

**Headers tab:**

| Key | Value |
|-----|-------|
| `Authorization` | `Bearer <paste_your_REFRESH_token_here>` |

> ⚠️ Use the **refreshToken** here, NOT the access token!

No Body needed. Press **Send**.

**✅ Expected Response** — Status `200 OK`:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

> Use this new `token` for future 🔐 protected requests.

</details>

---

<details>
<summary><strong>Step 10: 🚪 Revoke a Refresh Token (Logout)</strong></summary>

| Setting | Value |
|---------|-------|
| **Method** | `POST` |
| **URL** | `http://localhost:8080/api/revoke` |

**Headers tab:**

| Key | Value |
|-----|-------|
| `Authorization` | `Bearer <paste_your_REFRESH_token_here>` |

No Body needed. Press **Send**.

**✅ Expected Response** — Status `204 No Content` (empty body = success!)

> After revoking, the refresh token can no longer be used to get new access tokens.

</details>

---

### Auth Legend

> 🌐 = Public (no auth needed) &nbsp;&nbsp;|&nbsp;&nbsp; 🔐 = Requires `Authorization: Bearer <token>` &nbsp;&nbsp;|&nbsp;&nbsp; 🔑 = Requires `Authorization: ApiKey <key>`

### cURL Examples

<details>
<summary>📝 Register a new user</summary>

```bash
curl -X POST http://localhost:8080/api/users \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "securepassword"}'
```

**Response:** `201 Created`

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "createdAt": "2026-01-01T00:00:00.000Z",
  "updatedAt": "2026-01-01T00:00:00.000Z",
  "email": "user@example.com",
  "isChirpyRed": false
}
```

</details>

<details>
<summary>🔑 Login</summary>

```bash
curl -X POST http://localhost:8080/api/login \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "securepassword"}'
```

**Response:** `200 OK`

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "createdAt": "...",
  "updatedAt": "...",
  "email": "user@example.com",
  "isChirpyRed": false,
  "token": "<jwt_access_token>",
  "refreshToken": "<refresh_token>"
}
```

</details>

<details>
<summary>🐦 Create a chirp</summary>

```bash
curl -X POST http://localhost:8080/api/chirps \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <access_token>" \
  -d '{"body": "Hello, world!"}'
```

**Response:** `201 Created`

```json
{
  "id": "a1b2c3d4-...",
  "createdAt": "...",
  "updatedAt": "...",
  "body": "Hello, world!",
  "userId": "550e8400-..."
}
```

</details>

<details>
<summary>📋 List chirps with filters</summary>

```bash
# All chirps, newest first
curl "http://localhost:8080/api/chirps?sort=desc"

# Chirps by a specific author
curl "http://localhost:8080/api/chirps?authorId=550e8400-e29b-41d4-a716-446655440000"
```

**Response:** `200 OK`

```json
[
  {
    "id": "a1b2c3d4-...",
    "body": "Hello, world!",
    "userId": "550e8400-..."
  }
]
```

</details>

<details>
<summary>🗑️ Delete a chirp</summary>

```bash
curl -X DELETE http://localhost:8080/api/chirps/<chirp_id> \
  -H "Authorization: Bearer <access_token>"
```

**Response:** `204 No Content`

</details>

<details>
<summary>🔄 Refresh access token</summary>

```bash
curl -X POST http://localhost:8080/api/refresh \
  -H "Authorization: Bearer <refresh_token>"
```

**Response:** `200 OK`

```json
{
  "token": "<new_jwt_access_token>"
}
```

</details>

<details>
<summary>🚪 Revoke refresh token</summary>

```bash
curl -X POST http://localhost:8080/api/revoke \
  -H "Authorization: Bearer <refresh_token>"
```

**Response:** `204 No Content`

</details>

### Error Responses

All errors return a consistent JSON shape:

```json
{ "error": "Error message here" }
```

| Status | Meaning           | Common Cause |
| ------ | ----------------- | ------------ |
| `400`  | Bad Request       | Chirp body exceeds 140 characters |
| `401`  | Unauthorized      | Missing/invalid/expired token |
| `403`  | Forbidden         | Trying to delete another user's chirp, or admin reset in production |
| `404`  | Not Found         | Chirp or user doesn't exist |
| `500`  | Internal Error    | Server-side issue |

---

## 🏗️ Project Structure

```
chirpy-backend-rest-api/
│
├── 📁 assets/                     # README assets & media
│   ├── 🖼️ git.svg                # Git icon
│   ├── 🖼️ github.svg             # GitHub icon
│   ├── 🖼️ linux.svg              # Linux icon
│   ├── 🖼️ logo.png               # Boot.dev logo
│   ├── 🖼️ profile.webp           # Profile picture
│   ├── 🖼️ terminal.svg           # Terminal icon
│   └── 🖼️ ubuntu.svg             # Ubuntu icon
│
├── 📁 src/
│   ├── 📄 index.ts                # Express app entry point & all route definitions
│   ├── 📄 config.ts               # Environment config loader (reads .env)
│   ├── 📄 auth.ts                 # Auth helpers: JWT, Argon2, token extraction
│   ├── 📄 auth.test.ts            # Unit tests for auth module
│   │
│   ├── 📁 app/                    # Static file server (served at /app)
│   │   ├── 📄 index.html          # Welcome page
│   │   └── 📁 assets/
│   │       └── 🖼️ logo.png        # Chirpy logo
│   │
│   └── 📁 db/
│       ├── 📄 index.ts            # Drizzle DB connection setup
│       ├── 📄 schema.ts           # Database table definitions (users, chirps, refresh_tokens)
│       ├── 📁 migrations/         # SQL migration files (auto-generated by Drizzle Kit)
│       └── 📁 queries/
│           ├── 📄 users.ts        # User CRUD operations
│           ├── 📄 chirps.ts       # Chirp CRUD operations
│           └── 📄 refreshTokens.ts # Refresh token operations
│
├── 📄 drizzle.config.ts           # Drizzle Kit configuration
├── 📄 tsconfig.json               # TypeScript compiler configuration
├── 📄 package.json                # Dependencies & scripts
├── 📄 .env.example                # Example environment variables
├── 📄 .gitignore                  # Git ignore rules
└── 📄 .nvmrc                      # Node.js version pinning (22.14.0)
```

---

## 🔧 Command Reference

| Command             | Description                                    |
| ------------------- | ---------------------------------------------- |
| `npm run dev`       | 🔨 Compile TypeScript and run the server       |
| `npm run build`     | 📦 Compile TypeScript to `dist/`               |
| `npm start`         | 🚀 Run the compiled server from `dist/`        |
| `npm run generate`  | 🗂️ Generate new Drizzle migration files        |
| `npm run migrate`   | 📊 Apply pending database migrations           |
| `npm test`          | 🧪 Run tests with Vitest                       |

---

## 🧪 Testing

```bash
npm test
```

Tests are written with **Vitest** and currently cover:

| Test Suite           | What It Tests                                      |
| -------------------- | -------------------------------------------------- |
| Password Hashing     | Argon2 hash creation & correct/incorrect verification |
| JWT Authentication   | Token creation, validation, wrong secret rejection, and expiration |

To run tests in watch mode during development:

```bash
npx vitest
```

---

## 🔮 Future Improvements

- [ ] Add rate limiting middleware to prevent abuse
- [ ] Implement pagination for the chirps list endpoint
- [ ] Add user profile endpoints (get user by ID, avatar upload)
- [ ] Add OpenAPI / Swagger documentation auto-generation
- [ ] Implement "like" / "retweet" functionality for chirps
- [ ] Add WebSocket support for real-time chirp feeds
- [ ] Containerize with Docker & Docker Compose
- [ ] Add CI/CD pipeline (GitHub Actions)
- [ ] Expand test coverage (integration tests, API endpoint tests)
- [ ] Add request validation middleware (e.g., Zod schemas)

---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

Please make sure your code:
- Passes all existing tests (`npm test`)
- Follows the existing TypeScript code style
- Includes tests for new functionality

---

## 🎓 Certificate

✅ **Course Completed!**

🔗 [**View My Certificate**](https://www.boot.dev/certificates/a6c4d9d7-17db-4361-9905-7e32612be451)

> This certificate verifies the successful completion of the **Learn HTTP Servers in TypeScript** course on Boot.dev, covering servers, routing, architecture, JSON, error handling, storage, authentication, authorization, webhooks, and documentation.

---

## 👨‍💻 About Me

<p align="center">
  <img src="assets/profile.webp" alt="Profile" width="120" style="border-radius: 50%;">
</p>

I'm a developer learning backend development through the **[Boot.dev](https://www.boot.dev)** curriculum. This project represents my journey through building production-grade HTTP servers with TypeScript.

<p align="center">
  <a href="https://www.boot.dev">🌐 Boot.dev Profile</a>
  &nbsp;&nbsp;•&nbsp;&nbsp;
  <a href="https://github.com/waleedtarbosh"><img src="assets/github.svg" alt="GitHub" width="16"> GitHub</a>
</p>

---

<p align="center">
  <img src="assets/logo.png" alt="Boot.dev" width="120">
  <br><br>
  Built with ❤️ as part of the <a href="https://www.boot.dev"><strong>Boot.dev</strong></a> curriculum
</p>

<p align="center">
  <a href="#top">⬆️ Back to Top</a>
</p>
