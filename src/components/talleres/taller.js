'use strict'
module.exports = (sequelize, DataTypes) => {
  const Talleres = sequelize.define('Talleres', {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    Fecha: {
      type: DataTypes.Date,
      allowNull: false
    }
  }, {
    freezeTableName: true
  })

  return Talleres
}
