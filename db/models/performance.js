'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Performance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Performance.belongsTo(models.User)
    }
  };
  Performance.init({
    month: DataTypes.INTEGER,
    rankDate: DataTypes.DATE,
    rankLevel: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Performance',
  });
  return Performance;
};