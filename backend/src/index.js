import express from 'express'
import maestros from "./maestros.js";

const app = express()
const port = 3000

const routes = {
    maestros: '/api/maestros'
}

app.use(routes.maestros, maestros)

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})