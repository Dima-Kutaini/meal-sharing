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
  } catch (error) {
    throw error;
  }
});
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
    if (mealId.length === 0) {
      res.status(404).send('meal not found!');
    } else {
      res.json(mealId);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('Error occurred!');
  }
}); 

// Updates the meal by id:
mealsRouter.put('/:idmeals', async (req, res) => {
  const idmeals = parseInt(req.params.idmeals);
  const updatedMeal = req.body;
  try {
    const updated = await knex('meals').where({ idmeals: idmeals }).update(updatedMeal);
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
mealsRouter.delete('/:idmeals', async (req, res) => {
  const idmeals = parseInt(req.params.idmeals);
  try {
    const deletedMeal = await knex('meals').where({ idmeals: idmeals}).del();
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

module.exports = mealsRouter;
