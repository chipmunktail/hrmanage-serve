'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Overtime extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Overtime.init({
    overtimeDate: DataTypes.DATE,
    overtimeStart: DataTypes.DATE,
    overtimeEnd: DataTypes.DATE,
    sumHour: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Overtime',
  });
  return Overtime;
};