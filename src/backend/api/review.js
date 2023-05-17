/** @format */

const express = require('express');
const router = express.Router();
const knex = require('../database');
const reviewRouter = express.Router();

// return all reviews:
reviewRouter.get('/', async (req, res) => {
  try {
    const allReviews = await knex('review').select('*');
    res.json(allReviews);
  } catch (error) {
    res.status(500).json({ error: 'Unable to get review ' });
  }
});

//Return all reviews for a specific meal
reviewRouter.get('/:meal_id/review', async (req, res) => {
  const id = parseInt(req.params.meal_id);
  try {
    const allReviews = await knex
      .select()
      .from('review')
      .join('meals', 'meals.id', '=', 'review.meal_id')
      .where('meals.id', id);

    if (allReviews.length === 0) {
      res.status(404).send('Reviews not found for the specified meal!');
    } else {
      res.json(allReviews);
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Failed to get reviews for the specified meal!' });
  }
});

// POST a new review
// reviewRouter.post('/', async (req, res) => {
//   const newReview = req.body;
//   console.log(newReview);
//   try {
//     const review = await knex('review').insert(newReview);

//     res.status(201).send(newReview);
//   } catch (error) {
//     res.status(500).json({
//       error: 'An error occurred ',
//     });
//   }
// });

reviewRouter.post('/:id', async (req, res) => {
  const { id, title, description, stars, created_date, meal_id } = req.body;
  try {
    const addNewReview = await knex('review').insert({
      id: id,
      title: title,
      description: description,
      stars: stars,
      created_date: created_date,
      meal_id: meal_id,
    });

    res.status(201).send(addNewReview);
  } catch (error) {
    res
      .status(500)
      .json({ error: 'An error is  occurred: unable to add a new review!' });
  }
});
 // i tried and inserted this review by postman and it worked :)
reviewRouter.post('/:id', async (req, res) => {
  const { id, title, description, stars, created_date, meal_id } = req.body;
  try {
    const addNewReview = await knex('review').insert({
      id: 5,
  title: "Tasty Food",
  description: "One of the most delicious dishes I've ever tasted!",
  stars: 5,
  created_date: "2023-05-20 12:17:08",
  meal_id: 8
    });

    res.status(201).send(addNewReview);
  } catch (error) {
    res
      .status(500)
      .json({ error: 'An error occurred: unable to add a new review!' });
  }
});
// GET a review by ID
reviewRouter.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const reviewById = await knex
      .select()
      .from('review')
      .where({ id: id })
      .first();
    if (reviewById.length === 0) {
      res.status(404).send('Review is not found!');
    } else {
      res.json(reviewById);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('Error occurred!');
  }
});

// PUT (update) a review by ID// by this i updated the meal_id  from 8 to 3 for the review with id 6
reviewRouter.put('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const updatedReview = req.body;
  try {
    const updated = await knex('review')
      .where({ id: id })
      .update(updatedReview);
    if (updated.length === 0) {
      res.status(404).send('Review not updated');
    } else {
      res.status(200).send('Review is updated');
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('Error!');
  }
});


// DELETE a review by ID
reviewRouter.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const deletedReview = await knex('review')
      .where({ id: id })
      .del();
    if (deletedReview.length === 0) {
      res.status(404).send('Review not deleted');
    } else {
      res.status(200).send('Review is deleted successfully' );
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('An error is occurred!');
  }
});

module.exports = reviewRouter;
