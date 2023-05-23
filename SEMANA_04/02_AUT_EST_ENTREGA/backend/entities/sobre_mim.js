const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const SobreMim = sequelize.define("sobre_mim", {
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
    cargo: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    nome: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    picture_url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    endereco: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    telefone: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    biografia: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });

  SobreMim.associate = (models) => {
    SobreMim.belongsTo(models.usuarios, {
      foreignKey: "usuario_id",
      targetKey: "id",
    });
  };

  return SobreMim;
};
