'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Log extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Log.init({
    logDate: DataTypes.DATE,
    userName: DataTypes.STRING,
    roleName: DataTypes.STRING,
    operateType: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    params: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Log',
  });
  return Log;
};