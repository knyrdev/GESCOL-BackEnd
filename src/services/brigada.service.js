import { BrigadaModel } from "../models/brigada.model.js"
import { notFound, conflict, badRequest } from "../utils/AppError.js"

class BrigadaService {
  /**
   * Get all brigades.
   */
  async getAllBrigades(academicPeriodId = null) {
    const brigades = await BrigadaModel.findAll(academicPeriodId)
    return this.formatBrigadeList(brigades)
  }

  /**
   * Get brigade by ID.
   */
  async getBrigadeById(id, academicPeriodId = null) {
    const brigade = await BrigadaModel.findById(id, academicPeriodId)
    if (!brigade) throw notFound("Brigada no encontrada")
    return this.formatBrigadeData(brigade)
  }

  /**
   * Create a new brigade.
   */
  async createBrigade(name) {
    try {
      return await BrigadaModel.create({ name: name.trim() })
    } catch (error) {
      if (error.code === "23505") throw conflict("Ya existe una brigada con ese nombre")
      throw error
    }
  }

  /**
   * Update an existing brigade.
   */
  async updateBrigade(id, name) {
    // Check existence
    const existing = await BrigadaModel.findById(id)
    if (!existing) throw notFound("Brigada no encontrada")

    try {
      return await BrigadaModel.update(id, { name: name.trim() })
    } catch (error) {
      if (error.code === "23505") throw conflict("Ya existe una brigada con ese nombre")
      throw error
    }
  }

  /**
   * Delete a brigade.
   */
  async deleteBrigade(id) {
    const existing = await BrigadaModel.findById(id)
    if (!existing) throw notFound("Brigada no encontrada")
    return await BrigadaModel.remove(id)
  }

  /**
   * Search brigades by name.
   */
  async searchBrigades(name, academicPeriodId = null) {
    return await BrigadaModel.searchByName(name.trim(), academicPeriodId)
  }

  /**
   * Get students in a brigade.
   */
  async getBrigadeStudents(id, academicPeriodId = null) {
    const brigade = await BrigadaModel.findById(id, academicPeriodId)
    if (!brigade) throw notFound("Brigada no encontrada")
    return await BrigadaModel.getStudentsByBrigade(id, academicPeriodId)
  }

  /**
   * Assign a teacher to a brigade.
   */
  async assignTeacher(id, personalId, startDate, academicPeriodId = null) {
    const brigade = await BrigadaModel.findById(id)
    if (!brigade) throw notFound("Brigada no encontrada")

    return await BrigadaModel.assignTeacher(
      id,
      personalId,
      startDate || new Date().toISOString().split("T")[0],
      academicPeriodId
    )
  }

  /**
   * Remove teacher from brigade.
   */
  async removeTeacher(id, academicPeriodId = null) {
    const brigade = await BrigadaModel.findById(id)
    if (!brigade) throw notFound("Brigada no encontrada")

    const result = await BrigadaModel.removeTeacher(id, academicPeriodId)
    if (!result.removed) {
      throw notFound("No hay docente asignado a esta brigada para el período especificado")
    }
    return result
  }

  /**
   * Enroll students in a brigade.
   */
  async enrollStudents(id, studentIds, academicPeriodId = null) {
    const brigade = await BrigadaModel.findById(id)
    if (!brigade) throw notFound("Brigada no encontrada")

    return await BrigadaModel.enrollStudents(id, studentIds, academicPeriodId)
  }

  /**
   * Clear all students from a brigade.
   */
  async clearBrigade(id, academicPeriodId = null) {
    const brigade = await BrigadaModel.findById(id)
    if (!brigade) throw notFound("Brigada no encontrada")

    return await BrigadaModel.clearBrigade(id, academicPeriodId)
  }

  /**
   * Get students available for enrollment.
   */
  async getAvailableStudents(academicPeriodId = null) {
    return await BrigadaModel.getAvailableStudents(academicPeriodId)
  }

  /**
   * Get teachers available for assignment.
   */
  async getAvailableTeachers(academicPeriodId = null) {
    return await BrigadaModel.getAvailableTeachers(academicPeriodId)
  }

  /**
   * Remove a specific student from a brigade.
   */
  async removeStudentFromBrigade(id, studentId, academicPeriodId = null) {
    const result = await BrigadaModel.removeStudentFromBrigade(id, studentId, academicPeriodId)
    if (!result.removed) {
      throw notFound("Estudiante no encontrado en la brigada para el período especificado")
    }
    return result
  }

  // ─── Formatters ──────────────────────────────────────────────────────

  formatBrigadeData(brigade) {
    return {
      id: brigade.id,
      name: brigade.name,
      encargado_name: brigade.encargado_name || null,
      encargado_lastName: brigade.encargado_lastName || null,
      encargado_ci: brigade.encargado_ci || null,
      fecha_inicio: brigade.fecha_inicio || null,
      studentCount: Number.parseInt(brigade.studentCount) || 0,
    }
  }

  formatBrigadeList(brigades) {
    return brigades.map(b => this.formatBrigadeData(b))
  }
}

export default new BrigadaService()
