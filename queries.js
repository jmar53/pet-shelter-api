require('dotenv').config()
const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
})

const getPets = (request, response) => {
  pool.query('SELECT * FROM pets ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getPetById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM pets WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createPet = (request, response) => {
  const { name, pet_type, breed, loc, latitude, longitude } = request.body

  pool.query('INSERT INTO pets (name, pet_type, breed, location, latitude, longitude) VALUES ($1, $2, $3, $4, $5, $6)', [name, pet_type, breed, loc, latitude, longitude], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Pet Added`)
  })
}

module.exports = {
  getPets,
  getPetById,
  createPet,
}
