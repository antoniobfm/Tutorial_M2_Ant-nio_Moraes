CREATE TABLE usuarios (
  id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT
);

CREATE TABLE experiencias (
  id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  usuario_id INTEGER NOT NULL,
  nome TEXT NOT NULL,
  inicio INTEGER NOT NULL,
  fim INTEGER,
  cargo TEXT NOT NULL,
  descricao TEXT NOT NULL,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX experiencias_usuario_id_index ON experiencias (usuario_id);

CREATE TABLE formacoes (
  id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  usuario_id INTEGER NOT NULL,
  nome INTEGER NOT NULL,
  inicio INTEGER NOT NULL,
  fim INTEGER,
  descricao TEXT NOT NULL,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX formacoes_usuario_id_index ON formacoes (usuario_id);

CREATE TABLE habilidades (
  id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  usuario_id INTEGER NOT NULL,
  nome TEXT NOT NULL,
  estrelas INTEGER NOT NULL,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX habilidades_usuario_id_index ON habilidades (usuario_id);

CREATE TABLE personalidades (
  id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  usuario_id INTEGER NOT NULL,
  nome TEXT NOT NULL,
  estrelas INTEGER NOT NULL,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX personalidades_usuario_id_index ON personalidades (usuario_id);

CREATE TABLE realizacoes (
  id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  usuario_id INTEGER NOT NULL,
  nome TEXT NOT NULL,
  data INTEGER NOT NULL,
  descricao TEXT NOT NULL,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX realizacoes_usuario_id_index ON realizacoes (usuario_id);

CREATE TABLE sobre_mim (
  id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  usuario_id INTEGER NOT NULL,
  cargo TEXT NOT NULL,
  nome TEXT NOT NULL,
  picture_url TEXT NOT NULL,
  endereco TEXT NOT NULL,
  telefone TEXT NOT NULL,
  email TEXT NOT NULL,
  biografia TEXT NOT NULL,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX sobre_mim_usuario_id_index ON sobre_mim (usuario_id);