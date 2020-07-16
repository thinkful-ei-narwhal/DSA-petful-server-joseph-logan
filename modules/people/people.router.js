const express = require('express');
const json = require('body-parser').json();
const People = require('./people.service');

const router = express.Router();

router.get('/', (req, res) => {
  // Return all the people currently in the queue.
  let people = People.get();
  if (!people) return res.status(404).json({ error: 'No people are in line.' });
  return res.json(people);
});
router.post('/', express.json(), (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'You must include a valid name' });
  People.enqueue(name);
  return res.status(201).json({ name: name });
});
router.delete('/', json, (req, res) => {
  // Remove a person from the queue
  People.dequeue();
  const remaining = People.get();

  res.json({ remaining });

});

module.exports = router;
