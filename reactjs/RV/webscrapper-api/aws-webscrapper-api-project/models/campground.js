'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CampGround extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CampGround.hasMany(models.CampGround,{
        foreignKey:'campgroundid'
      })
    }
  }
  CampGround.init({
    name: DataTypes.TEXT,
    street1: DataTypes.TEXT,
    street2: DataTypes.TEXT,
    city: DataTypes.TEXT,
    stateprovince: DataTypes.TEXT,
    country: DataTypes.TEXT,
    zipcode: DataTypes.TEXT,
    phone: DataTypes.TEXT,
    latitude: DataTypes.DECIMAL,
    longitude: DataTypes.DECIMAL,
    website: DataTypes.TEXT,
    stars: DataTypes.DECIMAL,
    description: DataTypes.TEXT,
    minage: DataTypes.INTEGER,
    petsallowed: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'CampGround',
  });
  return CampGround;
};