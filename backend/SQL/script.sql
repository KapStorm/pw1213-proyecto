CREATE TABLE alumnos (
    ncontrol INT,
    nombre VARCHAR(255),
    carrera VARCHAR(255),
    estatus VARCHAR(1)
);

CREATE TABLE maestros (
    clavemaestro INT,
    nombre VARCHAR(150),
    departamento INT,
    estatus VARCHAR(1)
);

CREATE TABLE materias (
    clavemateria VARCHAR(8),
    nombre VARCHAR(150),
    creditos INT
);

CREATE TABLE grupos (
    clavemateria VARCHAR(8),
    clavegrupo VARCHAR(4),
    clavemaestro INT,
    limitealumnos INT,
    inscritos INT,
    horariolunes VARCHAR(11),
    horariomartes VARCHAR(11),
    horariomiercoles VARCHAR(11),
    horariojueves VARCHAR(11),
    horarioviernes VARCHAR(11)
);