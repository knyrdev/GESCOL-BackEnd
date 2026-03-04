-- DML - Primera Inyección de Datos (Datos de Usabilidad/Producción Inicial)
-- Compatible con PostgreSQL
-- -----------------------------------------------------------------------------
-- 1. Rellenar Tabla 'country'
-- -----------------------------------------------------------------------------
INSERT INTO "country" ("name", "created_at", "updated_at") VALUES
('Venezuela', NOW(), NOW());

-- -----------------------------------------------------------------------------
-- 2. Rellenar Tabla 'state' (Táchira y algunos estados vecinos)
-- -----------------------------------------------------------------------------
INSERT INTO "state" ("name", "countryID", "created_at", "updated_at") VALUES
('Táchira', (SELECT id FROM "country" WHERE name = 'Venezuela'), NOW(), NOW()),
('Mérida', (SELECT id FROM "country" WHERE name = 'Venezuela'), NOW(), NOW()),
('Trujillo', (SELECT id FROM "country" WHERE name = 'Venezuela'), NOW(), NOW()),
('Zulia', (SELECT id FROM "country" WHERE name = 'Venezuela'), NOW(), NOW()),
('Barinas', (SELECT id FROM "country" WHERE name = 'Venezuela'), NOW(), NOW());

-- -----------------------------------------------------------------------------
-- 3. Rellenar Tabla 'municipality' (Municipios de Táchira y algunos vecinos)
--    Nota: Se incluyen solo algunos municipios por estado para ejemplificar.
-- -----------------------------------------------------------------------------

-- Municipios de Táchira
INSERT INTO "municipality" ("name", "stateID", "created_at", "updated_at") VALUES
('San Cristóbal', (SELECT id FROM "state" WHERE name = 'Táchira'), NOW(), NOW()),
('Andrés Bello', (SELECT id FROM "state" WHERE name = 'Táchira'), NOW(), NOW()),
('Ayacucho', (SELECT id FROM "state" WHERE name = 'Táchira'), NOW(), NOW()),
('Cárdenas', (SELECT id FROM "state" WHERE name = 'Táchira'), NOW(), NOW()),
('Córdoba', (SELECT id FROM "state" WHERE name = 'Táchira'), NOW(), NOW()),
('Fernández Feo', (SELECT id FROM "state" WHERE name = 'Táchira'), NOW(), NOW()),
('Guásimos', (SELECT id FROM "state" WHERE name = 'Táchira'), NOW(), NOW()),
('Jáuregui', (SELECT id FROM "state" WHERE name = 'Táchira'), NOW(), NOW()),
('Libertador', (SELECT id FROM "state" WHERE name = 'Táchira'), NOW(), NOW()),
('Michelena', (SELECT id FROM "state" WHERE name = 'Táchira'), NOW(), NOW()),
('Panamericano', (SELECT id FROM "state" WHERE name = 'Táchira'), NOW(), NOW()),
('San Judas Tadeo', (SELECT id FROM "state" WHERE name = 'Táchira'), NOW(), NOW()),
('Torbes', (SELECT id FROM "state" WHERE name = 'Táchira'), NOW(), NOW());

-- Municipios de Mérida (ejemplos)
INSERT INTO "municipality" ("name", "stateID", "created_at", "updated_at") VALUES
('Libertador (Mérida)', (SELECT id FROM "state" WHERE name = 'Mérida'), NOW(), NOW()),
('Alberto Adriani', (SELECT id FROM "state" WHERE name = 'Mérida'), NOW(), NOW());

-- Municipios de Barinas (ejemplos)
INSERT INTO "municipality" ("name", "stateID", "created_at", "updated_at") VALUES
('Barinas', (SELECT id FROM "state" WHERE name = 'Barinas'), NOW(), NOW()),
('Bolívar (Barinas)', (SELECT id FROM "state" WHERE name = 'Barinas'), NOW(), NOW());

-- -----------------------------------------------------------------------------
-- 4. Rellenar Tabla 'parish' (Parroquias de los municipios de Táchira)
--    Nota: Se incluyen algunas parroquias para los municipios más relevantes.
-- -----------------------------------------------------------------------------

