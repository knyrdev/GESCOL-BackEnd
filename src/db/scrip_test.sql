-- #############################################################################
-- ## INSERCIÓN DE DATOS MASIVOS PARA PRUEBAS DE ESTRÉS Y FUNCIONALIDAD
-- #############################################################################

-- Limpieza preventiva para evitar conflictos si se desea re-ejecutar (opcional)
-- DELETE FROM "notes"; DELETE FROM "attendanceDetails"; DELETE FROM "attendance"; 
-- DELETE FROM "studentBrigade"; DELETE FROM "brigadeTeacherDate"; DELETE FROM "enrollment";
-- DELETE FROM "section"; DELETE FROM "student_academic_history"; DELETE FROM "student";
-- DELETE FROM "representative"; DELETE FROM "usuario"; DELETE FROM "personal";

-- -----------------------------------------------------------------------------
-- 1. PERSONAL (30 personas: Directivos, Secretarios, Docentes y Obreros)
-- -----------------------------------------------------------------------------
INSERT INTO "personal" ("id", "ci", "name", "lastName", "idRole", "telephoneNumber", "email", "birthday", "direction", "parish", "created_at", "updated_at") VALUES
(2,  'V10000002', 'Beatriz', 'Brito', 3, '0414-0000002', 'beatriz@escuela.com', '1980-02-02', 'Centro', 1, NOW(), NOW()),
(3,  'V10000003', 'Carlos', 'Carrillo', 2, '0414-0000003', 'carlos@escuela.com', '1985-03-03', 'Barrio Obrero', 2, NOW(), NOW()),
(4,  'V10000004', 'Dora', 'Duarte', 2, '0414-0000004', 'dora@escuela.com', '1988-04-04', 'Barrio Obrero', 2, NOW(), NOW()),
(5,  'V10000005', 'Edgar', 'Escobar', 2, '0414-0000005', 'edgar@escuela.com', '1990-05-05', 'La Concordia', 3, NOW(), NOW()),
(6,  'V10000006', 'Fabiola', 'Fuentes', 2, '0414-0000006', 'fabiola@escuela.com', '1992-06-06', 'La Concordia', 3, NOW(), NOW()),
(7,  'V10000007', 'Gilberto', 'Gómez', 2, '0414-0000007', 'gilberto@escuela.com', '1987-07-07', 'Táriba', 6, NOW(), NOW()),
(8,  'V10000008', 'Hilda', 'Hurtado', 2, '0414-0000008', 'hilda@escuela.com', '1989-08-08', 'Táriba', 6, NOW(), NOW()),
(9,  'V10000009', 'Iván', 'Ilarraza', 2, '0414-0000009', 'ivan@escuela.com', '1991-09-09', 'Palmira', 7, NOW(), NOW()),
(10, 'V10000010', 'Juana', 'Jiménez', 2, '0414-0000010', 'juana@escuela.com', '1993-10-10', 'Palmira', 7, NOW(), NOW()),
(11, 'V10000011', 'Kevin', 'Key', 2, '0414-0000011', 'kevin@escuela.com', '1986-11-11', 'San Josecito', 8, NOW(), NOW()),
(12, 'V10000012', 'Laura', 'López', 2, '0414-0000012', 'laura@escuela.com', '1984-12-12', 'San Josecito', 8, NOW(), NOW()),
(13, 'V10000013', 'Mario', 'Méndez', 2, '0414-0000013', 'mario@escuela.com', '1982-01-13', 'Pirineos', 4, NOW(), NOW()),
(14, 'V10000014', 'Nora', 'Navas', 2, '0414-0000014', 'nora@escuela.com', '1981-02-14', 'Pirineos', 4, NOW(), NOW()),
(15, 'V10000015', 'Oscar', 'Ortiz', 2, '0414-0000015', 'oscar@escuela.com', '1990-03-15', 'Genovés', 5, NOW(), NOW()),
(16, 'V10000016', 'Paula', 'Pérez', 4, '0414-0000016', 'paula@escuela.com', '1978-04-16', 'Genovés', 5, NOW(), NOW()),
(17, 'V10000017', 'Quique', 'Quintana', 4, '0414-0000017', 'quique@escuela.com', '1975-05-17', 'Unidad Vecinal', 1, NOW(), NOW()),
(18, 'V10000018', 'Rosa', 'Rojas', 2, '0414-0000018', 'rosa@escuela.com', '1988-06-18', 'Pueblo Nuevo', 1, NOW(), NOW()),
(19, 'V10000019', 'Saúl', 'Sosa', 2, '0414-0000019', 'saul@escuela.com', '1992-07-19', 'Pueblo Nuevo', 1, NOW(), NOW()),
(20, 'V10000020', 'Teresa', 'Torres', 2, '0414-0000020', 'teresa@escuela.com', '1991-08-20', 'Paramillo', 2, NOW(), NOW()),
(21, 'V10000021', 'Ugo', 'Urbina', 2, '0414-0000021', 'ugo@escuela.com', '1985-09-21', 'Paramillo', 2, NOW(), NOW()),
(22, 'V10000022', 'Vicky', 'Vera', 2, '0414-0000022', 'vicky@escuela.com', '1987-10-22', 'Las Acacias', 2, NOW(), NOW()),
(23, 'V10000023', 'Walter', 'White', 2, '0414-0000023', 'walter@escuela.com', '1989-11-23', 'Las Acacias', 2, NOW(), NOW()),
(24, 'V10000024', 'Xenia', 'Xing', 2, '0414-0000024', 'xenia@escuela.com', '1990-12-24', 'Lomas de Tejar', 3, NOW(), NOW()),
(25, 'V10000025', 'Yolanda', 'Yépez', 2, '0414-0000025', 'yolanda@escuela.com', '1983-01-25', 'Lomas de Tejar', 3, NOW(), NOW()),
(26, 'V10000026', 'Zila', 'Zamora', 2, '0414-0000026', 'zila@escuela.com', '1984-02-26', 'Barrancas', 6, NOW(), NOW()),
(27, 'V10000027', 'Armando', 'Arvelo', 2, '0414-0000027', 'armando@escuela.com', '1986-03-27', 'Barrancas', 6, NOW(), NOW()),
(28, 'V10000028', 'Bianca', 'Barrientos', 3, '0414-0000028', 'bianca@escuela.com', '1981-04-28', 'Guásimos', 7, NOW(), NOW()),
(29, 'V10000029', 'César', 'Colmenares', 1, '0414-0000029', 'cesar@escuela.com', '1979-05-29', 'Guásimos', 7, NOW(), NOW()),
(30, 'V10000030', 'Diana', 'Delgado', 2, '0414-0000030', 'diana@escuela.com', '1992-06-30', 'Genovés', 5, NOW(), NOW());

