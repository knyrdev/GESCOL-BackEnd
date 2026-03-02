import StudentService from "../services/student.service.js"

const createStudent = async (req, res, next) => {
  try {
    const { student } = req.body
    const newStudent = await StudentService.createStudent(student)
    res.status(201).json({
      ok: true,
      msg: "Estudiante creado exitosamente",
      student: newStudent,
    })
  } catch (error) {
    next(error)
  }
}

const getRegisteredNotEnrolledStudents = async (req, res, next) => {
  try {
    const students = await StudentService.getRegisteredNotEnrolledStudents()
    res.json({
      ok: true,
      students,
      total: students.length,
    })
  } catch (error) {
    next(error)
  }
}

const findStudentByCi = async (req, res, next) => {
  try {
    const { ci } = req.params
    const student = await StudentService.getStudentByCi(ci)
    res.json({
      ok: true,
      student,
    })
  } catch (error) {
    next(error)
  }
}

const findStudentForInscription = async (req, res, next) => {
  try {
    const { ci } = req.params
    const student = await StudentService.getStudentForInscription(ci)
    res.json({
      ok: true,
      student,
    })
  } catch (error) {
    next(error)
  }
}

const getAllStudents = async (req, res, next) => {
  try {
    const students = await StudentService.getAllStudents()
    res.json({
      ok: true,
      students,
      total: students.length,
    })
  } catch (error) {
    next(error)
  }
}

const updateStudent = async (req, res, next) => {
  try {
    const { id } = req.params
    const updatedStudent = await StudentService.updateStudent(id, req.body)
    res.json({
      ok: true,
      msg: "Estudiante actualizado exitosamente",
      student: updatedStudent,
    })
  } catch (error) {
    next(error)
  }
}

const deleteStudent = async (req, res, next) => {
  try {
    const { id } = req.params
    await StudentService.deleteStudent(id)
    res.json({
      ok: true,
      msg: "Estudiante eliminado exitosamente",
    })
  } catch (error) {
    next(error)
  }
}

const addAcademicHistory = async (req, res, next) => {
  try {
    const newHistory = await StudentService.addAcademicHistory(req.body)
    res.status(201).json({
      ok: true,
      msg: "Historial académico agregado exitosamente",
      history: newHistory,
    })
  } catch (error) {
    next(error)
  }
}

const getHistoryByStudent = async (req, res, next) => {
  try {
    const { studentID } = req.params
    const history = await StudentService.getAcademicHistoryByStudent(studentID)
    res.json({
      ok: true,
      history,
      total: history.length,
    })
  } catch (error) {
    next(error)
  }
}

export const StudentController = {
  createStudent,
  getRegisteredNotEnrolledStudents,
  findStudentForInscription,
  findStudentByCi,
  getAllStudents,
  updateStudent,
  deleteStudent,
  addAcademicHistory,
  getHistoryByStudent,
}
