/**
 * AppError — Custom operational error class.
 *
 * Distinguishes between:
 *  - Operational errors: known, expected failures (invalid input, not found, etc.)
 *    → isOperational = true → shown to the client with a descriptive message.
 *  - Programming errors: bugs (undefined property, type errors, etc.)
 *    → isOperational = false → client receives a generic 500 message, full error goes to logs.
 */
export class AppError extends Error {
    /**
     * @param {string}  message     Human-readable error message (sent to client for operational errors).
     * @param {number}  statusCode  HTTP status code (400, 401, 403, 404, 409, 422, 500 …).
     * @param {string}  [code]      Optional machine-readable error code (e.g. "USER_NOT_FOUND").
     */
    constructor(message, statusCode, code = null) {
        super(message)

        this.statusCode = statusCode
        this.status = statusCode >= 500 ? "error" : "fail"
        this.isOperational = true
        this.code = code

        // Capture the stack trace, excluding the constructor call
        Error.captureStackTrace(this, this.constructor)
    }
}

// ─── Factory helpers for common HTTP errors ────────────────────────────────

/** 400 Bad Request */
export const badRequest = (message, code = "BAD_REQUEST") =>
    new AppError(message, 400, code)

/** 401 Unauthorized */
export const unauthorized = (message = "Unauthorized", code = "UNAUTHORIZED") =>
    new AppError(message, 401, code)

/** 403 Forbidden */
export const forbidden = (message = "Forbidden", code = "FORBIDDEN") =>
    new AppError(message, 403, code)

/** 404 Not Found */
export const notFound = (message, code = "NOT_FOUND") =>
    new AppError(message, 404, code)

/** 409 Conflict */
export const conflict = (message, code = "CONFLICT") =>
    new AppError(message, 409, code)

/** 422 Unprocessable Entity (validation) */
export const unprocessable = (message, code = "VALIDATION_ERROR") =>
    new AppError(message, 422, code)
