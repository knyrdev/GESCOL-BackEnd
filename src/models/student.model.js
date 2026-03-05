import { db } from "../db/connection.database.js";

// Crear registro básico de estudiante (sin inscripción)
const createStudentRegistry = async (studentData) => {
  try {
    const {
      ci,
      name,
      lastName,
      sex,
      birthday,
      placeBirth,
      parishID,
      quantityBrothers,
      representativeID,
      motherName,
      motherCi,
      motherTelephone,
      fatherName,
      fatherCi,
      fatherTelephone,
      livesMother,
      livesFather,
      livesBoth,
      livesRepresentative,
      rolRopresentative,
    } = studentData;

    console.log("📝 Datos del estudiante a insertar:", studentData);

    // Validar campos requeridos
    if (!ci || !name || !lastName || !sex || !birthday || !representativeID) {
      throw new Error(
        "Campos requeridos: CI, nombre, apellido, sexo, fecha de nacimiento y representante"
      );
    }

    const query = {
      text: `
        INSERT INTO "student" (
          ci, name, "lastName", sex, birthday, "placeBirth", "parishID",
          status_id, "quantityBrothers", "representativeID", "motherName", 
          "motherCi", "motherTelephone", "fatherName", "fatherCi", "fatherTelephone",
          "livesMother", "livesFather", "livesBoth", "livesRepresentative", 
          "rolRopresentative", created_at, updated_at
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, 1, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
        RETURNING *
      `,
      values: [
        ci,
        name,
        lastName,
        sex,
        birthday,
        placeBirth || null,
        parishID || null,
        quantityBrothers || 0,
        representativeID,
        motherName || null,
        motherCi || null,
        motherTelephone || null,
        fatherName || null,
        fatherCi || null,
        fatherTelephone || null,
        livesMother || false,
        livesFather || false,
        livesBoth || false,
        livesRepresentative || false,
        rolRopresentative || null,
      ],
    };

    console.log("🔍 Query a ejecutar:", query);
    const { rows } = await db.query(query);
    console.log("✅ Estudiante insertado:", rows[0]);
    return rows[0];
  } catch (error) {
    console.error("❌ Error in createStudentRegistry:", error);
    throw error;
  }
};

// Obtener estudiantes registrados (sin inscribir) - status_id = 1 (Activo pero sin inscripción)
const getRegisteredNotEnrolledStudents = async () => {
  try {
    const query = {
      text: `
        SELECT 
          s.*,
          r.name as representative_name,
          r."lastName" as representative_lastName,
          r."telephoneNumber" as representative_phone,
          r."maritalStat" as relationship,
          ss.descripcion as status_description
        FROM "student" s
        LEFT JOIN "representative" r ON s."representativeID" = r.ci
        LEFT JOIN "status_student" ss ON s.status_id = ss.id
        WHERE s.status_id = 1 AND s.id NOT IN (
          SELECT DISTINCT "studentID" FROM "enrollment" WHERE "studentID" IS NOT NULL
        )
        ORDER BY s.created_at DESC
      `,
    };
    const { rows } = await db.query(query);
    return rows;
  } catch (error) {
    console.error("Error in getRegisteredStudents:", error);
    throw error;
  }
};
// Buscar estudiante por CI (general)
const findStudentByCi = async (ci) => {
  try {
    const query = {
      text: `
        SELECT 
          s.*,
          r.name as representative_name,
          r."lastName" as representative_lastName,
          ss.descripcion as status_description
        FROM "student" s
        LEFT JOIN "representative" r ON s."representativeID" = r.ci
        LEFT JOIN "status_student" ss ON s.status_id = ss.id
        WHERE s.ci = $1
      `,
      values: [ci],
    };
    const { rows } = await db.query(query);


    return rows[0] || null;
  } catch (error) {
    console.error("Error in findStudentByCi:", error);
    throw error;
  }
};

// **NUEVO: Buscar un estudiante por su ID**
const findOneById = async (id) => {
  try {
    const query = {
      text: `
        SELECT 
          s.*,
          r.name AS representative_name,
          r."lastName" AS "representative_lastName",
          r."telephoneNumber" AS representative_phone,
          ss.descripcion AS status_description,
          p.name as parish_name
        FROM "student" s
        LEFT JOIN "representative" r ON s."representativeID" = r.ci
        LEFT JOIN "status_student" ss ON s.status_id = ss.id
        LEFT JOIN "parish" p ON s."parishID" = p.id
        WHERE s.id = $1
      `,
      values: [id],
    };
    const { rows } = await db.query(query);
    return rows[0] || null;
  } catch (error) {
    console.error("Error in findOneById student:", error);
    throw error;
  }
};
// Actualizar estado del estudiante
const updateStudentStatus = async (studentId, statusId) => {
  try {
    const query = {
      text: `
        UPDATE "student" 
        SET status_id = $1, updated_at = CURRENT_TIMESTAMP 
        WHERE id = $2 
        RETURNING *
      `,
      values: [statusId, studentId],
    };
    const { rows } = await db.query(query);
    if (rows.length === 0) {
      throw new Error(`Estudiante con ID ${studentId} no encontrado.`);
    }
    return rows[0];
  } catch (error) {
    console.error("Error in updateStudentStatus:", error);
    throw error;
  }
};

