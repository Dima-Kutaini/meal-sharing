/** @format */

const express = require('express');
const mealsRouter = express.Router();
const knex = require('../database');

// Returns all meals
mealsRouter.get('/', async (req, res) => {
  try {
    const meals = await knex.select('*').from('meals');
    res.json(meals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred!' });
  }
});

// Adds a new meal to the database
mealsRouter.post('/', async (req, res) => {
  const newMeal = req.body;
  try {
    const addMeal = await knex('meals').insert(newMeal);
    res.status(201).json(addMeal);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred!' });
  }
});

// Returns the meal by id
mealsRouter.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const mealId = await knex.select('*').from('meals').where({ id }).first();
    res.json(mealId);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred!' });
  }
});

// Returns reviews for a specific meal
mealsRouter.get('/:id/review', async (req, res) => {
  try {
    const mealId = req.params.id;

    const reviews = await knex('review')
      .select(
        'review.id',
        'review.title',
        'review.description',
        'review.stars',
        'review.created_date',
        'review.meal_id'
      )
      .join('meals', 'meals.id', 'review.meal_id')
      .where('meals.id', mealId);

    res.json(reviews);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: 'An error occurred while retrieving the reviews.' });
  }
});

// Returns reservations for a specific meal
mealsRouter.get('/:id/reservation', async (req, res) => {
  try {
    const mealId = req.params.id;

    const mealReservation = await knex('reservation')
      .select(
        'reservation.id',
        'reservation.title',
        'reservation.number_of_guests',
        'reservation.created_date',
        'reservation.contact_phonenumber',
        'reservation.contact_name',
        'reservation.meal_id'
      )
      .join('meals', 'meals.id', 'reservation.meal_id')
      .where('meals.id', mealId);

    res.json(mealReservation);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: 'An error occurred while retrieving the reservation.' });
  }
});

// Updates the meal by id
mealsRouter.put('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const updatedMeal = req.body;
  try {
    await knex('meals').where({ id: id }).update(updatedMeal);
    res.status(200).send('Meal updated successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred!');
  }
});

// Deletes the meal by id
mealsRouter.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await knex('meals').where({ id: id }).del();
    res.status(200).send('Meal deleted successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred!');
  }
});

// Export the mealsRouter
module.exports = mealsRouter;
