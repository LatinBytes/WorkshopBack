'use strict'
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    UserName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ImageURI: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Token: {
      type: DataTypes.STRING,
      allowNull: false
    },
    TokenId: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    freezeTableName: true
  })

  return Users
}