// Obtener todos los estudiantes, sin importar el estado de inscripción
const getAllStudents = async () => {
  try {
    const query = {
      text: `
        SELECT 
          s.*,
          r.name AS representative_name,
          r."lastName" AS "representative_lastName",
          r."telephoneNumber" AS representative_phone,
          ss.descripcion AS status_description,
          CASE 
            WHEN e."studentID" IS NOT NULL THEN TRUE
            ELSE FALSE
          END AS is_enrolled
        FROM "student" s
        LEFT JOIN "representative" r ON s."representativeID" = r.ci
        LEFT JOIN "status_student" ss ON s.status_id = ss.id
        LEFT JOIN "enrollment" e ON s.id = e."studentID"
        ORDER BY s.created_at DESC
      `,
    };
    const { rows } = await db.query(query);
    return rows;
  } catch (error) {
    console.error("Error in getAllStudents:", error);
    throw error;
  }
};

// **NUEVO: Actualizar un estudiante por su ID**
const updateStudent = async (studentId, studentData) => {
  try {
    const {
      ci,
      name,
      lastName,
      sex,
      birthday,
      placeBirth,
      parishID,
      quantityBrothers,
      representativeID,
      motherName,
      motherCi,
      motherTelephone,
      fatherName,
      fatherCi,
      fatherTelephone,
      livesMother,
      livesFather,
      livesBoth,
      livesRepresentative,
      rolRopresentative,
      status_id, // Permitir actualizar el status_id aquí también
    } = studentData;

    const fields = [];
    const values = [];
    let paramIndex = 1;

    const addField = (fieldName, value) => {
      if (value !== undefined) {
        // Solo añadir si el valor está presente en studentData
        fields.push(`"${fieldName}" = $${paramIndex++}`);
        values.push(value);
      }
    };

    addField("ci", ci);
    addField("name", name);
    addField("lastName", lastName);
    addField("sex", sex);
    addField("birthday", birthday);
    addField("placeBirth", placeBirth);
    addField("parishID", parishID);
    addField("quantityBrothers", quantityBrothers);
    addField("representativeID", representativeID);
    addField("motherName", motherName);
    addField("motherCi", motherCi);
    addField("motherTelephone", motherTelephone);
    addField("fatherName", fatherName);
    addField("fatherCi", fatherCi);
    addField("fatherTelephone", fatherTelephone);
    addField("livesMother", livesMother);
    addField("livesFather", livesFather);
    addField("livesBoth", livesBoth);
    addField("livesRepresentative", livesRepresentative);
    addField("rolRopresentative", rolRopresentative);
    addField("status_id", status_id); // Add status_id to updatable fields

    if (fields.length === 0) {
      throw new Error("No se proporcionaron campos para actualizar.");
    }

    fields.push(`updated_at = CURRENT_TIMESTAMP`);

    const query = {
      text: `
        UPDATE "student" 
        SET ${fields.join(", ")} 
        WHERE id = $${paramIndex++} 
        RETURNING *
      `,
      values: [...values, studentId],
    };

    console.log("🔍 Ejecutando query:", query.text);
    console.log("📦 Con valores:", query.values);

    console.log("🔍 Query de actualización a ejecutar:", query);
    const { rows } = await db.query(query);
    if (rows.length === 0) {
      throw new Error(`Estudiante con ID ${studentId} no encontrado.`);
    }
    console.log("✅ Estudiante actualizado:", rows[0]);
    return rows[0];
  } catch (error) {
    console.error("❌ Error in updateStudent:", error);
    throw error;
  }
};

// Eliminar un estudiante por su ID**
const deleteStudent = async (studentId) => {
  try {
    // Puedes optar por una eliminación física (DELETE) o una eliminación lógica (actualizar status_id)
    // Recomendación: Para datos sensibles como estudiantes, una eliminación lógica (cambiar status_id a "inactivo" o "eliminado") es preferible
    // Aquí implementaré la eliminación física por simplicidad, pero tenlo en cuenta.

    const query = {
      text: `
        DELETE FROM "student" 
        WHERE id = $1 
        RETURNING *
      `,
      values: [studentId],
    };

    console.log("🔍 Query de eliminación a ejecutar:", query);
    const { rows } = await db.query(query);
    if (rows.length === 0) {
      throw new Error(
        `Estudiante con ID ${studentId} no encontrado para eliminar.`
      );
    }
    console.log("🗑️ Estudiante eliminado:", rows[0]);
    return rows[0]; // Retorna el estudiante eliminado
  } catch (error) {
    console.error("❌ Error in deleteStudent:", error);
    throw error;
  }
};
// Crear historial académico
const createAcademicHistory = async (historyData) => {
  const {
    studentID,
    academicPeriodID,
    gradeID,
    institutionName,
    gradeAchieved,
    isApproved,
  } = historyData;

  const query = {
    text: `
      INSERT INTO "student_academic_history" (
        "studentID", "academicPeriodID", "gradeID", "institutionName",
        "gradeAchieved", "isApproved", "created_at", "updated_at"
      ) VALUES ($1, $2, $3, $4, $5, $6, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
      RETURNING *
    `,
    values: [studentID, academicPeriodID, gradeID, institutionName, gradeAchieved, isApproved],
  };
  const { rows } = await db.query(query);
  return rows[0];
};

// Obtener historial académico por estudiante
const getAcademicHistoryByStudent = async (studentID) => {
  const query = {
    text: `
      SELECT sah.*, ap.name AS academic_period, g.name AS grade
      FROM "student_academic_history" sah
      LEFT JOIN "academic_period" ap ON sah."academicPeriodID" = ap.id
      LEFT JOIN "grade" g ON sah."gradeID" = g.id
      WHERE sah."studentID" = $1
      ORDER BY sah."created_at" DESC
    `,
    values: [studentID],
  };
  const { rows } = await db.query(query);
  return rows;
};
export const StudentModel = {
  createStudentRegistry,
  getRegisteredNotEnrolledStudents,
  findStudentByCi,
  findOneById,
  updateStudentStatus,
  getAllStudents,
  updateStudent,
  deleteStudent,
  createAcademicHistory,
  getAcademicHistoryByStudent
};
