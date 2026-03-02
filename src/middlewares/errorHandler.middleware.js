import { AppError } from "../utils/AppError.js"

/**
 * Translate known PostgreSQL error codes into user-friendly AppErrors.
 * @param {Error} err
 * @returns {AppError}
 */
const handleDbError = (err) => {
    switch (err.code) {
        case "23505": // unique_violation
            return new AppError(
                `Registro duplicado: ${err.detail ?? "ya existe un registro con esos datos"}`,
                409,
                "DUPLICATE_ENTRY"
            )
        case "23503": // foreign_key_violation
            return new AppError(
                "No se puede completar la operación: existe una referencia a otro registro",
                409,
                "FOREIGN_KEY_VIOLATION"
            )
        case "23502": // not_null_violation
            return new AppError(
                `El campo "${err.column}" es obligatorio`,
                400,
                "NULL_VIOLATION"
            )
        case "22P02": // invalid_text_representation (bad UUID / int)
            return new AppError("Formato de dato inválido", 400, "INVALID_FORMAT")
        default:
            return null // Not a known DB error — let the generic handler deal with it
    }
}

/**
 * Translate JWT errors into AppErrors.
 * @param {Error} err
 * @returns {AppError|null}
 */
const handleJwtError = (err) => {
    if (err.name === "TokenExpiredError")
        return new AppError("El token ha expirado", 401, "TOKEN_EXPIRED")

    if (err.name === "JsonWebTokenError")
        return new AppError("Token inválido", 401, "INVALID_TOKEN")

    return null
}

/**
 * Send detailed error response in development.
 */
const sendDevError = (err, res) => {
    res.status(err.statusCode).json({
        ok: false,
        status: err.status,
        msg: err.message,
        code: err.code ?? null,
        stack: err.stack,
    })
}

/**
 * Send safe error response in production.
 * - Operational errors: expose message.
 * - Programming errors: hide details, log internally.
 */
const sendProdError = (err, res) => {
    if (err.isOperational) {
        return res.status(err.statusCode).json({
            ok: false,
            msg: err.message,
            code: err.code ?? null,
        })
    }

    // Programming or unknown error → log it, send generic message
    console.error("🔴 UNEXPECTED ERROR:", err)
    res.status(500).json({
        ok: false,
        msg: "Ha ocurrido un error interno. Por favor intente más tarde.",
        code: "INTERNAL_ERROR",
    })
}

/**
 * Global Express error-handling middleware.
 * Must be registered AFTER all routes in index.js:
 *   app.use(errorHandler)
 *
 * @param {Error}    err
 * @param {import('express').Request}  req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export const errorHandler = (err, req, res, next) => {
    // Ensure defaults exist (e.g. for unhandled native errors)
    err.statusCode = err.statusCode ?? 500
    err.status = err.status ?? "error"

    const isDev = process.env.NODE_ENV === "development"

    // ── Attempt to translate known error types ─────────────────────────────
    let handledErr = err

    if (!err.isOperational) {
        const dbErr = handleDbError(err)
        const jwtErr = handleJwtError(err)

        if (dbErr) handledErr = dbErr
        else if (jwtErr) handledErr = jwtErr
    }

    // ── Log everything in dev, only unexpected errors in prod ──────────────
    if (isDev || !handledErr.isOperational) {
        console.error(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`)
        console.error(handledErr)
    }

    // ── Send response ──────────────────────────────────────────────────────
    if (isDev) {
        sendDevError(handledErr, res)
    } else {
        sendProdError(handledErr, res)
    }
}

/**
 * Middleware to handle requests to non-existent routes.
 * Register BEFORE errorHandler and AFTER all routes:
 *   app.use(notFoundHandler)
 *   app.use(errorHandler)
 */
export const notFoundHandler = (req, res, next) => {
    next(new AppError(`Ruta no encontrada: ${req.method} ${req.originalUrl}`, 404, "ROUTE_NOT_FOUND"))
}
