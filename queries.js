require('dotenv').config();
const Pool = require('pg').Pool;
var pool;
if (!process.env.DATABASE_URL) {
  pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  })
} else {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL
  });
}

const createTable = (request, response) => {
  pool.query('CREATE TABLE pets(id SERIAL PRIMARY KEY, name VARCHAR(40), pet_type VARCHAR(40), breed VARCHAR(40), location VARCHAR(40), latitude VARCHAR(40), longitude VARCHAR(40))', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(201).send('Table pets created');
  })
}

const getPets = (request, response) => {
  pool.query('SELECT * FROM pets ORDER BY name ASC', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  })
}

const getPetById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM pets WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  })
}

const createPet = (request, response) => {
  const { name, pet_type, breed, location, latitude, longitude } = request.body;

  pool.query('INSERT INTO pets (name, pet_type, breed, location, latitude, longitude) VALUES ($1, $2, $3, $4, $5, $6) RETURNING ID', [name, pet_type, breed, location, latitude, longitude], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(201).send(`${results.rows[0].id}`);
  })
}

module.exports = {
  createTable,
  getPets,
  getPetById,
  createPet,
}
