const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Formacoes = sequelize.define("formacoes", {
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
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    inicio: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fim: {
      type: DataTypes.INTEGER,
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });

  Formacoes.associate = (models) => {
    Formacoes.belongsTo(models.usuarios, {
      foreignKey: "usuario_id",
      targetKey: "id",
    });
  };

  return Formacoes;
};
