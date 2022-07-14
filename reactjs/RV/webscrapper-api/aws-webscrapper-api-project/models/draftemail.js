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
      DraftEmail.belongsTo(models.service_request,{
        foreignKey:'id',
        target_Key:'servicerequestid'
      })
    }
  }
  DraftEmail.init({
    servicerequestid: {
       type: DataTypes.INTEGER,
       references : {
        model:'service_request',
        key:'id'
       }
    },
    emailaddress: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'DraftEmail',
  });
  return DraftEmail;
};