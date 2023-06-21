const request = require('supertest');
const server = require('../server');
const { connectDB, stopDB, clearDB } = require('../test-utils');
const Task = require('../models/task');
const Step = require('../models/step');
const stepDao = require('../daos/step');

let testTask;

beforeAll(async () => {
  await connectDB();
});

afterAll(async () => {
  await stopDB();
});

beforeEach(async () => {
  await clearDB();
});

it('should create a new step for a task and return 200 status code', async () => {
  const taskName = `Task_${Date.now()}`;
  const task = await new Task({ name: taskName }).save();
  testTask = task;

  const res = await request(server)
    .post(`/step/${task._id}`)
    .send({ name: 'testStepData' });

  expect(res.statusCode).toEqual(200);
  expect(res.body.name).toEqual('testStepData');
});

it('should get a specific step and return 200 status code', async () => {
  const taskName = `Task_${Date.now()}`;
  const task = await new Task({ name: taskName }).save();
  testTask = task;

  const step = await new Step({ name: 'testStepData', taskId: task._id }).save();

  const res = await request(server)
    .get(`/step/${step._id}`);

  expect(res.statusCode).toEqual(200);
  expect(res.body.name).toEqual('testStepData');
});

it('should update a specific step and return 200 status code', async () => {
  const taskName = `Task_${Date.now()}`;
  const task = await new Task({ name: taskName }).save();
  testTask = task;

  const step = await new Step({ name: 'testStepData', taskId: task._id }).save();

  const updatedData = { name: 'updatedStep' };

  const res = await request(server)
    .put(`/step/${step._id}`)
    .send(updatedData);

  expect(res.statusCode).toEqual(200);
  expect(res.body.name).toEqual('updatedStep');
});

it('should delete a specific step and return 200 status code', async () => {
  const taskName = `Task_${Date.now()}`;
  const task = await new Task({ name: taskName }).save();
  testTask = task;

  const step = await new Step({ name: 'testStepData', taskId: task._id }).save();

  const res = await request(server)
    .delete(`/step/${step._id}`);

  expect(res.statusCode).toEqual(200);

  const deletedStep = await stepDao.getStep(step._id);
  expect(deletedStep).toBeNull();
});
