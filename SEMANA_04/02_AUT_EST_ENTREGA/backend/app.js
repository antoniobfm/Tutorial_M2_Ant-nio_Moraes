import express from "express";
const app = express();
import { fileURLToPath } from "url";

import path from "path";

const hostname = "127.0.0.1";
const port = 3003;
import sqlite from "sqlite3";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DBPATH = path.join(__dirname, "..", "database", "database.db"); //use o nome que você achar melhor para o banco de dados
import routes from "./routes.js";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use(routes);

const sqlite3 = sqlite.verbose();

// Retorna as habilidades de um usuário
app.get("/habilidades/:usuario_id", (req, res) => {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");
  var db = new sqlite3.Database(DBPATH); // Abre o banco

  var sql =
    "SELECT nome, estrelas FROM habilidades WHERE " +
    req.params.usuario_id +
    " ORDER BY estrelas DESC";

  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json(rows);
  });
  db.close(); // Fecha o banco
});

// Retorna as experiências de um usuário
app.get("/experiencias/:usuario_id", (req, res) => {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");
  var db = new sqlite3.Database(DBPATH); // Abre o banco

  var sql =
    "SELECT nome, inicio, fim, cargo, descricao FROM experiencias WHERE " +
    req.params.usuario_id +
    " ORDER BY fim DESC";

  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json(rows);
  });
  db.close(); // Fecha o banco
});

// Retorna as realizacoes de um usuário
app.get("/realizacoes/:usuario_id", (req, res) => {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");
  var db = new sqlite3.Database(DBPATH); // Abre o banco

  var sql =
    "SELECT nome, data, descricao FROM realizacoes WHERE " +
    req.params.usuario_id +
    " ORDER BY data DESC";

  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json(rows);
  });
  db.close(); // Fecha o banco
});

app.get("*", (req, res) => {
  // Also load the page's scripts
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
