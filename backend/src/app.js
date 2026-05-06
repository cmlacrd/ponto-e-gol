const express = require('express');
const pool = require('./db');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API Ponto e Gol rodando ⚽');
});

app.get('/jogadores', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM jogadores');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});

app.get('/estatisticas', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT j.nome, e.*
      FROM estatisticas e
      JOIN jogadores j ON j.id = e.jogador_id
    `);

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});