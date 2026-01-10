const express = require('express');
const router = express.Router();
const { obtenerModulo, guardarFormulario } = require('../controllers/moduloController');
router.get('/:id', obtenerModulo);
router.post('/', guardarFormulario);
module.exports = router;
