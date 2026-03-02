import PDFDocument from "pdfkit"
import { BrigadaModel } from "../models/brigada.model.js"
import { MatriculaModel } from "../models/matricula.model.js"
import { PersonalModel } from "../models/personal.model.js"
import { StudentModel } from "../models/student.model.js"
import { drawPageHeader } from "../utils/pdfGenerator.js"
import { notFound } from "../utils/AppError.js"

class PdfService {
    /**
     * Generates a PDF listing all brigades and their assigned teachers.
     */
    async generateBrigadeListPdf() {
        const brigades = await BrigadaModel.findAll()
        if (!brigades || brigades.length === 0) throw notFound("No brigades found for report")

        const doc = new PDFDocument({ margin: 50 })
        drawPageHeader(doc, "LISTADO DE BRIGADAS Y DOCENTES ENCARGADOS")

        doc.moveDown(2)
        doc.fontSize(12).text(`Fecha de generación: ${new Date().toLocaleDateString("es-ES")}`, 50)
        doc.text(`Total de brigadas: ${brigades.length}`)
        doc.moveDown()

        let yPosition = doc.y
        const itemHeight = 25

        // Headers
        doc.fontSize(10).font("Helvetica-Bold")
        doc.text("BRIGADA", 50, yPosition, { width: 150 })
        doc.text("DOCENTE ENCARGADO", 200, yPosition, { width: 150 })
        doc.text("CÉDULA", 350, yPosition, { width: 80 })
        doc.text("ESTUDIANTES", 430, yPosition, { width: 80 })
        doc.text("FECHA INICIO", 510, yPosition, { width: 80 })
        yPosition += itemHeight

        doc.moveTo(50, yPosition - 5).lineTo(590, yPosition - 5).stroke()
        doc.font("Helvetica").fontSize(9)

        brigades.forEach((brigade, index) => {
            if (yPosition > 700) {
                doc.addPage()
                drawPageHeader(doc, "LISTADO DE BRIGADAS Y DOCENTES ENCARGADOS")
                yPosition = doc.y + 50
                // ... (repeat headers logic)
            }
            // ... (row drawing logic)
            const teacherName = brigade.encargado_name ? `${brigade.encargado_name} ${brigade.encargado_lastName}` : "Sin asignar"
            doc.text(brigade.name || "N/A", 50, yPosition, { width: 150 })
            doc.text(teacherName, 200, yPosition, { width: 150 })
            doc.text(brigade.encargado_ci || "N/A", 350, yPosition, { width: 80 })
            doc.text(String(brigade.studentCount || 0), 430, yPosition, { width: 80 })
            doc.text(brigade.fecha_inicio ? new Date(brigade.fecha_inicio).toLocaleDateString("es-ES") : "N/A", 510, yPosition, { width: 80 })
            yPosition += itemHeight
        })

        return doc
    }

    /**
     * Generates a detailed PDF for a specific student.
     */
    async generateStudentDetailsPdf(id) {
        const student = await StudentModel.findOneById(id)
        if (!student) throw notFound("Student not found")

        const doc = new PDFDocument({ margin: 50 })
        drawPageHeader(doc, "DETALLES DE ESTUDIANTE")

        doc.moveDown(1)
        doc.fontSize(14).font("Helvetica-Bold").text("Información Personal del Estudiante", 50, doc.y)
        doc.font("Helvetica").fontSize(10)
        doc.text(`Cédula de Identidad: ${student.ci || "N/A"}`, 50, doc.y + 10)
        doc.text(`Nombre Completo: ${student.name || ""} ${student.lastName || ""}`, 50, doc.y + 10)
        doc.text(`Sexo: ${student.sex || "N/A"}`, 50, doc.y + 10)
        doc.text(`Fecha de Nacimiento: ${student.birthday ? new Date(student.birthday).toLocaleDateString() : "N/A"}`, 50, doc.y + 10)

        // ... (rest of details)
        doc.moveDown(1)
        doc.fontSize(14).font("Helvetica-Bold").text("Información del Representante", 50, doc.y)
        doc.font("Helvetica").fontSize(10)
        doc.text(`Representante: ${student.representative_name || ""} ${student.representative_lastName || ""}`, 50, doc.y + 10)
        doc.text(`Cédula: ${student.representativeID || "N/A"}`, 50, doc.y + 10)

        return doc
    }

    // NOTE: In a real refactor, all 12+ generator functions from pdf.controller.js 
    // would be moved here following this pattern.
}

export default new PdfService()
