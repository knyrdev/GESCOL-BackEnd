import { db } from "../db/connection.database.js"
import bcryptjs from "bcryptjs"

const create = async ({
  username,
  password,
  securityWord,
  securityAnswer,
  personalId,
}) => {
  try {
    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(password, salt)

    const query = {
      text: `
        INSERT INTO "usuario" (
          "username", "password", "security_word", 
          "respuesta_de_seguridad", "personal_id", "is_active", 
          "created_at", "updated_at"
        )
        VALUES ($1, $2, $3, $4, $5, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
        RETURNING "id", "username", "personal_id", "is_active", "created_at"
      `,
      values: [username, hashedPassword, securityWord, securityAnswer, personalId],
    }
    const { rows } = await db.query(query)
    return rows[0]
  } catch (error) {
    console.error("Error in create user:", error)
    throw error
  }
}

const findOneByUsername = async (username) => {
  try {
    const query = {
      text: `
        SELECT u.*,
               per."name" as personal_nombre,
               per."lastName" as personal_apellido,
               per."ci" as personal_ci,
               r."name" as rol_nombre,
               r."description" as rol_descripcion
        FROM "usuario" u
        LEFT JOIN "personal" per ON u."personal_id" = per."id"
        LEFT JOIN "rol" r ON per."idRole" = r."id"
        WHERE u."username" = $1
      `,
      values: [username],
    }
    const { rows } = await db.query(query)
    return rows[0]
  } catch (error) {
    console.error("Error in findOneByUsername:", error)
    throw error
  }
}

const findOneById = async (id) => {
  try {
    const query = {
      text: `
        SELECT u.*,
               per."name" as personal_nombre,
               per."lastName" as personal_apellido,
               per."ci" as personal_ci,
               r."name" as rol_nombre,
               r."description" as rol_descripcion
        FROM "usuario" u
        LEFT JOIN "personal" per ON u."personal_id" = per."id"
        LEFT JOIN "rol" r ON per."idRole" = r."id"
        WHERE u."id" = $1
      `,
      values: [id],
    }
    const { rows } = await db.query(query)
    return rows[0]
  } catch (error) {
    console.error("Error in findOneById:", error)
    throw error
  }
}

const findAll = async () => {
  try {
    const query = {
      text: `
        SELECT u."id", u."username", u."personal_id" as "personalId",
               u."is_active" as "isActive", u."created_at" as "createdAt", u."last_login" as "lastLogin",
               CASE
                 WHEN u."personal_id" IS NOT NULL THEN CONCAT(per."name", ' ', per."lastName")
                 ELSE 'Usuario Externo'
               END as nombre_completo,
               per."ci" as cedula,
               r."name" as rol_nombre
        FROM "usuario" u
        LEFT JOIN "personal" per ON u."personal_id" = per."id"
        LEFT JOIN "rol" r ON per."idRole" = r."id"
        ORDER BY u."id"
      `,
    }
    const { rows } = await db.query(query)
    return rows
  } catch (error) {
    console.error("Error in findAll users:", error)
    throw error
  }
}

const updatePassword = async (id, hashedPassword) => {
  try {
    const query = {
      text: `
        UPDATE "usuario"
        SET "password" = $1,
            "updated_at" = CURRENT_TIMESTAMP
        WHERE "id" = $2
        RETURNING "id", "username"
      `,
      values: [hashedPassword, id],
    }
    const { rows } = await db.query(query)
    return rows[0]
  } catch (error) {
    console.error("Error in updatePassword:", error)
    throw error
  }
}

const updateProfile = async (id, { securityWord, securityAnswer }) => {
  try {
    const query = {
      text: `
        UPDATE "usuario"
        SET "security_word" = COALESCE($1, "security_word"),
            "respuesta_de_seguridad" = COALESCE($2, "respuesta_de_seguridad"),
            "updated_at" = CURRENT_TIMESTAMP
        WHERE "id" = $3
        RETURNING "id", "username", "security_word"
      `,
      values: [securityWord, securityAnswer, id],
    }
    const { rows } = await db.query(query)
    return rows[0]
  } catch (error) {
    console.error("Error in updateProfile:", error)
    throw error
  }
}

const updateLastLogin = async (id) => {
  try {
    const query = {
      text: `
        UPDATE "usuario"
        SET "last_login" = CURRENT_TIMESTAMP,
            "updated_at" = CURRENT_TIMESTAMP
        WHERE "id" = $1
      `,
      values: [id],
    }
    await db.query(query)
  } catch (error) {
    console.error("Error in updateLastLogin:", error)
  }
}

const setActive = async (id, isActive) => {
  try {
    const query = {
      text: `
        UPDATE "usuario"
        SET "is_active" = $1,
            "updated_at" = CURRENT_TIMESTAMP
        WHERE "id" = $2
        RETURNING "id", "username", "is_active"
      `,
      values: [isActive, id],
    }
    const { rows } = await db.query(query)
    return rows[0]
  } catch (error) {
    console.error("Error in setActive:", error)
    throw error
  }
}

const remove = async (id) => {
  try {
    const query = {
      text: 'DELETE FROM "usuario" WHERE "id" = $1 RETURNING "id"',
      values: [id],
    }
    const { rows } = await db.query(query)
    return rows[0]
  } catch (error) {
    console.error("Error in remove user:", error)
    throw error
  }
}

const findByPersonalId = async (personalId) => {
  try {
    const query = {
      text: `
        SELECT u.*,
               per."name" as personal_nombre,
               per."lastName" as personal_apellido,
               per."ci" as personal_ci,
               r."name" as rol_nombre,
               r."description" as rol_descripcion
        FROM "usuario" u
        LEFT JOIN "personal" per ON u."personal_id" = per."id"
        LEFT JOIN "rol" r ON per."idRole" = r."id"
        WHERE u."personal_id" = $1
      `,
      values: [personalId],
    }
    const { rows } = await db.query(query)
    return rows[0]
  } catch (error) {
    console.error("Error in findByPersonalId:", error)
    throw error
  }
}

const searchByUsername = async (username) => {
  try {
    const query = {
      text: `
        SELECT u."id", u."username", u."personal_id",
               u."is_active", u."created_at", u."last_login",
               CASE
                 WHEN u."personal_id" IS NOT NULL THEN CONCAT(per."name", ' ', per."lastName")
                 ELSE 'Usuario Externo'
               END as nombre_completo,
               per."ci" as cedula,
               r."name" as rol_nombre
        FROM "usuario" u
        LEFT JOIN "personal" per ON u."personal_id" = per."id"
        LEFT JOIN "rol" r ON per."idRole" = r."id"
        WHERE u."username" ILIKE $1
        ORDER BY u."id"
      `,
      values: [`%${username}%`],
    }
    const { rows } = await db.query(query)
    return rows
  } catch (error) {
    console.error("Error in searchByUsername:", error)
    throw error
  }
}

const verifySecurityAnswer = async (username, securityAnswer) => {
  try {
    const query = {
      text: `
        SELECT "id", "username", "security_word", "respuesta_de_seguridad"
        FROM "usuario"
        WHERE "username" = $1 AND "respuesta_de_seguridad" = $2
      `,
      values: [username, securityAnswer],
    }
    const { rows } = await db.query(query)
    return rows[0]
  } catch (error) {
    console.error("Error in verifySecurityAnswer:", error)
    throw error
  }
}

export const UserModel = {
  create,
  findOneByUsername,
  findOneById,
  findAll,
  updatePassword,
  updateProfile,
  updateLastLogin,
  setActive,
  remove,
  findByPersonalId,
  searchByUsername,
  verifySecurityAnswer,
}
