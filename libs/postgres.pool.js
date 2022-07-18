const { Pool } = require('pg');
const { config } = require('../config/config');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
// const connectionString = `postgres://seba:admin123@localhost:5432/my_store`;

const pool = new Pool({ connectionString: URI });

//* ya no es necesario mandarle lo siguiente, con mandarle un connectionString hara que pool lo reconozca
// const pool = new Pool({
//   host: 'localhost',
//   port: 5432,
//   user: 'seba',
//   password: 'admin123',
//   database: 'my_store',
// });

//con los pool no tenemos que conectarnos, en este caso el primer cliente en conectarse sera el que inicie la conexion para todos los demas
//las configuraciones pasadas en el cliente son las mismas que en el pool

module.exports = pool;
