const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Usuarios = sequelize.define("usuarios", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
  });

  return Usuarios;
};
