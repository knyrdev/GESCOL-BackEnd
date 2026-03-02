/**
 * Centralized JWT configuration.
 *
 * All modules that need JWT constants must import from here —
 * never define them inline or duplicate them across files.
 *
 * @module config/jwt
 */

export const JWT_SECRET =
    process.env.JWT_SECRET || "escuela-jwt-secret-key-2024-development"

export const JWT_REFRESH_SECRET =
    process.env.JWT_REFRESH_SECRET || "escuela-refresh-secret-key-2024-development"

/** Access token lifetime (used in jwt.sign) */
export const JWT_ACCESS_EXPIRES_IN = "24h"

/** Refresh token lifetime (used in jwt.sign) */
export const JWT_REFRESH_EXPIRES_IN = "7d"
