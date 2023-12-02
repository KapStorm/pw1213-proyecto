import mysql from 'mysql2'

const db = mysql.createPool({
    host: 'localhost',
    user: 'admin',
    password: 'admin',
    database: 'pw',
    port: 3306
})

export default db