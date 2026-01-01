'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class attendanceRecord extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  attendanceRecord.init({
    recordId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    checkDate: DataTypes.DATE,
    checkInTime: DataTypes.DATE,
    checkOutTime: DataTypes.DATE,
    checkInType: DataTypes.INTEGER,
    checkOutType: DataTypes.INTEGER,
    location: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'attendanceRecord',
  });
  return attendanceRecord;
};