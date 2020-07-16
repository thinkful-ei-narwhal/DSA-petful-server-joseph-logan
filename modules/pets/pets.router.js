const express = require('express');
const json = require('body-parser').json();

const Pets = require('./pets.service');
const People = require('../people/people.service');

const router = express.Router();

router.get('/', (req, res, next) => {
  if (!Pets.getAll()) {
    return res.status(404).json({ error: 'No Pets for adoption' });
  }
  res.status(200).json(Pets.getAll())
});

router.get('/:type', (req, res, next) => {
  // Return all pets currently up for adoption.
  const { type } = req.params;
  if (!Pets.get(type)) { return res.status(404).json({ error: `No '${type}' for adoption` }); }
  return res.status(200).json(Pets.get(type));
});

router.delete('/:type', (req, res, next) => {
  // Remove a pet from adoption.
  // pass type of pet through to the dequeue method so we know which queue to remove from
  const { type } = req.params;
  if (!Pets.get(type)) { return res.status(404).json({ error: `No '${type}' for adoption` }); }
  Pets.dequeue(type);
  res.status(204).end();
});

module.exports = router;
