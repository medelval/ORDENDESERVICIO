const sql = require('mssql');
const config = require('../config/sqlConfig');

// 👇 hacemos copia para evitar que sea inmutable
const pool = new sql.ConnectionPool({ ...config });
const poolConnect = pool.connect();

pool.on('error', err => {
  console.error('Error en la conexión con SQL Server:', err);
});

module.exports = { sql, pool, poolConnect };

