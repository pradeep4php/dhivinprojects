'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class service_request extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      service_request.hasMany(models.DraftEmail,{
        foreignKey:'servicerequestid'
      })
    }
  }
  service_request.init({
    url: DataTypes.TEXT,
    status: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'service_request',
  });
  return service_request;
};