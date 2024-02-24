<<<<<<< HEAD


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
=======
/** @format */

const express = require('express');
const router = express.Router();
const mealsRouter = express.Router();
const knex = require('../database');

router.get('/', async (request, response) => {
  try {
    // knex syntax for selecting things. Look up the documentation for knex for further info
    const titles = await knex('meals').select('title');
    response.json(titles);
>>>>>>> 08232920165e5b8d2c1696caaeab4920d86a5197
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'error!' });
  }
});
<<<<<<< HEAD


//Returns the meal by id:
mealsRouter.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const mealId = await knex
      .select('*')
      .from('meals')
      .where({ id })
      .first();
=======
module.exports = router;

//Returns all meals
mealsRouter.get('/', async (req, res) => {
  try {
    const meals = await knex.select('*').from('meals');
    res.json(meals);
  } catch (error) {
    console.log(error);
    res.status(500).json({error:'error occurred!'});
  }
});
//Adds a new meal to the database:
mealsRouter.post('/', async (req, res) => {
  const newMeal = req.body;
  try {
    const addMeal = await knex('meals').insert(newMeal);
    res.status(201).json(addMeal);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message:'error occurred!'});
  }
});

//Returns the meal by id:
mealsRouter.get('/:idmeals', async (req, res) => {
  const idmeals = parseInt(req.params.idmeals);
  try {
    const mealId = await knex.select().from('meals').where({ idmeals: idmeals }).first();
>>>>>>> 08232920165e5b8d2c1696caaeab4920d86a5197
    if (mealId.length === 0) {
      res.status(404).send('meal not found!');
    } else {
      res.json(mealId);
    }
  } catch (error) {
    console.log(error);
<<<<<<< HEAD
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



// Updates the meal by id:
mealsRouter.put('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const updatedMeal = req.body;
  try {
    const updated = await knex('meals').where({ id: id }).update(updatedMeal);
=======
    res.status(500).send('Error occurred!');
  }
}); 

// Updates the meal by id:
mealsRouter.put('/:idmeals', async (req, res) => {
  const idmeals = parseInt(req.params.idmeals);
  const updatedMeal = req.body;
  try {
    const updated = await knex('meals').where({ idmeals: idmeals }).update(updatedMeal);
>>>>>>> 08232920165e5b8d2c1696caaeab4920d86a5197
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
<<<<<<< HEAD
mealsRouter.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const deletedMeal = await knex('meals').where({ id: id }).del();
=======
mealsRouter.delete('/:idmeals', async (req, res) => {
  const idmeals = parseInt(req.params.idmeals);
  try {
    const deletedMeal = await knex('meals').where({ idmeals: idmeals}).del();
>>>>>>> 08232920165e5b8d2c1696caaeab4920d86a5197
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

<<<<<<< HEAD
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


=======
module.exports = mealsRouter;
>>>>>>> 08232920165e5b8d2c1696caaeab4920d86a5197
