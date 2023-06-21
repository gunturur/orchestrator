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

router.get('/', async (req, res) => {
  const workflows = await workflowDao.getWorkflows();
  res.json(workflows);
});

router.get('/:workflowId/tasks/:taskId', async (req, res) => {
  const task = await taskDao.getTask(req.params.taskId);
  res.json(task);
});


router.get('/:workflowId/tasks/:taskId/steps', async (req, res) => {
  const task = await taskDao.getTask(req.params.taskId);
  res.json(task.steps);
});

router.get('/:workflowId/tasks', async (req, res) => {
  const workflow = await workflowDao.getWorkflow(req.params.workflowId);
  res.json(workflow.tasks);
});

router.get('/:workflowId', async (req, res, next) => {
  try {
    const workflow = await workflowDao.getWorkflow(req.params.workflowId);
    res.json(workflow);
  } catch (err) {
    if (err.status === 404) {
      res.status(404).json({ message: err.message });
    } else {
      next(err);
    }
  }
});



router.put('/:workflowId', async (req, res) => {
  const workflow = await workflowDao.updateWorkflow(req.params.workflowId, req.body);
  res.json(workflow);
});

router.delete('/:workflowId', async (req, res) => {
  await workflowDao.deleteWorkflow(req.params.workflowId);
  res.json({ message: 'Workflow deleted' });
});

router.post('/:workflowId/tasks/:taskId/steps', async (req, res) => {
  const step = await stepDao.createStep(req.params.taskId, req.body);
  res.json(step);
});

router.delete('/:workflowId/tasks/:taskId/steps/:stepId', async (req, res) => {
  await stepDao.deleteStep(req.params.stepId);
  res.json({ message: 'Step deleted' });
});



module.exports = router;