-- Parroquias de San Cristóbal (Táchira)
INSERT INTO "parish" ("name", "minicipalityID", "created_at", "updated_at") VALUES
('San Juan Bautista', (SELECT id FROM "municipality" WHERE name = 'San Cristóbal' AND "stateID" = (SELECT id FROM "state" WHERE name = 'Táchira')), NOW(), NOW()),
('San Sebastián', (SELECT id FROM "municipality" WHERE name = 'San Cristóbal' AND "stateID" = (SELECT id FROM "state" WHERE name = 'Táchira')), NOW(), NOW()),
('La Concordia', (SELECT id FROM "municipality" WHERE name = 'San Cristóbal' AND "stateID" = (SELECT id FROM "state" WHERE name = 'Táchira')), NOW(), NOW()),
('Pedro María Morantes', (SELECT id FROM "municipality" WHERE name = 'San Cristóbal' AND "stateID" = (SELECT id FROM "state" WHERE name = 'Táchira')), NOW(), NOW()),
('Dr. Francisco Romero Lobo', (SELECT id FROM "municipality" WHERE name = 'San Cristóbal' AND "stateID" = (SELECT id FROM "state" WHERE name = 'Táchira')), NOW(), NOW());

-- Parroquias de Cárdenas (Táchira)
INSERT INTO "parish" ("name", "minicipalityID", "created_at", "updated_at") VALUES
('Táriba', (SELECT id FROM "municipality" WHERE name = 'Cárdenas' AND "stateID" = (SELECT id FROM "state" WHERE name = 'Táchira')), NOW(), NOW()),
('Amenodoro Rangel Lamús', (SELECT id FROM "municipality" WHERE name = 'Cárdenas' AND "stateID" = (SELECT id FROM "state" WHERE name = 'Táchira')), NOW(), NOW()),
('La Florida', (SELECT id FROM "municipality" WHERE name = 'Cárdenas' AND "stateID" = (SELECT id FROM "state" WHERE name = 'Táchira')), NOW(), NOW());

-- Parroquias de Ayacucho (Táchira)
INSERT INTO "parish" ("name", "minicipalityID", "created_at", "updated_at") VALUES
('San Juan de Colón', (SELECT id FROM "municipality" WHERE name = 'Ayacucho' AND "stateID" = (SELECT id FROM "state" WHERE name = 'Táchira')), NOW(), NOW()),
('Rivas Berti', (SELECT id FROM "municipality" WHERE name = 'Ayacucho' AND "stateID" = (SELECT id FROM "state" WHERE name = 'Táchira')), NOW(), NOW()),
('San Pedro del Río', (SELECT id FROM "municipality" WHERE name = 'Ayacucho' AND "stateID" = (SELECT id FROM "state" WHERE name = 'Táchira')), NOW(), NOW());

-- Parroquias de Torbes (Táchira)
INSERT INTO "parish" ("name", "minicipalityID", "created_at", "updated_at") VALUES
('San Josecito', (SELECT id FROM "municipality" WHERE name = 'Torbes' AND "stateID" = (SELECT id FROM "state" WHERE name = 'Táchira')), NOW(), NOW());

-- Parroquias de Guásimos (Táchira)
INSERT INTO "parish" ("name", "minicipalityID", "created_at", "updated_at") VALUES
('Palmira', (SELECT id FROM "municipality" WHERE name = 'Guásimos' AND "stateID" = (SELECT id FROM "state" WHERE name = 'Táchira')), NOW(), NOW());

-- Parroquias de Andrés Bello (Táchira)
INSERT INTO "parish" ("name", "minicipalityID", "created_at", "updated_at") VALUES
('Cordero', (SELECT id FROM "municipality" WHERE name = 'Andrés Bello' AND "stateID" = (SELECT id FROM "state" WHERE name = 'Táchira')), NOW(), NOW());

-- Parroquias de Córdoba (Táchira)
INSERT INTO "parish" ("name", "minicipalityID", "created_at", "updated_at") VALUES
('Santa Ana del Táchira', (SELECT id FROM "municipality" WHERE name = 'Córdoba' AND "stateID" = (SELECT id FROM "state" WHERE name = 'Táchira')), NOW(), NOW());

