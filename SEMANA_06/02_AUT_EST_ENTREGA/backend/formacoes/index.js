import { Router } from "express";
import sqlite from "sqlite3";
import { fileURLToPath } from "url";
import path from "path";

const sqlite3 = sqlite.verbose();
const formacoesRoutes = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DBPATH = path.join(__dirname, "..", "..", "database", "database.db"); //use o nome que você achar melhor para o banco de dados

// GET endpoint for /listaFormacao
formacoesRoutes.get('/listaFormacao', (req, res) => {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");
  var db = new sqlite3.Database(DBPATH); // Abre o banco

  const sql = 'SELECT * FROM formacoes';

  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }

    res.json(rows);
  });
});

// POST endpoint for /insereFormacao
formacoesRoutes.post('/insereFormacao', (req, res) => {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");
  var db = new sqlite3.Database(DBPATH); // Abre o banco
  
  const { usuario_id, nome, inicio, fim, descricao } = req.body;

  const sql = `INSERT INTO formacoes (usuario_id, nome, inicio, fim, descricao) VALUES ('${usuario_id}', '${nome}', ${inicio}, ${fim || null}, '${descricao}') RETURNING *`;

  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }

    res.json(rows);
  });
});

// GET endpoint for /atualizaFormacao
formacoesRoutes.get('/atualizaFormacao/:formacao_id', (req, res) => {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");
  const formacaoId = req.params.formacao_id;
  const db = new sqlite3.Database(DBPATH);

  const sql = `SELECT * FROM formacoes WHERE id = ${formacaoId}`;

  db.get(sql, [], (err, row) => {
    if (err) {
      throw err;
    }

    if (!row) {
      res.status(404).send(`Formação com ID ${formacaoId} não encontrada`);
      return;
    }

    res.json(row);
  });

  db.close();
});

// POST endpoint for /atualizaFormacao
formacoesRoutes.post('/atualizaFormacao/:formacao_id', (req, res) => {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");
  const formacaoId = req.params.formacao_id;
  const db = new sqlite3.Database(DBPATH);

  const sql = `UPDATE formacoes SET nome = '${req.body.nome}', inicio = ${req.body.inicio}, fim = ${req.body.fim || null}, descricao = '${req.body.descricao}' WHERE id = ${formacaoId}`;

  db.run(sql, [], (err) => {
    if (err) {
      throw err;
    }

    res.send(`Formação com ID ${formacaoId} atualizada com sucesso`);
  });

  db.close();
});

// DELETE endpoint for /removeFormacao
formacoesRoutes.delete('/removeFormacao/:formacao_id', (req, res) => {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");
  const formacaoId = req.params.formacao_id;
  const db = new sqlite3.Database(DBPATH);

  const sql = `DELETE FROM formacoes WHERE id = ${formacaoId}`;

  db.run(sql, [], (err) => {
    if (err) {
      throw err;
    }

    res.send(`Formação com ID ${formacaoId} removida com sucesso`);
  });

  db.close();
});

export default formacoesRoutes;
