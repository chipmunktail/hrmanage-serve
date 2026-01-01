'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class card_reissue extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  card_reissue.init({
    reissueId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    reissueDate: DataTypes.DATE,
    reissueType: DataTypes.INTEGER,
    actualTime: DataTypes.DATE,
    reason: DataTypes.STRING,
    auditStatus: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'card_reissue',
  });
  return card_reissue;
};