import { UserService } from "../services/user.service.js"
import { UserModel } from "../models/user.model.js"

const login = async (req, res) => {
  try {
    const { username, password } = req.body
    if (!username || !password) return res.status(400).json({ ok: false, msg: "Username and password are required" })

    const result = await UserService.login(username, password)
    res.json({ ok: true, msg: "Login successful", ...result })
  } catch (error) {
    res.status(400).json({ ok: false, msg: error.message })
  }
}

const register = async (req, res) => {
  try {
    const { username, password, securityWord, securityAnswer, personalId } = req.body

    // Alphanumeric validation, min 3 chars
    const usernameRegex = /^[a-zA-Z0-9]{3,}$/
    if (!usernameRegex.test(username)) {
      return res.status(400).json({ ok: false, msg: "Username must be alphanumeric and at least 3 characters long" })
    }

    const user = await UserService.register({ username, password, securityWord, securityAnswer, personalId })
    res.status(201).json({ ok: true, msg: "User registered successfully", user })
  } catch (error) {
    res.status(400).json({ ok: false, msg: error.message })
  }
}

const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body
    if (!refreshToken) return res.status(400).json({ ok: false, msg: "Refresh token is required" })

    const tokens = await UserService.refreshUserToken(refreshToken)
    res.json({ ok: true, ...tokens })
  } catch (error) {
    res.status(401).json({ ok: false, msg: error.message })
  }
}

const profile = async (req, res) => {
  try {
    const user = await UserService.getProfile(req.user.userId)
    res.json({ ok: true, user })
  } catch (error) {
    res.status(404).json({ ok: false, msg: error.message })
  }
}

const updateProfile = async (req, res) => {
  try {
    const { securityWord, securityAnswer } = req.body
    const user = await UserService.updateProfile(req.user.userId, { securityWord, securityAnswer })
    res.json({ ok: true, msg: "Profile updated successfully", user })
  } catch (error) {
    res.status(400).json({ ok: false, msg: error.message })
  }
}

const recoverPasswordSecurity = async (req, res) => {
  try {
    const { username, securityAnswer, newPassword } = req.body
    if (!username || !securityAnswer || !newPassword) return res.status(400).json({ ok: false, msg: "All fields are required" })

    await UserService.resetPasswordBySecurity(username, securityAnswer, newPassword)
    res.json({ ok: true, msg: "Password has been reset successfully" })
  } catch (error) {
    res.status(400).json({ ok: false, msg: error.message })
  }
}

const listUsers = async (req, res) => {
  try {
    const users = await UserModel.findAll()
    res.json({ ok: true, users, total: users.length })
  } catch (error) {
    res.status(500).json({ ok: false, msg: "Server error" })
  }
}

const getSecurityQuestion = async (req, res) => {
  try {
    const user = await UserModel.findOneByUsername(req.params.username)
    if (!user) return res.status(404).json({ ok: false, msg: "User not found" })
    res.json({ ok: true, securityWord: user.security_word, username: user.username })
  } catch (error) {
    res.status(500).json({ ok: false, msg: "Server error" })
  }
}

const deleteUser = async (req, res) => {
  try {
    const result = await UserModel.remove(req.params.id)
    res.json({ ok: true, msg: "User deleted successfully", id: result.id })
  } catch (error) {
    res.status(500).json({ ok: false, msg: "Server error" })
  }
}

const setActiveStatus = async (req, res) => {
  try {
    const { id } = req.params
    const { isActive } = req.body
    const user = await UserModel.setActive(id, isActive)
    res.json({ ok: true, msg: `User ${isActive ? 'activated' : 'deactivated'} successfully`, user })
  } catch (error) {
    res.status(500).json({ ok: false, msg: "Server error" })
  }
}

const logout = async (req, res) => res.json({ ok: true, msg: "Logged out successfully" })

export const UserController = {
  login,
  register,
  refreshToken,
  profile,
  updateProfile,
  recoverPasswordSecurity,
  listUsers,
  getSecurityQuestion,
  deleteUser,
  setActiveStatus,
  logout
}
