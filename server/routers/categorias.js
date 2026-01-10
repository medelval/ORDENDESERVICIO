const express = require('express');
const router = express.Router();
const { pool, sql, poolConnect } = require('../models/db');

router.get('/', async (req, res) => {
  try {
    await poolConnect;
    const result = await pool.request()
      .query('SELECT codigo_categoria, nom_categ FROM hcg_produccion.dbo.tcategor ORDER BY nom_categ');
    res.json(result.recordset);
  } catch (err) {
    console.error('Error al obtener categorías:', err);
    res.status(500).send('Error en el servidor');
  }
});

module.exports = router;
