import {Router} from "express";
import db from "./db.js";

const route = Router();

route.get('/', (req, res) => {
    db.query('SELECT * FROM maestros', (err, rows) => {
        if (err) return res.json({error: 'Error al obtener maestros'});

        res.json(rows)
    })
})

route.get('/:id', (req, res) => {
    const {id} = req.params;

    db.query(`SELECT * FROM maestros WHERE clavemaestro = ${id} LIMIT 1`, (err, rows) => {
        if (err) return res.json({error: 'Error al obtener maestro'});

        if (rows.length > 0) {
            return res.json(rows[0])
        }

        res.json({msg: `Maestro con id ${id} no encontrado`})
    })
})

route.post('/', (req, res) => {
    const {clavemaestro, nombre, departamento, estatus} = req.body;

    db.query(`INSERT INTO maestros (clavemaestro, nombre, departamento, estatus) VALUES (${clavemaestro}, '${nombre}', '${departamento}', '${estatus}')`, (err, rows) => {
        if (err) return res.json({error: 'Error al insertar maestro'});

        res.json({msg: `Maestro con id ${clavemaestro} ha sido creado`})
    })
})

route.put('/:id', (req, res) => {
    const {id} = req.params;
    const {nombre, departamento, estatus} = req.body;

    db.query(`UPDATE maestros SET nombre = '${nombre}', departamento = '${departamento}', estatus = '${estatus}' WHERE clavemaestro = ${id}`, (err, rows) => {
        if (err) return res.json({error: 'Error al actualizar maestro'});

        res.json({msg: `Maestro con id ${id} ha sido actualizado`})
    })
})

route.delete('/:id', (req, res) => {
    const {id} = req.params;

    db.query('DELETE FROM alumnosgrupos WHERE clavegrupo IN (SELECT clavegrupo FROM grupos WHERE clavemaestro = ?)', [id], (err, rows) => {
        if (err) return res.json({error: 'Error al eliminar maestro'});

        db.query('DELETE FROM grupos WHERE clavemaestro = ?', [id], (err, rows) => {
            if (err) return res.json({error: 'Error al eliminar maestro'});

            db.query('DELETE FROM maestros WHERE clavemaestro = ?', [id], (err, rows) => {
                if (err) return res.json({error: 'Error al eliminar maestro'});

                res.json({msg: `Maestro con id ${id} ha sido eliminado`})
            })
        })
    })
})

export default route;