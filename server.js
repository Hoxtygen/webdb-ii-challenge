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

  function getCarById(id) {
    return db('cars').where({ id });
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

server.post('/cars', validateCarBody, async(req, res) => {
    try {
        const newCar = await createNewCar(req.body);
        return res.json(newCar)
    } catch (error) {
        return res.status(500).json({
            errorMessage: error,
        })
    }
});

server.get('/cars/:id', validateCarId, async(req, res, next) => {
    try {
        const car = await getCarById(req.car.id);
        //console.log(car)
        if (!car) {
            return res.status(404).json({
                errorMessage: 'The car with the specified ID does not exist'
            })
        }
        return res.status(200).json(car[0])
    } catch (error) {
      return res.status(500).json({
          errorMessage: error,
      })
    }
})

async function validateCarId(req, res, next) {
    const id = req.params.id;
    console.log(id)
    if (Number.isNaN(id) || id % 1 !== 0 || id < 0) {
        return res.status(400).json({
            errorMessage: "Invalid car id supplied"
        });
    }
    try {
        const [car] = await getCarById(id);
        console.log(car)
        if (!car) {
            return res.status(404).json({
                errorMessage: "The car with the specified ID does not exist."
            })
        }
        req.car = car;
    } catch (error) {
        return res.status(500).json({
            error
        })
    }
    return next();
};

function validateCarBody(req, res, next) {
    if (!Object.keys(req.body).length) {
        return res.status(400).send({
            message: 'missing necessary information',
          });
    }
    if (!req.body.vin || !req.body.make|| !req.body.model || !req.body.mileage) {
        return res.status(400).json({
            message: 'Missing required  req.body., make, model and  mileage field'
        });
    }
    return next();
}

module.exports = server;