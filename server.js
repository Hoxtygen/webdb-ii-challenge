const express = require('express');
const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: false }));


function getAllCars() {
    return db('cars');
  }

  function createNewCar({ vin, make, model,mileage,transmissionType, status }) {
    return db('cars').insert({ vin, make, model,mileage,transmissionType, status });
  }






  server.get('/', (req, res) => {
    return res.status(200).json({
        message: 'Welcome to Lambda Car dealership company'
    })
})

server.get('/cars', async(req, res) => {
  const cars = await getAllCars();
  return res.json(cars);
});

server.post('/cars', async(req, res) => {
    try {
        const newCar = await createNewCar(req.body);
        return res.json(newCar)
    } catch (error) {
        return res.status(500).json({
            errorMessage: error,
        })
    }
})

module.exports = server;