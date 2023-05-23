const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Experiencias = sequelize.define("experiencias", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nome: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    inicio: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fim: {
      type: DataTypes.INTEGER,
    },
    cargo: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });

  Experiencias.associate = (models) => {
    Experiencias.belongsTo(models.usuarios, {
      foreignKey: "usuario_id",
      targetKey: "id",
    });
  };

  return Experiencias;
};
