import {Router} from "express";
import db from "./db.js";

const route = Router()

route.get('/', (req, res) => {
    db.query('SELECT * FROM alumnosgrupos', (err, rows) => {
        if(err) return res.json({error: 'Error al obtener alumnosgrupos'});
        res.json(rows);
    })
})

route.get('/:id', (req, res) => {
    db.query('SELECT * FROM alumnosgrupos WHERE clavegrupo = ?', [req.params.id], (err, rows) => {
        if(err) return res.json({error: 'Error al obtener alumnosgrupos'});

        if(rows.length > 0) {
            return res.json(rows[0]);
        }

        res.json(rows);
    })
})

route.post('/', (req, res) => {
    const {ncontrol, clavegrupo} = req.body;

    db.query('UPDATE grupos SET inscritos = inscritos + 1 WHERE clavegrupo = ?', [clavegrupo], (err, rows) => {
        if(err) return res.json({error: 'Error al insertar alumno en grupo'});

        db.query('INSERT INTO alumnosgrupos (ncontrol, clavegrupo) VALUES (?, ?)', [ncontrol, clavegrupo], (err, rows) => {
            if(err) return res.json({error: 'Error al insertar alumno en grupo'});
            res.json(rows);
        })
    })
})

route.delete('/', (req, res) => {
    const {ncontrol, clavegrupo} = req.body;

    db.query('UPDATE grupos SET inscritos = inscritos - 1 WHERE clavegrupo = ?', [clavegrupo], (err, rows) => {
        if(err) return res.json({error: 'Error al eliminar alumno del grupo'});

        db.query('DELETE FROM alumnosgrupos WHERE ncontrol = ? AND clavegrupo = ?', [ncontrol, clavegrupo], (err, rows) => {
            if(err) return res.json({error: 'Error al eliminar alumno del grupo'});
            res.json({msg: 'Alumno eliminado correctamente del grupo'});
        })
    })
})

export default route;