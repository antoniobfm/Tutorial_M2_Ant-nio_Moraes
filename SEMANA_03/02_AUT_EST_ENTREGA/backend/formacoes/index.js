import { Router } from "express";

const formacoesRoutes = Router();

// Cria uma formação para um usuário
formacoesRoutes.post("/:usuario_id", (req, res) => {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");
  var db = new sqlite3.Database(DBPATH); // Abre o banco

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
formacoesRoutes.get("/:usuario_id", (req, res) => {
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

export default formacoesRoutes;
