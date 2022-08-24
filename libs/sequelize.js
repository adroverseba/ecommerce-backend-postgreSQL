const { Sequelize } = require('sequelize');

const { config } = require('../config/config');
const setupModels = require('../db/models');

// const USER = encodeURIComponent(config.dbUser);
// const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://seba:admin123@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const sequelize = new Sequelize(URI, {
  dialect: 'postgres',
  logging: console.log,
});

setupModels(sequelize);

//creamos la tabla
// sequelize.sync(); //* en el momento en el que usamos migraciones dejamos de usar sequelize por recomendacion de la misma documentacion

module.exports = sequelize;
