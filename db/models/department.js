'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Department extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Department.hasOne(models.User, {
        foreignKey: 'id',
        sourceKey: 'managerId'
      })
      Department.hasMany(models.User, {
        foreignKey: 'departmentId',
        sourceKey: 'id',
        as: 'departmentUser'
      })
    }
  };
  Department.init({
    name: DataTypes.STRING,
    managerId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Department',
  });
  return Department;
};