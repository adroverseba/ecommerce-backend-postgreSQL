'use strict';

const { ORDER_TABLE } = require('../models/order.model');
const { CUSTOMER_TABLE } = require('../models/customer.model');
const { Sequelize, DataTypes } = require('sequelize');

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(ORDER_TABLE, {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      customerId: {
        field: 'customer_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: CUSTOMER_TABLE,
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      createdAt: {
        allowNull: false,
        field: 'created_at',
        type: DataTypes.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable(ORDER_TABLE);
  },
};
