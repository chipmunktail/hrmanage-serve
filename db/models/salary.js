'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Salary extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Salary.hasOne(models.User, {
        foreignKey: 'salaryId',
        sourceKey: 'id',
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT'
      })
    }
  };
  Salary.init({
    salary: DataTypes.FLOAT,
  }, {
    sequelize,
    modelName: 'Salary',
  });
  return Salary;
};