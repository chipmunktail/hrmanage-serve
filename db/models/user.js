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
      User.belongsTo(models.Department)
      User.belongsTo(models.Job)
      User.belongsTo(models.Salary)
      User.belongsTo(models.Role)
      User.hasMany(models.Performance, {
        foreignKey: 'userId',
        sourceKey: 'id',
      })
      User.hasMany(models.Overtime, {
        foreignKey: 'userId',
        sourceKey: 'id',
      })
      User.hasMany(models.Leave, {
        foreignKey: 'userId',
        sourceKey: 'id',
      })
    }
  };
  User.init({
    displayName: DataTypes.STRING,
    name: DataTypes.STRING,
    roleId: DataTypes.INTEGER,
    jobId: DataTypes.INTEGER,
    departmentId: DataTypes.INTEGER,
    freeHour: DataTypes.INTEGER,
    salaryId: DataTypes.INTEGER,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    enable: DataTypes.BOOLEAN,
    gender: DataTypes.INTEGER,
    national: DataTypes.STRING,
    birthDay: DataTypes.DATE,
    phone: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};