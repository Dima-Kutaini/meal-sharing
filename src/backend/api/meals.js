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
mealsRouter.get('/:id/Reservation', async (req, res) => {
  try {
    const mealId = req.params.id;

    const mealReservation = await knex('Reservation')
      .select(
        'Reservation.id',
        'Reservation.title',
        'Reservation.number_of_guests',
        'Reservation.created_date',
        'Reservation.contact_phonenumber',
        'Reservation.contact_name',
        'Reservation.meal_id'
      )
      .join('meals', 'meals.id', 'Reservation.meal_id')
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



mealsRouter.get('/', async (req, res) => {
  try {
    // Retrieve query parameters
    const {
      maxPrice,
      availableReservations,
      title,
      dateAfter,
      dateBefore,
      limit,
      sortKey,
      sortDir,
    } = req.query;

    // Prepare Knex query based on the query parameters
    let query = knex.select('*').from('meals');

    // Returns all meals that are cheaper than maxPrice.

    if (maxPrice) {
      query = query.where('price', '<=', +maxPrice);
    }

    // Returns all meals that still have available spots left, if true. If false, return meals that have no available spots left.1
    if (availableReservations === 'true') {
      query = query.where('available', '>', 0);
    } else if (availableReservations === 'false') {
      query = query.where('available', '=', 0);
    }

    // Returns all meals that partially match the given title.
    // Rød grød will match the meal with the title Rød grød med fløde
    if (title) {
      query = query.where('title', 'like', `%${title}%`);
    }

    // Returns all meals where the date for when is after the given date.
    if (dateAfter) {
      query = query.where('when', '>', new Date(dateAfter));
    }

    // Returns all meals where the date for when is before the given date.
    if (dateBefore) {
      query = query.where('when', '<', new Date(dateBefore));
    }

    //Returns all meals sorted by the given key.
    // Allows when, max_reservations and price as keys.
    //Default sorting order is asc(ending).
    if (sortKey) {
      let sortedData;
      if (sortKey === 'when') {
        sortedData = 'when';
      } else if (sortKey === 'max_reservations') {
        sortedData = 'available';
      } else if (sortKey === 'price') {
        sortedData = 'price';
      } else if (sortKey === 'title') {
        sortedData = 'title';
      }
      query = query.orderBy(sortedData, sortDir === 'desc' ? 'desc' : 'asc');
    }

    // Returns the given number of meals.
    if (limit) {
      query = query.limit(parseInt(limit));
    }

    // Execute the query and return the result
    const meals = await query;
    res.json(meals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error' });
  }
});

module.exports = mealsRouter;
