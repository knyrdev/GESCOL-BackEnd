import express from "express"
import cors from "cors"
import "dotenv/config"
import userRoutes from "./src/routes/user.route.js"
import personalRoutes from "./src/routes/personal.route.js"
import pdfRoutes from "./src/routes/pdf.route.js"
import matriculaRoutes from "./src/routes/matricula.route.js"
import studentRoutes from "./src/routes/student.route.js"
import representativeRoutes from "./src/routes/representative.route.js"
import brigadaRoutes from "./src/routes/brigada.route.js"
import dashboardRoutes from "./src/routes/dashboard.route.js"
import { db } from "./src/db/connection.database.js"
import healthRoute from "./src/routes/health.route.js"
import { errorHandler, notFoundHandler } from "./src/middlewares/errorHandler.middleware.js"

const app = express()

// Configuración CORS
const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200,
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Rutas
app.use("/api/user", userRoutes)
app.use("/api/personal", personalRoutes)
app.use("/api/pdf", pdfRoutes)
app.use("/api/matriculas", matriculaRoutes)
app.use("/api/students", studentRoutes)
app.use("/api/representatives", representativeRoutes)
app.use("/api/brigadas", brigadaRoutes)
app.use("/api/dashboard", dashboardRoutes)

// Health check
app.use("/api/health", healthRoute)

// ── Error handling (must be registered AFTER all routes) ──────────────────
app.use(notFoundHandler)
app.use(errorHandler)

// Configuración del puerto
const PORT = process.env.PORT || 3001
const host = process.env.HOST || '0.0.0.0'
export function startServer(port = PORT) {
  return app.listen(port, host, () =>
    console.log(`Servidor corriendo en el puerto ${port}`)
  )
}

if (process.env.NODE_ENV !== 'test') {
  startServer()
}
