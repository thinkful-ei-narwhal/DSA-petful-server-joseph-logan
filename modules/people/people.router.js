const express = require('express');
const json = require('body-parser').json();

const People = require('./people.service')
const { response } = require('express')

const router = express.Router();

router.get('/', (req, res) => {
  // Return all the people currently in the queue.
  let people = People.get()
  if (!people) return res.status(404).json({ error: 'No people are in line.' });
  return res.json(people);
})

router.post('/', json, (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(404).json({ error: 'You must include a valid name' });
  People.enqueue(name);
  return res.status(201).json({ message: 'Successfully inserted in queue.' });
})

router.delete('/', json, (req, res) => {
  // Remove a person from the queue
  People.dequeue();
  return res.status(204).json({ message: 'Next in line!' })
})

module.exports = router;
