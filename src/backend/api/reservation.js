/** @format */

const express = require('express');
const reservationRouter = express.Router();
const knex = require('../database');



// return all reservations: 
reservationRouter.get('/', async (req, res) => {
  try {
    const allReservations = await knex.select('*').from('Reservation');
    res.json(allReservations);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error occurred!');
  }
});

//Adds a new reservation to the database
reservationRouter.post('/', async (req, res) => {
  const newReservation = req.body;
  try {
    const addedReservation = await knex('Reservation').insert(newReservation);
    res.status(201).json(addedReservation);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error occurred!');
  }
});
//Returns a reservation by id
reservationRouter.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const reservation = await knex
      .select()
      .from('Reservation')
      .where({ id})
      .first();
    if (reservation.length === 0) {
      res.status(404).send('Reservation not found!');
    } else {
      res.json(reservation);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('Error occurred!');
  }
});

// Post anew reservation:
reservationRouter.post('/', async (req, res) => {
  const newReservation = req.body;
  console.log(newReservation);
  try {
    const reservation = await knex('Reservation').insert(newReservation);

    res.status(201).send(newReservation);
  } catch (error) {
    res.status(500).json({
      error: 'An error occurred ',
    });
  }
});
// Updates the reservation by id
reservationRouter.put('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const updatedReservation = req.body;
  try {
    const updated = await knex('Reservation')
      .where({ id: id })
      .update(updatedReservation);
    if (updated.length === 0) {
      res.status(404).send('Reservation not updated');
    } else {
      res.status(200).send('Reservation is updated');
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('Error!');
  }
});

//Deletes the  reservation by id
reservationRouter.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const deletedReservation = await knex('Reservation')
      .where({ id })
      .del();
    if (deletedReservation.length === 0) {
      res.status(404).send('Reservation not deleted');
    } else {
      res.status(200).send('Deleted Reservation');
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('Error occurred!');
  }
});
module.exports = reservationRouter;
