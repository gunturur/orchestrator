
const express = require('express');
const router = express.Router();

const stepDao = require('../daos/step');
const taskDao = require('../daos/task');

router.post('/', async (req, res) => {
  const step = await stepDao.createStep(req.body);
  res.json(step);
});

router.get('/:id', async (req, res) => {
  const step = await stepDao.getStep(req.params.id);
  res.json(step);
});

router.get('/', async (req, res) => {
  const steps = await stepDao.getSteps();
  res.json(steps);
});

router.put('/:id', async (req, res) => {
  const step = await stepDao.updateStep(req.params.id, req.body);
  res.json(step);
});

router.delete('/:id', async (req, res) => {
  await stepDao.deleteStep(req.params.id);
  res.json({ message: 'Step deleted' });
});

module.exports = router;
