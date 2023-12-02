import express from 'express'
import maestros from "./maestros.js";
import alumnos from "./alumnos.js";
import materias from "./materias.js";

const app = express()
const port = 3000

const routes = {
    maestros: {
        route: '/api/maestros',
        method: maestros
    },
    alumnos: {
        route: '/api/alumnos',
        method: alumnos
    },
    materias: {
        route: '/api/materias',
        method: materias
    }
}

function handleRoute({route, method}) {
    app.use(route, method)
}

handleRoute(routes.maestros)
handleRoute(routes.alumnos)
handleRoute(routes.materias)

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})