-- -----------------------------------------------------------------------------
-- 2. USUARIOS (Credenciales para Admin, Secretaría y algunos Docentes)
-- -----------------------------------------------------------------------------
INSERT INTO "usuario" ("id", "username", "password", "security_word", "respuesta_de_seguridad", "is_active", "personal_id", "created_at", "updated_at") VALUES
(2, 'secretaria', '$2a$10$ueNV2Oz0D.0ricexM0luveIHmTy3/aFdfz70qvjO5V55PKzSVah36', 'seguridad', 'respuesta', TRUE, 2, NOW(), NOW()),
(3, 'docente1', '$2a$10$ueNV2Oz0D.0ricexM0luveIHmTy3/aFdfz70qvjO5V55PKzSVah36', 'seguridad', 'respuesta', TRUE, 3, NOW(), NOW()),
(4, 'docente2', '$2a$10$ueNV2Oz0D.0ricexM0luveIHmTy3/aFdfz70qvjO5V55PKzSVah36', 'seguridad', 'respuesta', TRUE, 4, NOW(), NOW()),
(5, 'docente3', '$2a$10$ueNV2Oz0D.0ricexM0luveIHmTy3/aFdfz70qvjO5V55PKzSVah36', 'seguridad', 'respuesta', TRUE, 5, NOW(), NOW()),
(6, 'secretaria2', '$2a$10$ueNV2Oz0D.0ricexM0luveIHmTy3/aFdfz70qvjO5V55PKzSVah36', 'seguridad', 'respuesta', TRUE, 28, NOW(), NOW()),
(7, 'director', '$2a$10$ueNV2Oz0D.0ricexM0luveIHmTy3/aFdfz70qvjO5V55PKzSVah36', 'seguridad', 'respuesta', TRUE, 29, NOW(), NOW());

