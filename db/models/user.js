'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    displayName: DataTypes.STRING,
    name: DataTypes.STRING,
    roleId: DataTypes.INTEGER,
    jobId: DataTypes.INTEGER,
    departmentId: DataTypes.INTEGER,
    freeHour: DataTypes.INTEGER,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    enable: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};