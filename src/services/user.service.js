import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import { UserModel } from "../models/user.model.js"
import { JWT_SECRET, JWT_REFRESH_SECRET, JWT_ACCESS_EXPIRES_IN, JWT_REFRESH_EXPIRES_IN } from "../config/jwt.config.js"

const generateTokens = (user) => {
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

const login = async (username, password) => {
    const user = await UserModel.findOneByUsername(username)
    if (!user || !user.is_active) {
        throw new Error("Invalid credentials or inactive account")
    }

    const validPassword = await bcryptjs.compare(password, user.password)
    if (!validPassword) {
        throw new Error("Invalid credentials")
    }

    await UserModel.updateLastLogin(user.id)
    const tokens = generateTokens(user)

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

const register = async (userData) => {
    const existing = await UserModel.findOneByUsername(userData.username)
    if (existing) throw new Error("Username already exists")

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

const refreshUserToken = async (refreshToken) => {
    const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET)
    const user = await UserModel.findOneById(decoded.userId)

    if (!user || !user.is_active) {
        throw new Error("User not found or inactive")
    }

    return generateTokens(user)
}

const resetPasswordBySecurity = async (username, securityAnswer, newPassword) => {
    const user = await UserModel.verifySecurityAnswer(username, securityAnswer)
    if (!user) throw new Error("Invalid username or security answer")

    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(newPassword, salt)

    return await UserModel.updatePassword(user.id, hashedPassword)
}

const updateProfile = async (userId, updateData) => {
    return await UserModel.updateProfile(userId, {
        securityWord: updateData.securityWord,
        securityAnswer: updateData.securityAnswer,
    })
}

const getProfile = async (userId) => {
    const user = await UserModel.findOneById(userId)
    if (!user) throw new Error("User not found")

    const { password, respuesta_de_seguridad, ...safeUser } = user
    return {
        ...safeUser,
        securityWord: user.security_word
    }
}

export const UserService = {
    login,
    register,
    refreshUserToken,
    resetPasswordBySecurity,
    updateProfile,
    getProfile,
}