-- -----------------------------------------------------------------------------
-- 3. REPRESENTANTES (60 personas)
-- -----------------------------------------------------------------------------
DO $$
BEGIN
    FOR i IN 1..60 LOOP
        INSERT INTO "representative" ("ci", "name", "lastName", "telephoneNumber", "email", "profesion", "maritalStat", "birthday", "created_at", "updated_at")
        VALUES (
            'V' || (20000000 + i), 
            'Padre_' || i, 
            'Apellido_' || i, 
            '0424-' || LPAD(i::text, 7, '0'), 
            'rep' || i || '@test.com', 
            CASE WHEN i%3=0 THEN 'Ingeniero' WHEN i%3=1 THEN 'Comerciante' ELSE 'Empleado' END,
            'Casado(a)',
            '1985-05-15',
            NOW(), 
            NOW()
        );
    END LOOP;
END $$;

-- -----------------------------------------------------------------------------
-- 4. ESTUDIANTES (100 niños)
-- -----------------------------------------------------------------------------
DO $$
BEGIN
    FOR i IN 1..100 LOOP
        INSERT INTO "student" ("id", "ci", "name", "lastName", "sex", "birthday", "status_id", "representativeID", "motherName", "motherCi", "created_at", "updated_at")
        VALUES (
            i,
            'V' || (30000000 + i),
            'Alumno_' || i,
            'Apellido_' || (i % 60 + 1), -- Relacionar con algunos representantes por apellido
            CASE WHEN i%2=0 THEN 'Masculino' ELSE 'Femenino' END,
            '2015-06-15',
            1, -- Activo
            'V' || (20000000 + (i % 60 + 1)),
            'Madre_' || i,
            'V4000000' || i,
            NOW(),
            NOW()
        );
    END LOOP;
END $$;

-- -----------------------------------------------------------------------------
-- 5. SECCIONES (Para los últimos 3 periodos académicos)
--    IDs Periodos: 8 (2022-23), 9 (2023-24), 10 (2024-25)
-- -----------------------------------------------------------------------------

-- Periodo 2022-2023 (ID 8) - Grados 1 al 6, Sección A
INSERT INTO "section" ("id", "teacherCI", "gradeID", "academicPeriodID", "seccion", "created_at", "updated_at") VALUES
(801, 3, 3, 8, 'A', NOW(), NOW()), (802, 4, 4, 8, 'A', NOW(), NOW()), (803, 5, 5, 8, 'A', NOW(), NOW()),
(804, 6, 6, 8, 'A', NOW(), NOW()), (805, 7, 7, 8, 'A', NOW(), NOW()), (806, 8, 8, 8, 'A', NOW(), NOW());

-- Periodo 2023-2024 (ID 9) - Grados 1 al 6, Sección A y B
INSERT INTO "section" ("id", "teacherCI", "gradeID", "academicPeriodID", "seccion", "created_at", "updated_at") VALUES
(901, 3, 3, 9, 'A', NOW(), NOW()), (902, 4, 3, 9, 'B', NOW(), NOW()),
(903, 5, 4, 9, 'A', NOW(), NOW()), (904, 6, 4, 9, 'B', NOW(), NOW()),
(905, 7, 5, 9, 'A', NOW(), NOW()), (906, 8, 6, 9, 'A', NOW(), NOW()),
(907, 9, 7, 9, 'A', NOW(), NOW()), (908, 10, 8, 9, 'A', NOW(), NOW());

-- Periodo 2024-2025 (ID 10 - Actual) - Grados 1 al 6, Sección A, B y C en algunos
INSERT INTO "section" ("id", "teacherCI", "gradeID", "academicPeriodID", "seccion", "created_at", "updated_at") VALUES
(1001, 11, 3, 10, 'A', NOW(), NOW()), (1002, 12, 3, 10, 'B', NOW(), NOW()), (1003, 13, 3, 10, 'C', NOW(), NOW()),
(1004, 14, 4, 10, 'A', NOW(), NOW()), (1005, 15, 4, 10, 'B', NOW(), NOW()),
(1006, 18, 5, 10, 'A', NOW(), NOW()), (1007, 19, 5, 10, 'B', NOW(), NOW()),
(1008, 20, 6, 10, 'A', NOW(), NOW()), (1009, 21, 7, 10, 'A', NOW(), NOW()), (1010, 22, 8, 10, 'A', NOW(), NOW());

-- -----------------------------------------------------------------------------
-- 6. MATRÍCULAS (Inscripciones)
-- -----------------------------------------------------------------------------

-- Llenar Periodo 2023-2024 (ID 9) - 40 Estudiantes
DO $$
BEGIN
    FOR i IN 1..40 LOOP
        INSERT INTO "enrollment" ("id", "studentID", "sectionID", "academicPeriodID", "registrationDate", "repeater", "chemiseSize", "pantsSize", "shoesSize", "weight", "stature", "final_grade")
        VALUES (
            (900 + i), 
            i, 
            901 + (i % 8), 
            9, 
            '2023-09-15', 
            FALSE, 
            'S', '6', '30', 25.5, 1.20,
            CASE WHEN i%5=0 THEN 'B' ELSE 'A' END
        );
    END LOOP;
