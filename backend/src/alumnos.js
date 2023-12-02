import {Router} from "express";
import db from "./db.js";

const route = Router()

route.get('/', (req, res) => {
    db.query('SELECT * FROM alumnos', (err, rows) => {
        if (err) throw err;

        res.json(rows);
    })
})

route.get('/:id', (req, res) => {
    const {id} = req.params;

    db.query('SELECT * FROM alumnos WHERE ncontrol = ? LIMIT 1', [id], (err, rows) => {
        if (err) throw err;

        if (rows.length > 0) {
            return res.json(rows[0]);
        }

        res.json({msg: `Alumno con id ${id} no encontrado`});
    })
})

route.post('/', (req, res) => {
    const {ncontrol, nombre, carrera, estatus} = req.body;

    db.query('INSERT INTO alumnos (ncontrol, nombre, carrera, estatus) VALUES (?, ?, ?, ?)', [ncontrol, nombre, carrera, estatus], (err, rows) => {
        if (err) throw err;

        res.json({msg: 'Alumno insertado correctamente'});
    })
})

route.put('/:id', (req, res) => {
    const {nombre, carrera, estatus} = req.body;
    const {id} = req.params;

    db.query('UPDATE alumnos SET nombre = ?, carrera = ?, estatus = ? WHERE ncontrol = ?', [nombre, carrera, estatus, id], (err, rows) => {
        if (err) throw err;

        res.json({msg: 'Alumno actualizado correctamente'});
    })
})

route.delete('/:id', (req, res) => {
    const {id} = req.params;

    db.query('DELETE FROM alumnos WHERE ncontrol = ?', [id], (err, rows) => {
        if (err) throw err;

        res.json({msg: 'Alumno eliminado correctamente'});
    })
})

export default route;