const express = require('express');
const router = express.Router();

const workflowDao = require('../daos/workflow');
const taskDao = require('../daos/task');
const stepDao = require('../daos/step');

router.post('/', async (req, res) => {
  const workflow = await workflowDao.createWorkflow(req.body);
  res.json(workflow);
});

router.post('/:workflowId/tasks', async (req, res) => {
  const workflow = await workflowDao.addTask(req.params.workflowId, req.body);
  res.json(workflow);
});

router.get('/:id', async (req, res) => {
  const workflow = await workflowDao.getWorkflow(req.params.id);
  res.json(workflow);
});

router.get('/', async (req, res) => {
  const workflows = await workflowDao.getWorkflows();
  res.json(workflows);
});

router.put('/:id', async (req, res) => {
  const workflow = await workflowDao.updateWorkflow(req.params.id, req.body);
  res.json(workflow);
});

router.delete('/:id', async (req, res) => {
  await workflowDao.deleteWorkflow(req.params.id);
  res.json({ message: 'Workflow deleted' });
});

router.post('/workflow/:workflowId/tasks/:taskId/steps', async (req, res) => {
  const step = await stepDao.createStep(req.params.taskId, req.body);
  res.json(step);
});

router.delete('/workflow/:workflowId/tasks/:taskId/steps/:stepId', async (req, res) => {
  await stepDao.deleteStep(req.params.stepId);
  res.json({ message: 'Step deleted' });
});


module.exports = router;

