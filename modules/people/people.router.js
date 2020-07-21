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
  let temp = People.get();
  if (temp[0] === 'Randy Lahey' || temp[0] === 'Trevor Cory' || temp[0] === 'Jim Lahey') {
    People.dequeueLoop();
  }
  else {
    People.dequeue();
  }

  res.json({ remaining });
});

module.exports = router;
