'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const { USER_TABLE } = require('../models/user.model');

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(USER_TABLE, {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'create_at',
        defaultValue: Sequelize.fn('NOW'),
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable(USER_TABLE);
  },
};
