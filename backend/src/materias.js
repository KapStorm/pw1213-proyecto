import {Router} from "express";
import db from "./db.js";

const route = Router()

route.get('/', (req, res) => {
    db.query('SELECT * FROM materias', (err, rows) => {
        if (err) return res.json({error: 'Error al obtener materias'});

        res.json(rows);
    })
})

route.get('/:id', (req, res) => {
    const {id} = req.params;

    db.query('SELECT * FROM materias WHERE clavemateria = ? LIMIT 1', [id], (err, rows) => {
        if (err) return res.json({error: 'Error al obtener materia'});

        if (rows.length > 0) {
            return res.json(rows[0]);
        }

        res.json({msg: `Materia con id ${id} no encontrado`});
    })
})

route.post('/', (req, res) => {
    const {clavemateria, nombre, creditos} = req.body;

    db.query('INSERT INTO materias (clavemateria, nombre, creditos) VALUES (?, ?, ?)', [clavemateria, nombre, creditos], (err, rows) => {
        if (err) return res.json({error: 'Error al insertar materia'});

        res.json({msg: 'Materia insertada correctamente'});
    })
})

route.put('/:id', (req, res) => {
    const {nombre, creditos} = req.body;
    const {id} = req.params;

    db.query('UPDATE materias SET nombre = ?, creditos = ? WHERE clavemateria = ?', [nombre, creditos, id], (err, rows) => {
        if (err) return res.json({error: 'Error al actualizar materia'});

        res.json({msg: 'Materia actualizada correctamente'});
    })
})

route.delete('/:id', (req, res) => {
    const {id} = req.params;

    db.query('DELETE FROM alumnosgrupos WHERE clavegrupo = ?', [id], (err, rows) => {
        if (err) return res.json({error: 'Error al eliminar materia'});

        db.query('DELETE FROM grupos WHERE clavegrupo = ?', [id], (err, rows) => {
            if (err) return res.json({error: 'Error al eliminar materia'});

            db.query('DELETE FROM materias WHERE clavemateria = ?', [id], (err, rows) => {
                if (err) return res.json({error: 'Error al eliminar materia'});

                res.json({msg: 'Materia eliminada correctamente'});
            })
        })
    })
})

export default route