const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Routers externos
const categoriasRouter = require('./routers/categorias');
const moduloRouter = require('./routers/modulo');

app.use('/categorias', categoriasRouter);
app.use('/modulo', moduloRouter); // ← aquí está tu POST real

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
});