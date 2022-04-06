const mysql = require('mysql2/promise');

console.log("Create the connection to database...");

// create the connection to database
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'admin123',
  database: 'map_alphagroup'
});

module.exports = pool;