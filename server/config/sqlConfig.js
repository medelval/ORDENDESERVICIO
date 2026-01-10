
// server/config/sqlConfig.js
module.exports = {
  user: 'useroficialia',
  password: 'oficialia2019',
  server: '10.2.1.9',
  database: 'hcg_produccion',
  options: {
    encrypt: false,              // true si usas Azure
    trustServerCertificate: true // necesario en local
  },
  port: 1433
};




