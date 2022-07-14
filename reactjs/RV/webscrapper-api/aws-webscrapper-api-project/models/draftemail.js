'use strict';
const {
  Model
} = require('sequelize');
const service_request = require('./service_request');
module.exports = (sequelize, DataTypes) => {
  class DraftEmail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //DraftEmail.belongsTo(service_request)
    }
  }
  DraftEmail.init({
    //servicerequestid: DataTypes.INTEGER,
    emailaddress: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'DraftEmail',
  });
  return DraftEmail;
};