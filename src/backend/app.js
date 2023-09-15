/** @format */

const express = require('express');
const app = express();
const router = express.Router();
const reservationRouter=express.Router();
const path = require('path');
const knex = require('./database');
const mealsRouter = require('./api/meals');
const  reservationsRouter=require('./api/reservation'); 
const buildPath = path.join(__dirname, '../../dist');
const port = process.env.PORT || 3000;
const cors = require('cors');
const reviewRouter = require('./api/review');
const reservationRouter = require('./api/reservation');

// For week4 no need to look into this!
// Serve the built client html
app.use(express.static(buildPath));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));
// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.use(cors());
router.use('/meals', mealsRouter);
router.use('/review', reviewRouter);
router.use('/reservation', reservationRouter);

router.get('/', (req, res) => {
  res.send('Hi friend');
});
//Respond with all meals in the future
//(relative to the when datetime):
router.get('/future-meals', async (req, res) => {
  try {
    //const NOW = new Date();
    const futureMeals = await knex.raw(
      `
  SELECT * FROM meals
   WHERE date > NOW()`
    );
    res.json(futureMeals);
  } catch (error) {
    throw error;
  }
});
//Respond with all meals in the past
//(relative to the when datetime):
router.get('/past-meals', async (req, res) => {
  try {
    //const now = new Date();
    const pastMeals = await knex.raw(
      `
  SELECT * FROM meals
   WHERE date < NOW()`
    );

    res.json(pastMeals);
  } catch (error) {
    throw error;
  }
});
//Respond with all meals sorted by ID:
router.get('/all-meals', async (req, res) => {
  try {
    const allMeals = await knex.raw(
      `
  SELECT * FROM meals
  ORDER BY idmeals
   `
    );
    res.json(allMeals);
  } catch (error) {
    throw error;
  }
});
//Respond with the first meal (meaning with the minimum id):
router.get('/first-meals', async (req, res) => {
  try {
    const firstMeals = await knex.raw(
      `
  SELECT * FROM meals
  WHERE idmeals=( SELECT MIN(idmeals) FROM  meals)
   `
    );
    if (firstMeals.length === 0) {
      res.status(404).json({ error: 'There are no meals' });
    }
    res.json(firstMeals);
  } catch (error) {
    throw error;
  }
});
router.get('/last-meals', async (req, res) => {
  try {
    const lastMeals = await knex.raw(
      `
  SELECT * FROM meals
  WHERE idmeals=( SELECT MAX(idmeals) FROM  meals)
   `
    );
    if (lastMeals.length === 0) {
      res.status(404).json({ error: 'There are no meals' });
    }
    res.json(lastMeals);
  } catch (error) {
    throw error;
  }
});

if (process.env.API_PATH) {
  app.use(process.env.API_PATH, router);
} else {
  throw 'API_PATH is not set. Remember to set it in your .env file';
}

// for the frontend. Will first be covered in the react class
app.use('*', (req, res) => {
  res.sendFile(path.join(`${buildPath}/index.html`));
});

module.exports = app;
