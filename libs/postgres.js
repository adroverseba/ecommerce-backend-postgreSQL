const { Client } = require('pg');

async function getConnection() {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'seba',
    password: 'admin123',
    database: 'my_store',
  });

  await client.connect(); // esto devuelve una promesa por eso se tengo que usar async/await
  return client; //tengo que retornar el cliente para que el mismo pueda ser usado y realizar consultas
}

module.exports = getConnection;
