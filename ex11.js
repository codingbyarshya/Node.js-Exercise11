const express = require('express');
const router = express.Router();
const Joi = require('joi');

// Dummy database
let planets = [
  {
    id: 1,
    name: 'Earth',
  },
  {
    id: 2,
    name: 'Mars',
  },
];

// Validation schema for planet data
const planetSchema = Joi.object({
  id: Joi.number().required(),
  name: Joi.string().required(),
});

// GET /api/planets
router.get('/api/planets', (req, res) => {
  res.json(planets);
});

// GET /api/planets/:id
router.get('/api/planets/:id', (req, res) => {
  const planetId = parseInt(req.params.id);

  const planet = planets.find((p) => p.id === planetId);
  if (!planet) {
    return res.status(404).json({ error: 'Planet not found' });
  }

  res.json(planet);
});

// POST /api/planets
router.post('/api/planets', (req, res) => {
  const newPlanet = req.body;

  const { error } = planetSchema.validate(newPlanet);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  planets.push(newPlanet);

  res.status(201).json({ msg: 'Planet created successfully' });
});

// PUT /api/planets/:id
router.put('/api/planets/:id', (req, res) => {
  const planetId = parseInt(req.params.id);
  const updatedPlanet = req.body;

  const { error } = planetSchema.validate(updatedPlanet);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const planetIndex = planets.findIndex((p) => p.id === planetId);
  if (planetIndex === -1) {
    return res.status(404).json({ error: 'Planet not found' });
  }

  planets[planetIndex] = updatedPlanet;

  res.json({ msg: 'Planet updated successfully' });
});

// DELETE /api/planets/:id
router.delete('/api/planets/:id', (req, res) => {
  const planetId = parseInt(req.params.id);

  const planetIndex = planets.findIndex((p) => p.id === planetId);
  if (planetIndex === -1) {
    return res.status(404).json({ error: 'Planet not found' });
  }

  planets.splice(planetIndex, 1);

  res.json({ msg: 'Planet deleted successfully' });
});

module.exports = router;
