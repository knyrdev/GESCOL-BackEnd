import express from "express"
import { UserController } from "../controllers/user.controller.js"
import { verifyToken, verifyAdmin, verifyAdminOrReadOnly } from "../middlewares/jwt.middleware.js"

const router = express.Router()

// Public routes
router.post("/register", UserController.register)
router.post("/login", UserController.login)
router.post("/refresh-token", UserController.refreshToken)
router.post("/recover-password", UserController.recoverPasswordSecurity)
router.get("/security-question/:username", UserController.getSecurityQuestion)

// Protected routes
router.get("/profile", verifyToken, UserController.profile)
router.put("/profile", verifyToken, UserController.updateProfile)
router.get("/list", verifyToken, UserController.listUsers)
router.post("/logout", verifyToken, UserController.logout)

// User management routes (now open to all authenticated users)
router.put("/status/:id", verifyToken, UserController.setActiveStatus)
router.delete("/:id", verifyToken, UserController.deleteUser)

export default router