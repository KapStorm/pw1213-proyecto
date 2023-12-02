import {Router} from "express";
import db from "./db.js";

const route = Router()

route.get('/', (req, res) => {
    db.query('SELECT * FROM alumnosgrupos', (err, rows) => {
        if(err) throw err;
        res.json(rows);
    })
})

route.get('/:id', (req, res) => {
    db.query('SELECT * FROM alumnosgrupos WHERE id = ?', [req.params.id], (err, rows) => {
        if(err) throw err;

        if(rows.length > 0) {
            return res.json(rows[0]);
        }

        res.json(rows);
    })
})

route.post('/', (req, res) => {
    const {ncontrol, clavegrupo} = req.body;

    db.query('INSERT INTO alumnosgrupos (ncontrol, clavegrupo) VALUES (?, ?)', {ncontrol, clavegrupo}, (err, rows) => {
        if(err) throw err;
        res.json(rows);
    })
})

route.delete('/:id', (req, res) => {
    const {ncontrol, clavegrupo} = req.body;

    db.query('DELETE FROM alumnosgrupos WHERE ncontrol = ? AND clavegrupo = ?', [ncontrol, clavegrupo], (err, rows) => {
        if(err) throw err;
        res.json({msg: 'Alumno eliminado correctamente del grupo'});
    })
})

export default route;