# Refactorización del Módulo de Representantes (Desacoplamiento)

Con el objetivo de hacer que el módulo de **Representantes** sea totalmente independiente y autónomo del módulo de **Estudiantes**, se han realizado modificaciones en la estructura de consultas a la base de datos y se actualizó la lógica de rutas.

A continuación, el detalle de los cambios para que el equipo de **FrontEnd** pueda adaptar las peticiones HTTP y consumir correctamente los endpoints.

---

## 🛑 Lo que cambió (Impacto directo en FrontEnd)

Anteriormente, cuando hacías un `GET` a los representantes, el backend realizaba un `LEFT JOIN` con la tabla `student`. Esto significaba que la respuesta del representante incluía automáticamente cuántos estudiantes tenía o la lista misma de estudiantes.

Para garantizar la independencia, **el módulo de Representante ahora solo devuelve los datos del Representante**.

### 1. `GET /api/representatives`
- **Antes:** Retornaba una lista de representantes donde cada uno incluía la propiedad `students_count` con la cantidad de hijos.
- **Ahora:** Retorna la información pura del representante. **Ya no incluye `students_count`**.

### 2. `GET /api/representatives/:ci`
- **Antes:** Retornaba un objeto de representante que incluía un arreglo de objetos `students` asociado.
- **Ahora:** Retorna **solo** los datos del representante. El arreglo `students` ha sido **removido**.

---

## ✅ La Solución (Nuevas Rutas para FrontEnd)

Ya que eliminamos la lista de estudiantes de las respuestas del representante, el equipo de FrontEnd ahora debe consultar los estudiantes asociados a un representante utilizando una ruta dedicada en el módulo de **Estudiantes**. 

### 🌟 Nueva Ruta
Para consultar los estudiantes asignados a un representante específico:

**Endpoint:** `GET /api/students/representative/:ci`

**Ejemplo de Petición:**
```http
GET /api/students/representative/V-12345678
```

**Ejemplo de Respuesta:**
```json
{
  "ok": true,
  "students": [
    {
      "id": 1,
      "ci": "30123456",
      "name": "Juan",
      "lastName": "Pérez",
      "status_description": "Activo",
      "representativeID": "V-12345678"
      //... restos de datos del estudiante
    }
  ],
  "total": 1
}
```

## 🔄 Flujo recomendado para el FrontEnd:
1. Si entras al perfil o tabla de un representante y necesitas listar sus datos, usa `GET /api/representatives/:ci`.
2. Si dentro de esa misma vista necesitas la tabla de hijos asignados, realiza una petición concurrente (al mismo tiempo) a `GET /api/students/representative/:ci`. Así cada módulo (representante y alumno) procesa su propia lógica abstrayendo la información a componentes individuales!.

---

### Archivos Modificados en este proceso:
- `src/models/representative.model.js` (Eliminados los JOINS).
- `src/models/student.model.js` (Agregada consulta `getStudentsByRepresentative`).
- `src/services/student.service.js` (Lógica delegada del modelo).
- `src/controllers/student.controller.js` (Implementación de función API).
- `src/routes/student.route.js` (Asignación del nuevo endpoint).
