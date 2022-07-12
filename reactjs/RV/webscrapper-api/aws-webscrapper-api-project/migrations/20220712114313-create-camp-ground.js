'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CampGrounds', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.TEXT
      },
      street1: {
        type: Sequelize.TEXT
      },
      street2: {
        type: Sequelize.TEXT
      },
      city: {
        type: Sequelize.TEXT
      },
      stateprovince: {
        type: Sequelize.TEXT
      },
      country: {
        type: Sequelize.TEXT
      },
      zipcode: {
        type: Sequelize.TEXT
      },
      phone: {
        type: Sequelize.TEXT
      },
      latitude: {
        type: Sequelize.DECIMAL
      },
      longitude: {
        type: Sequelize.DECIMAL
      },
      website: {
        type: Sequelize.TEXT
      },
      stars: {
        type: Sequelize.DECIMAL
      },
      description: {
        type: Sequelize.TEXT
      },
      minage: {
        type: Sequelize.INTEGER
      },
      petsallowed: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('CampGrounds');
  }
};