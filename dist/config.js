process.loadEnvFile();
function envOrThrow(key) {
    const val = process.env[key];
    if (!val) {
        throw new Error(`Missing environment variable: ${key}`);
    }
    return val;
}
const migrationConfig = {
    migrationsFolder: "./src/db/migrations",
};
export const apiConfig = {
    fileserverHits: 0,
    db: {
        url: envOrThrow("DB_URL"),
        migrationConfig: migrationConfig,
    },
    platform: envOrThrow("PLATFORM"),
    jwtSecret: envOrThrow("JWT_SECRET"),
    polkaKey: envOrThrow("POLKA_KEY"),
};
