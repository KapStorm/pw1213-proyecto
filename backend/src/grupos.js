import {Router} from "express";
import db from "./db.js";

const route = Router()

route.get('/', (req, res) => {
    db.query('SELECT * FROM grupos', (err, rows) => {
        if (err) throw err;

        res.json(rows);
    })
})

route.get('/:id', (req, res) => {
    const {id} = req.params;

    db.query('SELECT * FROM grupos WHERE clavegrupo = ? LIMIT 1', [id], (err, rows) => {
        if (err) throw err;

        if (rows.length > 0) {
            return res.json(rows[0]);
        }

        res.json({msg: `Grupo con id ${id} no encontrado`});
    })
})

route.post('/', (req, res) => {
    const {clavegrupo, clavemateria, clavemaestro, limitealumnos, horariolunes, horariomartes, horariomiercoles, horariojueves, horarioviernes} = req.body;

    db.query('INSERT INTO grupos (clavegrupo, clavemateria, clavemaestro, limitealumnos, inscritos, horariolunes, horariomartes, horariomiercoles, horariojueves, horarioviernes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [clavegrupo, clavemateria, clavemaestro, limitealumnos, 0, horariolunes, horariomartes, horariomiercoles, horariojueves, horarioviernes], (err, rows) => {
        if (err) throw err;

        res.json({msg: 'Grupo insertado correctamente'});
    })
})

route.put('/:id', (req, res) => {
    const {clavemateria, clavemaestro, limitealumnos, horariolunes, horariomartes, horariomiercoles, horariojueves, horarioviernes} = req.body;
    const {id} = req.params;

    db.query('UPDATE grupos SET clavemateria = ?, clavemaestro = ?, limitealumnos = ?, horariolunes = ?, horariomartes = ?, horariomiercoles = ?, horariojueves = ?, horarioviernes = ? WHERE clavegrupo = ?', [clavemateria, clavemaestro, limitealumnos, horariolunes, horariomartes, horariomiercoles, horariojueves, horarioviernes, id], (err, rows) => {
        if (err) throw err;

        res.json({msg: 'Grupo actualizado correctamente'});
    })
})

route.delete('/:id', (req, res) => {
    const {id} = req.params;

    db.query('DELETE FROM grupos WHERE clavegrupo = ?', [id], (err, rows) => {
        if (err) throw err;

        res.json({msg: 'Grupo eliminado correctamente'});
    })
})

export default route
