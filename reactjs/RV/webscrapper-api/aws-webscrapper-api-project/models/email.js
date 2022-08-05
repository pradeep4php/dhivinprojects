'use strict';
const {
  Model
} = require('sequelize');
const CampGround = require ('./campground')
module.exports = (sequelize, DataTypes) => {
  class Email extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Email.belongsTo(models.CampGround,{
        foreignKey:'id',
        target_Key:'campgroundid'
      })
    }
  }
  Email.init({
    email: {
      type: DataTypes.TEXT,
      primaryKey: true 
    },
    campgroundid: {
      type: DataTypes.INTEGER,
      references : {
        model:'CampGround',
        key:'id'
       }
    },
    donotemail: DataTypes.INTEGER,
    isprimary: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Email',
    freezeTableName: true

  });
  return Email;
};