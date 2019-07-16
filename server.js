const express = require('express');
const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: false }));


function getAllCars() {
    return db('cars');
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

module.exports = server;