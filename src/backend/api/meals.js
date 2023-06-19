

/** @format */

const express = require('express');
const router = express.Router();
const knex = require('../database');
const mealsRouter = express.Router();
const { query } = require('express');

//Returns all meals
// mealsRouter.get('/', async (req, res) => {
//   try {
//     const meals = await knex.select('*').from('meals');
//     res.json(meals);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: 'error occurred!' });
//   }
// });
//Adds a new meal to the database:
mealsRouter.post('/', async (req, res) => {
  const newMeal = req.body;
  try {
    const addMeal = await knex('meals').insert(newMeal);
    res.status(201).send(addMeal);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'error!' });
  }
});


//Returns the meal by id:
mealsRouter.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const mealId = await knex
      .select('*')
      .from('meals')
      .where({ id })
      .first();
    if (mealId.length === 0) {
      res.status(404).send('meal not found!');
    } else {
      res.json(mealId);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('Error !');
  }
});




// mealsRouter.get('/:id/review', async (req, res) => {
//   const id= parseInt(req.params.id);
//   try {
//     const review = await knex
//       .select('*')
//       .from('meals')
//       .leftJoin('review', `meals.id`, 'review.meal_id')
//       .where('review.meal_id', id);
//     res.json(review);
//   } catch (error) {
//     console.log(error);
//     res.status(500).send('Error!');
//   }
// });

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












// Updates the meal by id:
mealsRouter.put('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const updatedMeal = req.body;
  try {
    const updated = await knex('meals').where({ id: id }).update(updatedMeal);
    if (updated.length === 0) {
      res.status(404).send('meal not updated');
    } else {
      res.status(200).send('meal is updated');
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('Error!');
  }
});

//Deletes the meal by id
mealsRouter.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const deletedMeal = await knex('meals').where({ id: id }).del();
    if (deletedMeal.length === 0) {
      res.status(404).send('meal not deleted');
    } else {
      res.status(200).send('message: Deleted meal');
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('Error!');
  }
});

//---------------------------------------
//NOdeJs-week3 Homework
//-----------------------------------------
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
      query = query.where('price', '<=', parseInt(maxPrice));
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
      let sortedColumn;
      if (sortKey === 'when') {
        sortedColumn = 'when';
      } else if (sortKey === 'max_reservations') {
        sortedColumn = 'max_reservations';
      } else if (sortKey === 'price') {
        sortedColumn = 'price';
      }
      query = query.orderBy(sortedColumn, sortDir === 'desc' ? 'desc' : 'asc');
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


