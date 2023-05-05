const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Personalidades = sequelize.define("personalidades", {
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
    estrelas: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  Personalidades.associate = (models) => {
    Personalidades.belongsTo(models.usuarios, {
      foreignKey: "usuario_id",
      targetKey: "id",
    });
  };

  return Personalidades;
};