END $$;

-- Llenar Periodo 2024-2025 (ID 10 - Actual) - 80 Estudiantes
DO $$
BEGIN
    FOR i IN 1..80 LOOP
        INSERT INTO "enrollment" ("id", "studentID", "sectionID", "academicPeriodID", "registrationDate", "repeater", "chemiseSize", "pantsSize", "shoesSize", "weight", "stature")
        VALUES (
            (1000 + i), 
            i, 
            1001 + (i % 10), 
            10, 
            '2024-09-15', 
            CASE WHEN i=40 THEN TRUE ELSE FALSE END, 
            'M', '8', '32', 28.0, 1.30
        );
    END LOOP;
END $$;

-- -----------------------------------------------------------------------------
-- 7. BRIGADAS (Asignaciones)
-- -----------------------------------------------------------------------------

-- Docentes encargados por periodo
INSERT INTO "brigadeTeacherDate" ("brigadeID", "personalID", "academicPeriodID", "dateI") VALUES
(1, 10, 9, '2023-10-01'), (2, 11, 9, '2023-10-01'), (3, 12, 9, '2023-10-01'),
(1, 10, 10, '2024-10-01'), (2, 23, 10, '2024-10-01'), (3, 24, 10, '2024-10-01'),
(4, 25, 10, '2024-10-01'), (5, 26, 10, '2024-10-01');

-- Estudiantes en brigadas (Periodo Actual)
DO $$
BEGIN
    FOR i IN 1..40 LOOP
        INSERT INTO "studentBrigade" ("studentID", "brigadeID", "academicPeriodID", "assignmentDate")
        VALUES (i, (i % 7 + 1), 10, NOW());
    END LOOP;
END $$;

-- -----------------------------------------------------------------------------
-- 8. NOTAS (Para algunas materias y alumnos en el periodo actual)
-- -----------------------------------------------------------------------------
DO $$
BEGIN
    FOR i IN 1001..1020 LOOP -- Primeros 20 inscritos del periodo actual
        INSERT INTO "notes" ("enrollmentID", "notes", "period", "subject", "registrationDate")
        VALUES 
        (i, 'A', '1er Lapso', 'Lenguaje', '2024-12-05'),
        (i, 'B', '1er Lapso', 'Matemática', '2024-12-05'),
        (i, 'A', '1er Lapso', 'Ciencias', '2024-12-05');
    END LOOP;
END $$;

-- -----------------------------------------------------------------------------
-- 9. ASISTENCIA (Simulacro de una semana para 3 secciones)
-- -----------------------------------------------------------------------------
DO $$
DECLARE
    att_id BIGINT;
    sec_id INT;
    day_date DATE;
BEGIN
    FOR sec_id IN 1001..1003 LOOP -- Secciones A, B y C del 1er Grado actual
        FOR j IN 0..4 LOOP -- Lunes a Viernes
            day_date := '2025-01-13'::DATE + j;
            
            INSERT INTO "attendance" ("date_a", "sectionID", "observaciones") 
            VALUES (day_date, sec_id, 'Clases normales')
            RETURNING id INTO att_id;
            
            -- Llenar detalles de asistencia para todos los niños de esa sección
            INSERT INTO "attendanceDetails" ("attendanceID", "studentID", "assistant")
            SELECT att_id, e."studentID", (RANDOM() > 0.1) -- 90% asistencia
            FROM "enrollment" e 
            WHERE e."sectionID" = sec_id;
            
        END LOOP;
    END LOOP;
END $$;

-- -----------------------------------------------------------------------------
-- 10. HISTORIAL ACADÉMICO (Para nuevos ingresos)
-- -----------------------------------------------------------------------------
INSERT INTO "student_academic_history" ("studentID", "academicPeriodID", "gradeID", "institutionName", "gradeAchieved", "isApproved") VALUES
(90, 9, 2, 'Col. San José', 'A', TRUE),
(91, 9, 2, 'Escuela Nacional', 'B', TRUE),
(92, 9, 2, 'Col. Adventista', 'A', TRUE);

-- #############################################################################
-- ## FIN DEL SCRIPT DE SATURACIÓN DE DATOS
-- #############################################################################