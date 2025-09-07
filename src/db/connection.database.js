import pg from "pg"
import dotenv from "dotenv"
import fs from "fs"
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Cargar las variables de entorno desde el archivo .env
dotenv.config({
  path: path.join(__dirname, '../../.ENV')
})

const { Pool } = pg

// Intenta leer el puerto dinámico generado por Electron
let dynamicPort = 5432;
// Extrae los datos de la URL original
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL no está definida. Verifica tu archivo .env y su ubicación.");
}
const match = process.env.DATABASE_URL.match(/^postgres(?:ql)?:\/\/([^:]+):([^@]+)@([^:]+):\d+\/(.+)$/);
if (!match) {
  throw new Error("DATABASE_URL inválida");
}
const [ , user, password, host, database ] = match;

// Construye el string de conexión con el puerto dinámico
const connectionString = `postgresql://${user}:${password}@${host}:${dynamicPort}/${database}`;

const pool = new Pool({
  connectionString,
});

pool.on("connect", () => {
  console.log("Connected to the database")
})

pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err)
  process.exit(-1)
})

export const db = {
  query: (text, params) => pool.query(text, params),
}
