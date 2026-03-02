import { Router } from "express"
import { db } from "../db/connection.database.js"

const router = Router()

/**
 * GET /health
 * Database connectivity probe — no authentication required.
 */
router.get("/", async (req, res, next) => {
    try {
        const result = await db.query("SELECT NOW() as current_time;")
        res.json({
            ok: true,
            msg: "Servicio en línea",
            db: { connected: true, currentTime: result.rows[0].current_time },
        })
    } catch (error) {
        next(error)
    }
})

export default router
