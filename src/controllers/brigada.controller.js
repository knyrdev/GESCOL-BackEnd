import BrigadaService from "../services/brigada.service.js"

const getAllBrigades = async (req, res, next) => {
  try {
    const { academicPeriodId } = req.query
    const brigades = await BrigadaService.getAllBrigades(
      academicPeriodId ? Number.parseInt(academicPeriodId) : null
    )

    res.json({
      ok: true,
      msg: "Brigadas obtenidas exitosamente",
      brigades,
      total: brigades.length,
    })
  } catch (error) {
    next(error)
  }
}

const getBrigadeById = async (req, res, next) => {
  try {
    const { id } = req.params
    const { academicPeriodId } = req.query

    const brigade = await BrigadaService.getBrigadeById(
      Number.parseInt(id),
      academicPeriodId ? Number.parseInt(academicPeriodId) : null
    )

    res.json({
      ok: true,
      msg: "Brigada obtenida exitosamente",
      brigade,
    })
  } catch (error) {
    next(error)
  }
}

const createBrigade = async (req, res, next) => {
  try {
    const { name } = req.body
    const newBrigade = await BrigadaService.createBrigade(name)

    res.status(201).json({
      ok: true,
      msg: "Brigada creada exitosamente",
      brigade: newBrigade,
    })
  } catch (error) {
    next(error)
  }
}

const updateBrigade = async (req, res, next) => {
  try {
    const { id } = req.params
    const { name } = req.body

    const updatedBrigade = await BrigadaService.updateBrigade(Number.parseInt(id), name)

    res.json({
      ok: true,
      msg: "Brigada actualizada exitosamente",
      brigade: updatedBrigade,
    })
  } catch (error) {
    next(error)
  }
}

const deleteBrigade = async (req, res, next) => {
  try {
    const { id } = req.params
    await BrigadaService.deleteBrigade(Number.parseInt(id))

    res.json({
      ok: true,
      msg: "Brigada eliminada exitosamente",
    })
  } catch (error) {
    next(error)
  }
}

const searchBrigades = async (req, res, next) => {
  try {
    const { name, academicPeriodId } = req.query
    const brigades = await BrigadaService.searchBrigades(
      name,
      academicPeriodId ? Number.parseInt(academicPeriodId) : null
    )

    res.json({
      ok: true,
      msg: "Búsqueda completada exitosamente",
      brigades,
      total: brigades.length,
    })
  } catch (error) {
    next(error)
  }
}

const getBrigadeStudents = async (req, res, next) => {
  try {
    const { id } = req.params
    const { academicPeriodId } = req.query

    const students = await BrigadaService.getBrigadeStudents(
      Number.parseInt(id),
      academicPeriodId ? Number.parseInt(academicPeriodId) : null
    )

    res.json({
      ok: true,
      msg: "Estudiantes obtenidos exitosamente",
      students,
      total: students.length,
    })
  } catch (error) {
    next(error)
  }
}

const assignTeacher = async (req, res, next) => {
  try {
    const { id } = req.params
    const { personalId, startDate, academicPeriodId } = req.body

    const assignment = await BrigadaService.assignTeacher(
      Number.parseInt(id),
      Number.parseInt(personalId),
      startDate,
      academicPeriodId ? Number.parseInt(academicPeriodId) : null
    )

    res.json({
      ok: true,
      msg: "Docente asignado exitosamente",
      assignment,
    })
  } catch (error) {
    next(error)
  }
}

const removeTeacher = async (req, res, next) => {
  try {
    const { id } = req.params
    const { academicPeriodId } = req.body

    const result = await BrigadaService.removeTeacher(
      Number.parseInt(id),
      academicPeriodId ? Number.parseInt(academicPeriodId) : null
    )

    res.json({
      ok: true,
      msg: "Docente removido de la brigada exitosamente",
      result,
    })
  } catch (error) {
    next(error)
  }
}

const enrollStudents = async (req, res, next) => {
  try {
    const { id } = req.params
    const { studentIds, academicPeriodId } = req.body

    const result = await BrigadaService.enrollStudents(
      Number.parseInt(id),
      studentIds.map(sid => Number.parseInt(sid)),
      academicPeriodId ? Number.parseInt(academicPeriodId) : null
    )

    res.json({
      ok: true,
      msg: `${result.studentsEnrolled} de ${result.totalRequested} estudiantes inscritos exitosamente`,
      result,
    })
  } catch (error) {
    next(error)
  }
}

const clearBrigade = async (req, res, next) => {
  try {
    const { id } = req.params
    const { academicPeriodId } = req.body

    const result = await BrigadaService.clearBrigade(
      Number.parseInt(id),
      academicPeriodId ? Number.parseInt(academicPeriodId) : null
    )

    res.json({
      ok: true,
      msg: `Brigada limpiada exitosamente. ${result.studentsRemoved} estudiantes removidos.`,
      result,
    })
  } catch (error) {
    next(error)
  }
}

const getAvailableStudents = async (req, res, next) => {
  try {
    const { academicPeriodId } = req.query
    const students = await BrigadaService.getAvailableStudents(
      academicPeriodId ? Number.parseInt(academicPeriodId) : null
    )

    res.json({
      ok: true,
      msg: "Estudiantes disponibles obtenidos exitosamente",
      students,
      total: students.length,
    })
  } catch (error) {
    next(error)
  }
}

const getAvailableTeachers = async (req, res, next) => {
  try {
    const { academicPeriodId } = req.query
    const teachers = await BrigadaService.getAvailableTeachers(
      academicPeriodId ? Number.parseInt(academicPeriodId) : null
    )

    res.json({
      ok: true,
      msg: "Docentes disponibles obtenidos exitosamente",
      teachers,
      total: teachers.length,
    })
  } catch (error) {
    next(error)
  }
}

const removeStudentFromBrigade = async (req, res, next) => {
  try {
    const { id, studentId } = req.params
    const { academicPeriodId } = req.body

    const result = await BrigadaService.removeStudentFromBrigade(
      Number.parseInt(id),
      Number.parseInt(studentId),
      academicPeriodId ? Number.parseInt(academicPeriodId) : null
    )

    res.json({
      ok: true,
      msg: "Estudiante removido de la brigada exitosamente",
      result,
    })
  } catch (error) {
    next(error)
  }
}

export const BrigadaController = {
  getAllBrigades,
  getBrigadeById,
  createBrigade,
  updateBrigade,
  deleteBrigade,
  searchBrigades,
  getBrigadeStudents,
  assignTeacher,
  removeTeacher,
  enrollStudents,
  clearBrigade,
  getAvailableStudents,
  getAvailableTeachers,
  removeStudentFromBrigade,
}