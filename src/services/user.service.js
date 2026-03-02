import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import { UserModel } from "../models/user.model.js"
import { JWT_SECRET, JWT_REFRESH_SECRET, JWT_ACCESS_EXPIRES_IN, JWT_REFRESH_EXPIRES_IN } from "../config/jwt.config.js"
import { unauthorized, notFound, conflict, badRequest } from "../utils/AppError.js"

class UserService {
    /**
     * Authenticats a user and returns tokens and user data.
     */
    async login(username, password) {
        const user = await UserModel.findOneByUsername(username)
        if (!user || !user.is_active) {
            throw unauthorized("Invalid credentials or inactive account")
        }

        const validPassword = await bcryptjs.compare(password, user.password)
        if (!validPassword) {
            throw unauthorized("Invalid credentials")
        }

        await UserModel.updateLastLogin(user.id)
        const tokens = this.generateTokens(user)

        return {
            ...tokens,
            user: {
                id: user.id,
                username: user.username,
                personalId: user.personal_id,
                personalNombre: user.personal_nombre,
                personalApellido: user.personal_apellido,
                rolNombre: user.rol_nombre,
            },
        }
    }

    /**
     * Registers a new user.
     */
    async register(userData) {
        const existing = await UserModel.findOneByUsername(userData.username)
        if (existing) throw conflict("Username already exists")

        // Username validation (standardize here if not in validator)
        const usernameRegex = /^[a-zA-Z0-9]{3,}$/
        if (!usernameRegex.test(userData.username)) {
            throw badRequest("Username must be alphanumeric and at least 3 characters long")
        }

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(userData.password, salt)

        return await UserModel.create({
            username: userData.username,
            password: hashedPassword,
            securityWord: userData.securityWord,
            securityAnswer: userData.securityAnswer,
            personalId: userData.personalId,
        })
    }

    /**
     * Refreshes the access token using a refresh token.
     */
    async refreshUserToken(refreshToken) {
        try {
            const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET)
            const user = await UserModel.findOneById(decoded.userId)

            if (!user || !user.is_active) {
                throw unauthorized("User not found or inactive")
            }

            return this.generateTokens(user)
        } catch (error) {
            if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
                throw unauthorized("Invalid or expired refresh token")
            }
            throw error
        }
    }

    /**
     * Resets password using security question.
     */
    async resetPasswordBySecurity(username, securityAnswer, newPassword) {
        const user = await UserModel.verifySecurityAnswer(username, securityAnswer)
        if (!user) throw badRequest("Invalid username or security answer")

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(newPassword, salt)

        return await UserModel.updatePassword(user.id, hashedPassword)
    }

    /**
     * Updates user security profile.
     */
    async updateProfile(userId, updateData) {
        return await UserModel.updateProfile(userId, {
            securityWord: updateData.securityWord,
            securityAnswer: updateData.securityAnswer,
        })
    }

    /**
     * Gets user profile data.
     */
    async getProfile(userId) {
        const user = await UserModel.findOneById(userId)
        if (!user) throw notFound("User not found")

        const { password, respuesta_de_seguridad, ...safeUser } = user
        return {
            ...safeUser,
            securityWord: user.security_word
        }
    }

    async getProfileByUsername(username) {
        const user = await UserModel.findOneByUsername(username)
        if (!user) throw notFound("User not found")

        const { password, respuesta_de_seguridad, ...safeUser } = user
        return {
            ...safeUser,
            securityWord: user.security_word
        }
    }

    /**
     * Helper to generate JWT tokens.
     */
    generateTokens(user) {
        const accessToken = jwt.sign(
            {
                userId: user.id,
                username: user.username,
                personal_id: user.personal_id,
            },
            JWT_SECRET,
            { expiresIn: JWT_ACCESS_EXPIRES_IN }
        )

        const refreshToken = jwt.sign(
            { userId: user.id },
            JWT_REFRESH_SECRET,
            { expiresIn: JWT_REFRESH_EXPIRES_IN }
        )

        return { accessToken, refreshToken }
    }

    // Admin methods
    async getAllUsers() {
        return await UserModel.findAll()
    }

    async deleteUser(id) {
        const exists = await UserModel.findOneById(id)
        if (!exists) throw notFound("User not found")
        return await UserModel.remove(id)
    }

    async setUserActiveStatus(id, isActive) {
        const exists = await UserModel.findOneById(id)
        if (!exists) throw notFound("User not found")
        return await UserModel.setActive(id, isActive)
    }
}

export default new UserService()
