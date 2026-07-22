import { describe, it, expect, beforeAll } from "vitest";
import { hashPassword, checkPasswordHash, makeJWT, validateJWT } from "./auth.js";
describe("Password Hashing", () => {
    const password1 = "correctPassword123!";
    const password2 = "anotherPassword456!";
    let hash1;
    beforeAll(async () => {
        hash1 = await hashPassword(password1);
    });
    it("should return true for the correct password", async () => {
        const result = await checkPasswordHash(password1, hash1);
        expect(result).toBe(true);
    });
    it("should return false for the incorrect password", async () => {
        const result = await checkPasswordHash(password2, hash1);
        expect(result).toBe(false);
    });
});
describe("JWT Authentication", () => {
    const secret = "super-secret-key-for-testing";
    const wrongSecret = "the-wrong-secret-key";
    const userID = "123e4567-e89b-12d3-a456-426614174000";
    it("should create and successfully validate a correct JWT", () => {
        const token = makeJWT(userID, 3600, secret);
        const decodedUserID = validateJWT(token, secret);
        expect(decodedUserID).toBe(userID);
    });
    it("should reject a token signed with the wrong secret", () => {
        const token = makeJWT(userID, 3600, secret);
        expect(() => validateJWT(token, wrongSecret)).toThrow();
    });
    it("should reject an expired token", () => {
        const token = makeJWT(userID, -3600, secret);
        expect(() => validateJWT(token, secret)).toThrow();
    });
});
