CREATE TABLE alumnos (
    ncontrol INT NOT NULL PRIMARY KEY,
    nombre VARCHAR(255),
    carrera VARCHAR(255),
    estatus VARCHAR(1),
);

CREATE TABLE maestros (
    clavemaestro INT NOT NULL PRIMARY KEY,
    nombre VARCHAR(150),
    departamento INT,
    estatus VARCHAR(1)
);

CREATE TABLE materias (
    clavemateria VARCHAR(8) NOT NULL PRIMARY KEY,
    nombre VARCHAR(150),
    creditos INT
);

CREATE TABLE grupos (
    clavegrupo VARCHAR(4) NOT NULL PRIMARY KEY,
    clavemateria VARCHAR(8) NOT NULL REFERENCES materias(clavemateria),
    clavemaestro INT NOT NULL REFERENCES maestros(clavemaestro),
    limitealumnos INT,
    inscritos INT,
    horariolunes VARCHAR(11),
    horariomartes VARCHAR(11),
    horariomiercoles VARCHAR(11),
    horariojueves VARCHAR(11),
    horarioviernes VARCHAR(11)
);

CREATE TABLE alumnosgrupos (
    ncontrol INT NOT NULL REFERENCES alumnos(ncontrol),
    clavegrupo VARCHAR(4) NOT NULL REFERENCES grupos(clavegrupo),
    PRIMARY KEY (ncontrol, clavegrupo)
);