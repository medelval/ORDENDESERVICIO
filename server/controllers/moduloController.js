const express = require('express');
const router = express.Router();
const { pool, sql, poolConnect } = require('../models/db');
 
  async function obtenerModulo(req, res) {
  const { id } = req.params;
  try {
    await poolConnect; // asegura que el pool esté conectado
    const result = await pool.request()
      .input('id', sql.Int, id)
      .query('SELECT * FROM hcg_cgi.dbo.servicios_ehc WHERE id = @id');

    if (result.recordset.length === 0) {
      return res.status(404).json({ error: 'Registro no encontrado' });
    }

    res.json(result.recordset[0]); // devuelve el registro completo
  } catch (error) {
    console.error('Error al obtener datos:', error);
    res.status(500).json({ error: 'Error al obtener datos' });
  }
}

async function guardarFormulario(req, res) {
  const { 
        serv, sol, uh, cate, nombre, rud, curp, cedula, 
        dgp, vig, cel, medico, opta, acepta,
        notas = '' // Asegura que 'notas' tenga un valor si no viene en el body
    } = req.body;
     console.log('req.body:', req.body);  
  try {
  await poolConnect;
  const fecha = new Date(); // formato SQL
  
  const servic = Array.isArray(serv) ? serv.join(',') : serv;
  const soli = Array.isArray(sol) ? sol.join(',') : sol;
  const fechaVigencia = vig ? new Date(vig) : null;   


      const iserv = `
                INSERT INTO hcg_cgi.dbo.servicios_ehc 
                (fecha, servicios, uh, cate, nombre, rud, dgp, vig, cel, sol, notas, med, estatus, opta, curp, cedula, folio)
                OUTPUT INSERTED.id
                VALUES 
                (@fecha, @servicios, @uh, @cate, @nombre, @rud, @dgp, @vig, @cel, @sol, @notas, @med, 1, @opta, @curp, @cedula, '0')
            `;
           
            
            const insertResult = await pool.request()
                .input('fecha', sql.DateTime, fecha)
                .input('servicios', sql.VarChar, servic)
                .input('uh', sql.Int, parseInt(uh))
                .input('cate', sql.Int, cate)
                .input('nombre', sql.VarChar, nombre)
                .input('rud', sql.VarChar, rud)
                .input('dgp', sql.VarChar, dgp)
                .input('vig', sql.Date, fechaVigencia)
                .input('cel', sql.VarChar, cel)
                .input('sol', sql.VarChar, soli)
                .input('notas', sql.VarChar, notas)
                .input('med', sql.VarChar, medico)
                .input('opta', sql.VarChar, opta)
                .input('curp', sql.VarChar, curp)
                .input('cedula', sql.VarChar, cedula)
                .query(iserv);

            const idserv = insertResult.recordset[0].id;
           
            // C. Generación y Actualización del Folio (Reemplazo de los IFs de PHP)
            let unh;
            switch (parseInt(uh))
             {
                case 1: unh = "JIM"; break;
                case 2: unh = "FAA"; break;
                case 3: unh = "OPD"; break;
                case 4: unh = "ORIENTE"; break;
                default: unh = "UNH";
            }
            const anoa = new Date().getFullYear();
            const nuevoFolio = `${unh}/${anoa}/${idserv}`;
            const userv = "UPDATE hcg_cgi.dbo.servicios_ehc SET folio = @folio WHERE id = @idserv";
            await pool.request()
                .input('folio', sql.VarChar, nuevoFolio)
                .input('idserv', sql.Int, idserv)
                .query(userv);

             // 3. SELECT para obtener los datos recién insertados
          const selectResult = await pool.request()
            .input('idserv', sql.Int, idserv)
            .query("SELECT * FROM hcg_cgi.dbo.servicios_ehc WHERE id = @idserv");

          const datosGuardados = selectResult.recordset[0];
            
                
    res.status(201).json({ 
    success: true, // Es bueno añadir un indicador booleano
    folio: nuevoFolio,  // ¡ESTO ES LO CRUCIAL!
    datos: datosGuardados, // ← aquí van todos los campos del registro
    formatoUrl: `${process.env.APP_URL || 'http://localhost:3001'}/formato/${idserv}?folio=${nuevoFolio}`


   }); 
  } catch (error)
  {
    console.error('Error al guardar formulario:', error);
    res.status(500).json({ 
      success:false,
      folio: null,
      message: 'Error al procesar db' 
     });
  }
}
module.exports = { obtenerModulo, guardarFormulario };