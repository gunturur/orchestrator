const express = require('express');
const router = express.Router();

const taskDao = require('../daos/task');

router.post('/', async (req, res) => {
  const task = await taskDao.createTask(req.body);
  res.json(task);
});

router.post('/:taskId/steps', async (req, res) => {
  const task = await taskDao.addStep(req.params.taskId, req.body);
  res.json(task);
});

router.get('/:id', async (req, res) => {
  console.log(`Fetching task with ID: ${req.params.id}`);
  const task = await taskDao.getTask(req.params.id);
  console.log(`Fetched task: ${JSON.stringify(task)}`);
  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }
  res.json(task);
});


router.get('/', async (req, res) => {
  const tasks = await taskDao.getTasks();
  res.json(tasks);
});

router.put('/:id', async (req, res) => {
  const task = await taskDao.updateTask(req.params.id, req.body);
  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }
  res.json(task);
});

router.delete('/:id', async (req, res) => {
  await taskDao.deleteTask(req.params.id);
  res.json({ message: 'Task deleted' });
});

module.exports = router;
