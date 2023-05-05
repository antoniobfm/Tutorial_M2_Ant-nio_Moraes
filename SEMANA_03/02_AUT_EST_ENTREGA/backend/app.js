const express = require("express");
const app = express();
const path = require("path");

const hostname = "127.0.0.1";
const port = 3003;
const sqlite3 = require("sqlite3").verbose();
const DBPATH = path.join(__dirname, "..", "database", "database.db"); //use o nome que você achar melhor para o banco de dados

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

// Cria uma formação para um usuário
app.post("/formacoes/:usuario_id", (req, res) => {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");
  var db = new sqlite3.Database(DBPATH); // Abre o banco

  console.log(req.body);

  // Check if the all the fields are filled
  if (!req.body.nome || !req.body.inicio || !req.body.descricao) {
    res.status(400).send("Todos os campos devem ser preenchidos");
    return;
  }

  var sql = `INSERT INTO formacoes (usuario_id, nome, inicio, ${
    req.body.fim && "fim, "
  } descricao) VALUES (${req.params.usuario_id}, '${req.body.nome}', ${
    req.body.inicio
  }, ${req.body.fim && req.body.fim + ", "} '${req.body.descricao}')`;

  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json(rows);
  });
  db.close(); // Fecha o banco
});

// Retorna as formações de um usuário
app.get("/formacoes/:usuario_id", (req, res) => {
  console.log("oloco");

  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");
  var db = new sqlite3.Database(DBPATH); // Abre o banco

  var sql =
    "SELECT nome, inicio, fim, descricao FROM formacoes WHERE " +
    req.params.usuario_id +
    " ORDER BY fim DESC";

  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }

    const formmatedRows = rows.map((row) => {
      const formatInicio = new Date(row.inicio).toLocaleDateString("pt-BR", {
        timeZone: "UTC",
      });

      const formatFim = row.fim
        ? new Date(row.fim).toLocaleDateString("pt-BR", { timeZone: "UTC" })
        : "Atualmente";

      return {
        nome: row.nome,
        inicio: formatInicio,
        fim: formatFim,
        descricao: row.descricao,
      };
    });

    res.json(formmatedRows);
  });
  db.close(); // Fecha o banco
});

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
