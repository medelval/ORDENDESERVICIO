const { poolConnect, pool } = require('./models/db');

async function probarConexion() {
  try {
    await poolConnect;
    const resultado = await pool.request().query('SELECT GETDATE() AS fecha');
    console.log('✅ Conexión exitosa. Fecha actual desde SQL Server:', resultado.recordset[0].fecha);
  } catch (error) {
    console.error('❌ Error al conectar con SQL Server:', error);
  }
}

probarConexion();
