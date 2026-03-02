import jwt from "jsonwebtoken"
import { UserModel } from "../models/user.model.js"

// Claves por defecto para desarrollo
const JWT_SECRET = process.env.JWT_SECRET || "escuela-jwt-secret-key-2024-development"
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "escuela-refresh-secret-key-2024-development"

export const verifyToken = async (req, res, next) => {
  try {
    console.log("🔍 MIDDLEWARE - Iniciando verificación de token")

    const authHeader = req.headers.authorization
    console.log("🔍 MIDDLEWARE - Authorization header:", authHeader ? "EXISTE" : "NO EXISTE")

    if (!authHeader) {
      console.log("❌ MIDDLEWARE - No hay  header de autorización")
      return res.status(401).json({
        ok: false,
        msg: "No token provided",
      })
    }

    const parts = authHeader.split(" ")
    if (parts.length !== 2 || parts[0] !== "Bearer") {
      console.log("❌ MIDDLEWARE - Formato de token inválido")
      return res.status(401).json({
        ok: false,
        msg: "Invalid token format",
      })
    }

    const token = parts[1]
    console.log("🔍 MIDDLEWARE - Token extraído, longitud:", token.length)

    try {
      console.log("🔍 MIDDLEWARE - Verificando token con JWT...")
      const decoded = jwt.verify(token, JWT_SECRET)
      console.log("✅ MIDDLEWARE - Token decodificado exitosamente:", {
        userId: decoded.userId,
        username: decoded.username,
        exp: new Date(decoded.exp * 1000).toISOString(),
      })

      // Verificar que el usuario existe y está activo
      console.log("🔍 MIDDLEWARE - Buscando usuario en BD...")
      const user = await UserModel.findOneById(decoded.userId)

      if (!user) {
        console.log("❌ MIDDLEWARE - Usuario no encontrado en BD")
        return res.status(401).json({
          ok: false,
          msg: "User not found",
        })
      }

      console.log("✅ MIDDLEWARE - Usuario encontrado:", {
        id: user.id,
        username: user.username,
        is_active: user.is_active,
      })

      if (!user.is_active) {
        console.log("❌ MIDDLEWARE - Usuario inactivo")
        return res.status(403).json({
          ok: false,
          msg: "Account is inactive",
        })
      }

      // Agregar información del usuario al request
      req.user = {
        userId: decoded.userId,
        username: decoded.username,
        personal_id: decoded.personal_id,
      }

      console.log("✅ MIDDLEWARE - Verificación completada exitosamente")
      next()
    } catch (jwtError) {
      console.log("❌ MIDDLEWARE - Error JWT:", {
        name: jwtError.name,
        message: jwtError.message,
      })

      if (jwtError.name === "TokenExpiredError") {
        return res.status(401).json({
          ok: false,
          msg: "Token expired",
        })
      }

      if (jwtError.name === "JsonWebTokenError") {
        return res.status(401).json({
          ok: false,
          msg: "Invalid token",
        })
      }

      return res.status(401).json({
        ok: false,
        msg: "Token verification failed",
        error: jwtError.message,
      })
    }
  } catch (error) {
    console.error("❌ MIDDLEWARE - Error general:", error)
    return res.status(500).json({
      ok: false,
      msg: "Server error in token verification",
      error: error.message,
    })
  }
}

export const verifyAdmin = async (req, res, next) => {
  // Roles and permissions removed, allowing all authenticated users
  next()
}

export const verifyAdminOrReadOnly = async (req, res, next) => {
  // Roles and permissions removed, allowing all authenticated users
  next()
}
