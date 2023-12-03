import express from 'express'
import cors from 'cors'
import maestros from "./maestros.js";
import alumnos from "./alumnos.js";
import materias from "./materias.js";
import grupos from "./grupos.js";
import alumnosgrupos from "./alumnosgrupos.js";

const app = express()
const port = 3000

app.use(express.json())
app.use(cors({origin: '*'}))

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
    },
    grupos: {
        route: '/api/grupos',
        method: grupos
    },
    alumnosgrupos: {
        route: '/api/alumnos-grupos',
        method: alumnosgrupos
    }
}

function handleRoute({route, method}) {
    app.use(route, method)
}

handleRoute(routes.maestros)
handleRoute(routes.alumnos)
handleRoute(routes.materias)
handleRoute(routes.grupos)
handleRoute(routes.alumnosgrupos)

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})