import UserService from "../services/user.service.js"

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body
    const result = await UserService.login(username, password)

    res.json({
      ok: true,
      msg: "Login successful",
      ...result
    })
  } catch (error) {
    next(error)
  }
}

const register = async (req, res, next) => {
  try {
    const user = await UserService.register(req.body)
    res.status(201).json({
      ok: true,
      msg: "User registered successfully",
      user
    })
  } catch (error) {
    next(error)
  }
}

const refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body
    const tokens = await UserService.refreshUserToken(refreshToken)
    res.json({ ok: true, ...tokens })
  } catch (error) {
    next(error)
  }
}

const profile = async (req, res, next) => {
  try {
    const user = await UserService.getProfile(req.user.userId)
    res.json({ ok: true, user })
  } catch (error) {
    next(error)
  }
}

const updateProfile = async (req, res, next) => {
  try {
    const user = await UserService.updateProfile(req.user.userId, req.body)
    res.json({ ok: true, msg: "Profile updated successfully", user })
  } catch (error) {
    next(error)
  }
}

const recoverPasswordSecurity = async (req, res, next) => {
  try {
    const { username, securityAnswer, newPassword } = req.body
    await UserService.resetPasswordBySecurity(username, securityAnswer, newPassword)
    res.json({ ok: true, msg: "Password has been reset successfully" })
  } catch (error) {
    next(error)
  }
}

const listUsers = async (req, res, next) => {
  try {
    const users = await UserService.getAllUsers()
    res.json({ ok: true, users, total: users.length })
  } catch (error) {
    next(error)
  }
}

const getSecurityQuestion = async (req, res, next) => {
  try {
    const { username } = req.params
    const user = await UserService.getProfileByUsername(username) // Need this in service
    // For now, let's keep it direct if service doesn't have it or add it
    res.json({ ok: true, securityWord: user.securityWord, username: user.username })
  } catch (error) {
    next(error)
  }
}

const deleteUser = async (req, res, next) => {
  try {
    const result = await UserService.deleteUser(req.params.id)
    res.json({ ok: true, msg: "User deleted successfully", id: result.id })
  } catch (error) {
    next(error)
  }
}

const setActiveStatus = async (req, res, next) => {
  try {
    const { id } = req.params
    const { isActive } = req.body
    const user = await UserService.setUserActiveStatus(id, isActive)
    res.json({
      ok: true,
      msg: `User ${isActive ? "activated" : "deactivated"} successfully`,
      user,
    })
  } catch (error) {
    next(error)
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
  logout,
}
