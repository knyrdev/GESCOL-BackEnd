import { StudentModel } from "../models/student.model.js"
import { RepresentativeModel } from "../models/representative.model.js"
import { AppError, badRequest, notFound } from "../utils/AppError.js"

class StudentService {
    /**
     * Create a new student registry.
     * Requires an existing representative.
     * 
     * @param {Object} studentData 
     * @returns {Promise<Object>}
     */
    async createStudent(studentData) {
        if (!studentData.ci || !studentData.name || !studentData.lastName) {
            throw badRequest("Missing required student fields")
        }

        // Verify student doesn't exist
        const existingStudent = await StudentModel.findStudentByCi(studentData.ci)
        if (existingStudent) {
            throw badRequest("Student with this ID already exists")
        }

        // Verify representative exists
        const existingRepresentative = await RepresentativeModel.getRepresentativeByCi(studentData.representativeID)
        if (!existingRepresentative) {
            throw notFound("Representative not found")
        }

        return await StudentModel.createStudentRegistry(studentData)
    }

    /**
     * Get all registered students that are not enrolled.
     */
    async getRegisteredNotEnrolledStudents() {
        return await StudentModel.getRegisteredNotEnrolledStudents()
    }

    /**
     * Find a student by their CI.
     * @param {string} ci 
     */
    async getStudentByCi(ci) {
        const student = await StudentModel.findStudentByCi(ci)
        if (!student) throw notFound("Student not found")
        return student
    }

    /**
     * Find a student specifically for inscription purposes (must be active).
     * @param {string} ci 
     */
    async getStudentForInscription(ci) {
        const student = await this.getStudentByCi(ci)

        // Check if status is active (status_id 1)
        if (student.status_id !== 1) {
            throw badRequest(`Student not available for inscription. Status: ${student.status_description}`)
        }

        return student
    }

    /**
     * Get all students in the system.
     */
    async getAllStudents() {
        return await StudentModel.getAllStudents()
    }

    /**
     * Update student data.
     */
    async updateStudent(id, studentData) {
        // Check if student exists
        const student = await StudentModel.findOneById(id)
        if (!student) throw notFound("Student not found")

        return await StudentModel.updateStudent(id, studentData)
    }

    /**
     * Delete a student.
     */
    async deleteStudent(id) {
        const student = await StudentModel.findOneById(id)
        if (!student) throw notFound("Student not found")

        return await StudentModel.deleteStudent(id)
    }

    /**
     * Add academic history to a student.
     */
    async addAcademicHistory(historyData) {
        return await StudentModel.createAcademicHistory(historyData)
    }

    /**
     * Get academic history for a specific student.
     */
    async getAcademicHistoryByStudent(studentId) {
        return await StudentModel.getAcademicHistoryByStudent(studentId)
    }
}

export default new StudentService()
