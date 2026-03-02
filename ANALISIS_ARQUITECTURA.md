# Análisis de Arquitectura y Puntos Débiles del Proyecto

Este documento proporciona un desglose detallado de la arquitectura actual del backend de **GESCOL** y identifica áreas de mejora en funcionalidad, seguridad y persistencia.

---

## 1. Análisis de Arquitectura

El proyecto está construido sobre **Node.js** utilizando el framework **Express**. Sigue una evolución del patrón MVC, organizándose en las siguientes capas:

### Estructura de Capas
- **Rutas (`src/routes/`)**: Definen los puntos de entrada de la API y asignan middlewares de validación y autenticación.
- **Controladores (`src/controllers/`)**: Reciben las peticiones, coordinan la lógica y devuelven las respuestas HTTP.
- **Servicios (`src/services/`)**: (Inconsistente) Se utilizan para validaciones de negocio y formateo de datos en algunos módulos.
- **Modelos (`src/models/`)**: Responsables de la interacción directa con la base de datos PostgreSQL mediante consultas SQL nativas.
- **Middlewares (`src/middlewares/`)**: Gestionan la autenticación JWT y la validación de esquemas.

### Tecnologías Clave
- **Base de Datos**: PostgreSQL (cliente `pg`).
- **Autenticación**: JSON Web Tokens (JWT).
- **Seguridad**: `bcryptjs` para el hashing de contraseñas.
- **Validación**: Uso dual de `joi` y `zod`.
- **Generación de Reportes**: `pdfkit`.

---

## 2. Puntos Débiles: Funcionalidad

### A. Inconsistencia en la Lógica de Negocio
Se observa que la lógica de negocio está dispersa:
- Algunos módulos usan **Servicios** para validar (`brigada.service.js`).
- Otros módulos integran lógica pesada en los **Modelos** (`user.model.js`).
- Otros mantienen lógica compleja directamente en los **Controladores** (`pdf.controller.js`).
*Esta dispersión dificulta el mantenimiento y la creación de pruebas unitarias.*

### B. "God Objects" (Controladores Obesos)
El archivo `pdf.controller.js` cuenta con más de 1100 líneas. Mezcla lógica de obtención de datos con lógica de diseño de documentos (coordenadas, fuentes, saltos de página). Si cambias el esquema de la base de datos o el diseño del PDF, este archivo se vuelve extremadamente difícil de mantener.

### C. Ausencia de un Manejador Global de Errores
Cada controlador maneja sus propios bloques `try/catch` de forma repetitiva. No existe un middleware centralizado que capture errores, lo que genera inconsistencias en las respuestas de error enviadas al cliente.

### D. Mezcla de Librerías de Validación
El uso simultáneo de `joi` y `zod` indica una falta de estándar en el desarrollo. Se recomienda unificar bajo una sola librería (preferiblemente `zod` por su integración con TypeScript en el futuro).

---

## 3. Puntos Débiles: Seguridad

### A. Almacenamiento de Datos Sensibles en Texto Plano
En el modelo de usuario (`user.model.js`), campos críticos como `password_reset_token` y `respuesta_de_seguridad` se almacenan sin hashing. 
- Si la base de datos se ve comprometida, los atacantes pueden resetear contraseñas fácilmente.
- Las preguntas de seguridad pierden su propósito si la respuesta es visible en la DB.

### B. Secretos Hardcodeados
El middleware de JWT (`jwt.middleware.js`) contiene claves secretas por defecto:
```javascript
const JWT_SECRET = process.env.JWT_SECRET || "escuela-jwt-secret-key-2024-development"
```
Si por error se despliega sin configurar las variables de entorno, el sistema será vulnerable por diseño usando claves conocidas.

### C. Configuración de CORS Insegura
En `index.js`, el CORS está configurado con `origin: "*"`. Esto permite que cualquier sitio web realice peticiones a la API, facilitando ataques de tipo CSRF o robo de datos desde el navegador.

### D. Ausencia de Rate Limiting
No hay protecciones contra ataques de fuerza bruta en los endpoints de `login` o `recuperación de contraseña`. Un atacante podría realizar miles de intentos por segundo sin ser bloqueado.

---

## 4. Puntos Débiles: Persistencia

### A. Falta de Sistema de Migraciones
La base de datos se gestiona mediante scripts SQL manuales (`src/db/script_escuela.sql`). 
- No hay rastro de cambios en el esquema (versionado).
- Dificulta el despliegue en nuevos entornos (producción/staging) y la colaboración entre desarrolladores.

### B. Uso de SQL Nativo sin Capa de Abstracción (ORM)
Aunque el SQL nativo es eficiente, en este proyecto genera:
- **Duplicación de código**: Consultas muy similares repetidas en diferentes métodos del modelo.
- **Riesgo de Inyección SQL**: Aunque se usan parámetros `$1, $2`, la concatenación manual en búsquedas dinámicas (`searchByUsername`) es un punto de riesgo si no se maneja con cuidado extremo.

### C. Fragilidad en la Conexión
El archivo `connection.database.js` intenta manejar puertos dinámicos pero termina forzando el puerto `5432`. Además, ante un error de socket, el proceso se cierra inmediatamente (`process.exit(-1)`), lo que puede causar caídas del servicio innecesarias si el error es transitorio.

---

## 5. Recomendaciones de Mejora

1.  **Refactorización de PDFs**: Mover la lógica de generación de PDF a una clase de utilidad o servicio dedicado, separando la obtención de datos de la representación visual.
2.  **Seguridad**: Aplicar `bcrypt` a las respuestas de seguridad y tokens de recuperación.
3.  **CORS**: Restringir los orígenes permitidos solo a los dominios del frontend.
4.  **Infraestructura**: Implementar un sistema de migraciones (como `Knex.js` o `Sequelize`) para gestionar el esquema de la base de datos de forma profesional.
5.  **Centralización**: Crear un middleware de error global y unificar las validaciones bajo un solo estándar.
