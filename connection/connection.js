require('dotenv').config();
const mysql = require('mysql');

const pool = mysql.createConnection({
  host: '127.0.0.1', //process.env.DB_HOST,
  port: 3306, //process.env.DB_PORT,
  user: 'root', //process.env.DB_USER,
  password: '', //process.env.DB_PASS,
  database: 'movies-world', //process.env.DB_NAME,
  multipleStatements: true,
});

pool.connect((err) => {
  let msg = !err ? 'connected successfully' : 'connection error';
  console.log(`mysql: ${msg}`);
});

module.exports = pool;
