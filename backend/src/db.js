import mysql from 'mysql2'

// ESTA ES LA CONFIG DE LA BD USANDO DOCKER
const db = mysql.createPool({
    host: 'localhost',
    user: 'admin',
    password: 'admin',
    database: 'pw',
    port: 3306
})

// const db = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'pw1213',
// })

export default db