-- Parroquias de Fernández Feo (Táchira)
INSERT INTO "parish" ("name", "minicipalityID", "created_at", "updated_at") VALUES
('San Rafael del Piñal', (SELECT id FROM "municipality" WHERE name = 'Fernández Feo' AND "stateID" = (SELECT id FROM "state" WHERE name = 'Táchira')), NOW(), NOW()),
('Alberto Adriani', (SELECT id FROM "municipality" WHERE name = 'Fernández Feo' AND "stateID" = (SELECT id FROM "state" WHERE name = 'Táchira')), NOW(), NOW()),
('Santo Domingo', (SELECT id FROM "municipality" WHERE name = 'Fernández Feo' AND "stateID" = (SELECT id FROM "state" WHERE name = 'Táchira')), NOW(), NOW());

-- Parroquias de Jáuregui (Táchira)
INSERT INTO "parish" ("name", "minicipalityID", "created_at", "updated_at") VALUES
('La Grita', (SELECT id FROM "municipality" WHERE name = 'Jáuregui' AND "stateID" = (SELECT id FROM "state" WHERE name = 'Táchira')), NOW(), NOW()),
('Emilio Constantino Guerrero', (SELECT id FROM "municipality" WHERE name = 'Jáuregui' AND "stateID" = (SELECT id FROM "state" WHERE name = 'Táchira')), NOW(), NOW()),
('Monseñor Miguel Antonio Salas', (SELECT id FROM "municipality" WHERE name = 'Jáuregui' AND "stateID" = (SELECT id FROM "state" WHERE name = 'Táchira')), NOW(), NOW());

-- Parroquias de Libertador (Táchira)
INSERT INTO "parish" ("name", "minicipalityID", "created_at", "updated_at") VALUES
('Abejales', (SELECT id FROM "municipality" WHERE name = 'Libertador' AND "stateID" = (SELECT id FROM "state" WHERE name = 'Táchira')), NOW(), NOW()),
('Doradas', (SELECT id FROM "municipality" WHERE name = 'Libertador' AND "stateID" = (SELECT id FROM "state" WHERE name = 'Táchira')), NOW(), NOW()),
('Emeterio Ochoa', (SELECT id FROM "municipality" WHERE name = 'Libertador' AND "stateID" = (SELECT id FROM "state" WHERE name = 'Táchira')), NOW(), NOW()),
('San Joaquín de Navay', (SELECT id FROM "municipality" WHERE name = 'Libertador' AND "stateID" = (SELECT id FROM "state" WHERE name = 'Táchira')), NOW(), NOW());

-- Parroquias de Michelena (Táchira)
INSERT INTO "parish" ("name", "minicipalityID", "created_at", "updated_at") VALUES
('Michelena', (SELECT id FROM "municipality" WHERE name = 'Michelena' AND "stateID" = (SELECT id FROM "state" WHERE name = 'Táchira')), NOW(), NOW());

-- Parroquias de Panamericano (Táchira)
INSERT INTO "parish" ("name", "minicipalityID", "created_at", "updated_at") VALUES
('Coloncito', (SELECT id FROM "municipality" WHERE name = 'Panamericano' AND "stateID" = (SELECT id FROM "state" WHERE name = 'Táchira')), NOW(), NOW()),
('La Palmita', (SELECT id FROM "municipality" WHERE name = 'Panamericano' AND "stateID" = (SELECT id FROM "state" WHERE name = 'Táchira')), NOW(), NOW());

-- Parroquias de San Judas Tadeo (Táchira)
INSERT INTO "parish" ("name", "minicipalityID", "created_at", "updated_at") VALUES
('Umuquena', (SELECT id FROM "municipality" WHERE name = 'San Judas Tadeo' AND "stateID" = (SELECT id FROM "state" WHERE name = 'Táchira')), NOW(), NOW());

