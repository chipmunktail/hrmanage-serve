'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Leave extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Leave.init({
    leaveDate: DataTypes.DATE,
    leaveStart: DataTypes.DATE,
    leaveEnd: DataTypes.DATE,
    sumHour: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Leave',
  });
  return Leave;
};