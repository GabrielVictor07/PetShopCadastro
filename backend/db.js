const mysql = require('mysql2/promise');

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '', // senha do MySQL
    database: 'petshop'
};

module.exports = dbConfig;
