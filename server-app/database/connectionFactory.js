require('dotenv/config');
const mysql = require('mysql');

function creatDBConnection(){
    return mysql.createConnection({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    });
}

module.exports = function() {
    return creatDBConnection;
}