-- Parroquias de Libertador (Mérida)
INSERT INTO "parish" ("name", "minicipalityID", "created_at", "updated_at") VALUES
('Antonio Spinetti Dini', (SELECT id FROM "municipality" WHERE name = 'Libertador (Mérida)' AND "stateID" = (SELECT id FROM "state" WHERE name = 'Mérida')), NOW(), NOW()),
('Arias', (SELECT id FROM "municipality" WHERE name = 'Libertador (Mérida)' AND "stateID" = (SELECT id FROM "state" WHERE name = 'Mérida')), NOW(), NOW()),
('Caracciolo Parra Pérez', (SELECT id FROM "municipality" WHERE name = 'Libertador (Mérida)' AND "stateID" = (SELECT id FROM "state" WHERE name = 'Mérida')), NOW(), NOW()),
('Domingo Peña', (SELECT id FROM "municipality" WHERE name = 'Libertador (Mérida)' AND "stateID" = (SELECT id FROM "state" WHERE name = 'Mérida')), NOW(), NOW()),
('El Llano', (SELECT id FROM "municipality" WHERE name = 'Libertador (Mérida)' AND "stateID" = (SELECT id FROM "state" WHERE name = 'Mérida')), NOW(), NOW()),
('Gonzalo Picón Febres', (SELECT id FROM "municipality" WHERE name = 'Libertador (Mérida)' AND "stateID" = (SELECT id FROM "state" WHERE name = 'Mérida')), NOW(), NOW()),
('Jacinto Plaza', (SELECT id FROM "municipality" WHERE name = 'Libertador (Mérida)' AND "stateID" = (SELECT id FROM "state" WHERE name = 'Mérida')), NOW(), NOW()),
('Juan Rodríguez Suárez', (SELECT id FROM "municipality" WHERE name = 'Libertador (Mérida)' AND "stateID" = (SELECT id FROM "state" WHERE name = 'Mérida')), NOW(), NOW()),
('Lasso de la Vega', (SELECT id FROM "municipality" WHERE name = 'Libertador (Mérida)' AND "stateID" = (SELECT id FROM "state" WHERE name = 'Mérida')), NOW(), NOW()),
('Mariano Picón Salas', (SELECT id FROM "municipality" WHERE name = 'Libertador (Mérida)' AND "stateID" = (SELECT id FROM "state" WHERE name = 'Mérida')), NOW(), NOW()),
('Milla', (SELECT id FROM "municipality" WHERE name = 'Libertador (Mérida)' AND "stateID" = (SELECT id FROM "state" WHERE name = 'Mérida')), NOW(), NOW()),
('Osuna Rodríguez', (SELECT id FROM "municipality" WHERE name = 'Libertador (Mérida)' AND "stateID" = (SELECT id FROM "state" WHERE name = 'Mérida')), NOW(), NOW()),
('Sagrario', (SELECT id FROM "municipality" WHERE name = 'Libertador (Mérida)' AND "stateID" = (SELECT id FROM "state" WHERE name = 'Mérida')), NOW(), NOW()),
('Santa Elena', (SELECT id FROM "municipality" WHERE name = 'Libertador (Mérida)' AND "stateID" = (SELECT id FROM "state" WHERE name = 'Mérida')), NOW(), NOW()),
('El Morro', (SELECT id FROM "municipality" WHERE name = 'Libertador (Mérida)' AND "stateID" = (SELECT id FROM "state" WHERE name = 'Mérida')), NOW(), NOW()),
('Los Nevados', (SELECT id FROM "municipality" WHERE name = 'Libertador (Mérida)' AND "stateID" = (SELECT id FROM "state" WHERE name = 'Mérida')), NOW(), NOW());

-- Parroquias de Alberto Adriani (Mérida)
INSERT INTO "parish" ("name", "minicipalityID", "created_at", "updated_at") VALUES
('Presidente Betancourt', (SELECT id FROM "municipality" WHERE name = 'Alberto Adriani' AND "stateID" = (SELECT id FROM "state" WHERE name = 'Mérida')), NOW(), NOW()),
('Presidente Páez', (SELECT id FROM "municipality" WHERE name = 'Alberto Adriani' AND "stateID" = (SELECT id FROM "state" WHERE name = 'Mérida')), NOW(), NOW()),
('Presidente Rómulo Gallegos', (SELECT id FROM "municipality" WHERE name = 'Alberto Adriani' AND "stateID" = (SELECT id FROM "state" WHERE name = 'Mérida')), NOW(), NOW()),
('Gabriel Picón González', (SELECT id FROM "municipality" WHERE name = 'Alberto Adriani' AND "stateID" = (SELECT id FROM "state" WHERE name = 'Mérida')), NOW(), NOW()),
('Hector Amable Mora', (SELECT id FROM "municipality" WHERE name = 'Alberto Adriani' AND "stateID" = (SELECT id FROM "state" WHERE name = 'Mérida')), NOW(), NOW()),
('José Nucete Sardi', (SELECT id FROM "municipality" WHERE name = 'Alberto Adriani' AND "stateID" = (SELECT id FROM "state" WHERE name = 'Mérida')), NOW(), NOW()),
('Pulido Méndez', (SELECT id FROM "municipality" WHERE name = 'Alberto Adriani' AND "stateID" = (SELECT id FROM "state" WHERE name = 'Mérida')), NOW(), NOW());

