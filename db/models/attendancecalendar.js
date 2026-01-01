'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class attendanceCalendar extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  attendanceCalendar.init({
    calendarId: DataTypes.INTEGER,
    calendarDate: DataTypes.DATE,
    dayType: DataTypes.INTEGER,
    remark: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'attendanceCalendar',
  });
  return attendanceCalendar;
};