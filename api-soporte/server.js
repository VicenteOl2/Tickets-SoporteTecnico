const express = require('express');
const cors = require('cors');
const { mssql, poolPromise } = require('./db');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Endpoint base
app.get('/', (req, res) => {
  res.status(200).json({ mensaje: 'API de Soporte Técnico Funcionando' });
});

// GET: Obtener todos los tickets
app.get('/api/tickets', async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .query('SELECT * FROM tickets ORDER BY id DESC');
    res.status(200).json(result.recordset);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al consultar los tickets' });
  }
});

// GET: Obtener ticket por ID
app.get('/api/tickets/:id', async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ mensaje: 'ID inválido' });
  }

  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('id', mssql.Int, id)
      .query('SELECT * FROM tickets WHERE id = @id');

    if (result.recordset.length === 0) {
      return res.status(404).json({ mensaje: 'Ticket no encontrado' });
    }
    res.status(200).json(result.recordset[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al consultar el ticket' });
  }
});

// POST: Registrar nuevo ticket
app.post('/api/tickets', async (req, res) => {
  const { asunto, solicitante, descripcion, categoria, prioridad, estado } = req.body;

  if (!asunto || !solicitante || !descripcion || !categoria) {
    return res.status(400).json({ mensaje: 'Complete los campos obligatorios' });
  }

  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('asunto', mssql.VarChar(150), asunto.trim())
      .input('solicitante', mssql.VarChar(100), solicitante.trim())
      .input('descripcion', mssql.VarChar(mssql.MAX), descripcion.trim())
      .input('categoria', mssql.VarChar(50), categoria.trim())
      .input('prioridad', mssql.VarChar(20), prioridad || 'Media')
      .input('estado', mssql.VarChar(20), estado || 'Abierto')
      .query(`
        INSERT INTO tickets (asunto, solicitante, descripcion, categoria, prioridad, estado)
        OUTPUT INSERTED.id
        VALUES (@asunto, @solicitante, @descripcion, @categoria, @prioridad, @estado)
      `);

    const nuevoId = result.recordset[0].id;
    res.status(201).json({ id: nuevoId, ...req.body });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al registrar el ticket' });
  }
});

// PUT: Actualizar ticket
app.put('/api/tickets/:id', async (req, res) => {
  const id = Number(req.params.id);
  const { asunto, solicitante, descripcion, categoria, prioridad, estado } = req.body;

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ mensaje: 'ID inválido' });
  }

  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('id', mssql.Int, id)
      .input('asunto', mssql.VarChar(150), asunto.trim())
      .input('solicitante', mssql.VarChar(100), solicitante.trim())
      .input('descripcion', mssql.VarChar(mssql.MAX), descripcion.trim())
      .input('categoria', mssql.VarChar(50), categoria.trim())
      .input('prioridad', mssql.VarChar(20), prioridad)
      .input('estado', mssql.VarChar(20), estado)
      .query(`
        UPDATE tickets 
        SET asunto = @asunto, solicitante = @solicitante, descripcion = @descripcion, 
            categoria = @categoria, prioridad = @prioridad, estado = @estado
        WHERE id = @id
      `);

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ mensaje: 'Ticket no encontrado' });
    }
    res.status(200).json({ mensaje: 'Ticket actualizado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al actualizar el ticket' });
  }
});

// DELETE: Eliminar ticket
app.delete('/api/tickets/:id', async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ mensaje: 'ID inválido' });
  }

  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('id', mssql.Int, id)
      .query('DELETE FROM tickets WHERE id = @id');

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ mensaje: 'Ticket no encontrado' });
    }
    res.status(200).json({ mensaje: 'Ticket eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al eliminar el ticket' });
  }
});

app.listen(PORT, () => {
  console.log(`API escuchando en http://localhost:${PORT}`);
});