-- Parroquias de Barinas (Barinas)
INSERT INTO "parish" ("name", "minicipalityID", "created_at", "updated_at") VALUES
('Barinas', (SELECT id FROM "municipality" WHERE name = 'Barinas' AND "stateID" = (SELECT id FROM "state" WHERE name = 'Barinas')), NOW(), NOW()),
('Alfredo Arvelo Larriva', (SELECT id FROM "municipality" WHERE name = 'Barinas' AND "stateID" = (SELECT id FROM "state" WHERE name = 'Barinas')), NOW(), NOW()),
('San Silvestre', (SELECT id FROM "municipality" WHERE name = 'Barinas' AND "stateID" = (SELECT id FROM "state" WHERE name = 'Barinas')), NOW(), NOW()),
('Santa Inés', (SELECT id FROM "municipality" WHERE name = 'Barinas' AND "stateID" = (SELECT id FROM "state" WHERE name = 'Barinas')), NOW(), NOW()),
('Santa Lucía', (SELECT id FROM "municipality" WHERE name = 'Barinas' AND "stateID" = (SELECT id FROM "state" WHERE name = 'Barinas')), NOW(), NOW()),
('Torunos', (SELECT id FROM "municipality" WHERE name = 'Barinas' AND "stateID" = (SELECT id FROM "state" WHERE name = 'Barinas')), NOW(), NOW()),
('El Carmen', (SELECT id FROM "municipality" WHERE name = 'Barinas' AND "stateID" = (SELECT id FROM "state" WHERE name = 'Barinas')), NOW(), NOW()),
('Rómulo Betancourt', (SELECT id FROM "municipality" WHERE name = 'Barinas' AND "stateID" = (SELECT id FROM "state" WHERE name = 'Barinas')), NOW(), NOW()),
('Corazón de Jesús', (SELECT id FROM "municipality" WHERE name = 'Barinas' AND "stateID" = (SELECT id FROM "state" WHERE name = 'Barinas')), NOW(), NOW()),
('Ramón Ignacio Méndez', (SELECT id FROM "municipality" WHERE name = 'Barinas' AND "stateID" = (SELECT id FROM "state" WHERE name = 'Barinas')), NOW(), NOW()),
('Alto Barinas', (SELECT id FROM "municipality" WHERE name = 'Barinas' AND "stateID" = (SELECT id FROM "state" WHERE name = 'Barinas')), NOW(), NOW()),
('Manuel Palacio Fajardo', (SELECT id FROM "municipality" WHERE name = 'Barinas' AND "stateID" = (SELECT id FROM "state" WHERE name = 'Barinas')), NOW(), NOW()),
('Juan Antonio Rodríguez Domínguez', (SELECT id FROM "municipality" WHERE name = 'Barinas' AND "stateID" = (SELECT id FROM "state" WHERE name = 'Barinas')), NOW(), NOW()),
('Dominga Ortiz de Páez', (SELECT id FROM "municipality" WHERE name = 'Barinas' AND "stateID" = (SELECT id FROM "state" WHERE name = 'Barinas')), NOW(), NOW());

-- Parroquias de Bolívar (Barinas)
INSERT INTO "parish" ("name", "minicipalityID", "created_at", "updated_at") VALUES
('Barinitas', (SELECT id FROM "municipality" WHERE name = 'Bolívar (Barinas)' AND "stateID" = (SELECT id FROM "state" WHERE name = 'Barinas')), NOW(), NOW()),
('Altamira de Cáceres', (SELECT id FROM "municipality" WHERE name = 'Bolívar (Barinas)' AND "stateID" = (SELECT id FROM "state" WHERE name = 'Barinas')), NOW(), NOW()),
('Calderas', (SELECT id FROM "municipality" WHERE name = 'Bolívar (Barinas)' AND "stateID" = (SELECT id FROM "state" WHERE name = 'Barinas')), NOW(), NOW());

