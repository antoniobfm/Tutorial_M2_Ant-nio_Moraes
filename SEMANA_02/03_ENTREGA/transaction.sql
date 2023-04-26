BEGIN TRANSACTION;

CREATE TABLE experiencias(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  usuario_id INTEGER NOT NULL,
  nome TEXT NOT NULL,
  inicio INTEGER NOT NULL,
  fim INTEGER NULL,
  cargo TEXT NOT NULL,
  descricao TEXT NOT NULL
);

CREATE TABLE usuarios(id INTEGER PRIMARY KEY AUTOINCREMENT);

CREATE TABLE habilidades(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  usuario_id INTEGER NOT NULL,
  nome TEXT NOT NULL,
  estrelas INTEGER NOT NULL
);

CREATE TABLE sobre_mim(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  usuario_id INTEGER NOT NULL,
  cargo TEXT NOT NULL,
  nome TEXT NOT NULL,
  picture_url TEXT NOT NULL,
  endereco TEXT NOT NULL,
  telefone TEXT NOT NULL,
  email TEXT NOT NULL,
  biografia TEXT NOT NULL
);

CREATE TABLE personalidades(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  usuario_id INTEGER NOT NULL,
  nome TEXT NOT NULL,
  estrelas INTEGER NOT NULL
);

CREATE TABLE realizacoes(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  usuario_id INTEGER NOT NULL,
  nome TEXT NOT NULL,
  data INTEGER NOT NULL,
  descricao TEXT NOT NULL
);

CREATE TABLE formacoes(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  usuario_id INTEGER NOT NULL,
  nome INTEGER NOT NULL,
  inicio INTEGER NOT NULL,
  fim INTEGER NULL,
  descricao TEXT NOT NULL
);

CREATE INDEX experiencias_usuario_id_index ON experiencias (usuario_id);

CREATE INDEX realizacoes_usuario_id_index ON realizacoes (usuario_id);

CREATE INDEX habilidades_usuario_id_index ON habilidades (usuario_id);

CREATE INDEX sobre_mim_usuario_id_index ON sobre_mim (usuario_id);

CREATE INDEX formacoes_usuario_id_index ON formacoes (usuario_id);

CREATE INDEX personalidades_usuario_id_index ON personalidades (usuario_id);

CREATE FOREIGN KEY experiencias_usuario_id_foreign REFERENCES usuarios(id) ON DELETE RESTRICT ON UPDATE RESTRICT;

CREATE FOREIGN KEY realizacoes_usuario_id_foreign REFERENCES usuarios(id) ON DELETE RESTRICT ON UPDATE RESTRICT;

CREATE FOREIGN KEY habilidades_usuario_id_foreign REFERENCES usuarios(id) ON DELETE RESTRICT ON UPDATE RESTRICT;

CREATE FOREIGN KEY sobre_mim_usuario_id_foreign REFERENCES usuarios(id) ON DELETE RESTRICT ON UPDATE RESTRICT;

CREATE FOREIGN KEY formacoes_usuario_id_foreign REFERENCES usuarios(id) ON DELETE RESTRICT ON UPDATE RESTRICT;

CREATE FOREIGN KEY personalidades_usuario_id_foreign REFERENCES usuarios(id) ON DELETE RESTRICT ON UPDATE RESTRICT;

COMMIT;