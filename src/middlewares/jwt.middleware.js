import jwt from "jsonwebtoken"
import { UserModel } from "../models/user.model.js"
import { JWT_SECRET } from "../config/jwt.config.js"
import { unauthorized, forbidden } from "../utils/AppError.js"

/**
 * Middleware to verify the JWT access token.
 */
export const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader) {
      return next(unauthorized("No token provided"))
    }

    const parts = authHeader.split(" ")
    if (parts.length !== 2 || parts[0] !== "Bearer") {
      return next(unauthorized("Invalid token format"))
    }

    const token = parts[1]

    try {
      const decoded = jwt.verify(token, JWT_SECRET)

      // Verify user exists and is active
      const user = await UserModel.findOneById(decoded.userId)

      if (!user) {
        return next(unauthorized("User not found"))
      }

      if (!user.is_active) {
        return next(forbidden("Account is inactive"))
      }

      // Attach user info to request
      req.user = {
        userId: decoded.userId,
        username: decoded.username,
        personal_id: decoded.personal_id,
        role: user.rol_nombre // Added for role-based access control
      }

      next()
    } catch (jwtError) {
      // errorHandler middleware handles TokenExpiredError and JsonWebTokenError
      return next(jwtError)
    }
  } catch (error) {
    next(error)
  }
}

/**
 * Middleware to restrict access to ADMIN users only.
 */
export const verifyAdmin = async (req, res, next) => {
  // Access control removed per user request - all authenticated users can access
  next()
}

/**
 * Middleware to allow ADMIN or specific read-only access.
 */
export const verifyAdminOrReadOnly = async (req, res, next) => {
  // Currently allowing all authenticated users, but structured for future expansion
  next()
}