-- -----------------------------------------------------------------------------
-- 5. Rellenar Tabla 'rol'
-- -----------------------------------------------------------------------------
INSERT INTO "rol" ("name", "description", "created_at", "updated_at") VALUES
('Administrador', 'Control total del sistema.', NOW(), NOW()),
('Docente', 'Acceso a la gestión de sus secciones y alumnos.', NOW(), NOW()),
('Secretaría', 'Gestión de matrículas, datos de estudiantes y reportes.', NOW(), NOW()),
('Mantenimiento', 'Gestión de recursos y mantenimiento de instalaciones.', NOW(), NOW());

-- -----------------------------------------------------------------------------
-- 7. Rellenar Tabla 'status_student'
-- -----------------------------------------------------------------------------
INSERT INTO "status_student" ("descripcion", "created_at", "updated_at") VALUES
('Activo', NOW(), NOW()),
('Inscrito', NOW(), NOW()),
('Graduado', NOW(), NOW()),
('Egresado', NOW(), NOW()),
('Inactivo', NOW(), NOW()),
('Retirado', NOW(), NOW()),
('Expulsado', NOW(), NOW());

-- -----------------------------------------------------------------------------
-- 8. Rellenar Tabla 'grade'
-- -----------------------------------------------------------------------------
INSERT INTO "grade" ("name", "created_at", "updated_at") VALUES
('1er Nivel', NOW(), NOW()),
('2do Nivel', NOW(), NOW()),
('1er Grado', NOW(), NOW()),
('2do Grado', NOW(), NOW()),
('3er Grado', NOW(), NOW()),
('4to Grado', NOW(), NOW()),
('5to Grado', NOW(), NOW()),
('6to Grado', NOW(), NOW());

-- -----------------------------------------------------------------------------
-- 9. Rellenar Tabla 'brigade' (Basado en los nombres de tu script anterior)
-- -----------------------------------------------------------------------------
INSERT INTO "brigade" ("name", "created_at", "updated_at") VALUES
('Brigada Ecológica', NOW(), NOW()),
('Brigada de Patrulleros Escolares', NOW(), NOW()),
('Brigada Comunicacional', NOW(), NOW()),
('Brigada de Primeros Auxilios', NOW(), NOW()),
('Brigada de Deporte y Recreación', NOW(), NOW()),
('Brigada de Convivencia y Paz', NOW(), NOW()),
('Brigada de Muralistas', NOW(), NOW());

-- -----------------------------------------------------------------------------
-- 10. Rellenar Tabla 'academic_period'
-- -----------------------------------------------------------------------------
INSERT INTO "academic_period" ("name", "start_date", "end_date", "is_current", "created_at", "updated_at") VALUES
('2015-2016', '2015-09-15', '2016-07-31', FALSE, NOW(), NOW()),
('2016-2017', '2016-09-15', '2017-07-31', FALSE, NOW(), NOW()),
('2017-2018', '2017-09-15', '2018-07-31', FALSE, NOW(), NOW()),
('2018-2019', '2018-09-15', '2019-07-31', FALSE, NOW(), NOW()),
('2019-2020', '2019-09-15', '2020-07-31', FALSE, NOW(), NOW()),
('2020-2021', '2020-09-15', '2021-07-31', FALSE, NOW(), NOW()),
('2021-2022', '2021-09-15', '2022-07-31', FALSE, NOW(), NOW()),
('2022-2023', '2022-09-15', '2023-07-31', FALSE, NOW(), NOW()),
('2023-2024', '2023-09-15', '2024-07-31', FALSE, NOW(), NOW()),
('2024-2025', '2024-09-16', '2025-07-31', TRUE, NOW(), NOW());

INSERT INTO "personal" ("id", "ci", "name", "lastName", "idRole", "telephoneNumber", "email", "birthday", "direction", "parish", "created_at", "updated_at") VALUES
(900,  'V9228510', 'Belkys Yudith', 'Vásquez Mariño', 1, '0414565314', 'k4vasquez@gmail.com', '1965-12-22', 'Calle 7, Carrera 1, N°1-38', 3, NOW(), NOW());

INSERT INTO "usuario" ("id", "username", "password", "security_word", "respuesta_de_seguridad", "is_active", "personal_id", "created_at", "updated_at") VALUES
(900, 'gescol', '$2a$12$jW7B0/2xNgKuCN0brGac9O08Zr3xlKzZauE/DAAgTOaihOyZieDf2', 'seguridad', 'gescol', TRUE, 900, NOW(), NOW());