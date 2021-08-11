const compression = require('compression');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(compression());
const db = require('./queries');
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/', (request, response) => {
  response.json({ info: 'Pet Shelter API' })
});

app.get('/init', db.createTable);
app.get('/pets', db.getPets);
app.get('/pets/:id', db.getPetById);
app.post('/pets', db.createPet);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
