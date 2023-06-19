const request = require('supertest');
const server = require('../server');
const { connectDB, stopDB, clearDB } = require('../test-utils');
const Task = require('../models/task');
const Step = require('../models/step');

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
  const taskRes = await request(server)
    .post('/task')
    .send({ name: 'testTask' });

  const taskId = taskRes.body._id;

  const res = await request(server)
    .post(`/task/${taskId}/steps`)
    .send({ name: 'testStep' });

  expect(res.statusCode).toEqual(200);
  
  const step = res.body.steps[res.body.steps.length - 1];
  expect(step.name).toEqual('testStep');
});


describe('GET /step', () => {
  it('should get all steps and return 200 status code', async () => {
    const testStep = await new Step({ name: 'testStep' }).save();

    const res = await request(server)
      .get('/step');

    expect(res.statusCode).toEqual(200);
    expect(res.body[0].name).toEqual('testStep');
  });
});

describe('GET /step/:id', () => {
  it('should get a specific step and return 200 status code', async () => {
    const testStep = await new Step({ name: 'testStep' }).save();

    const res = await request(server)
      .get(`/step/${testStep._id}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toEqual('testStep');
  });
});

describe('PUT /step/:id', () => {
  it('should update a specific step and return 200 status code', async () => {
    const testStep = await new Step({ name: 'testStep' }).save();

    const res = await request(server)
      .put(`/step/${testStep._id}`)
      .send({ name: 'updatedStep' });

    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toEqual('updatedStep');
  });
});

describe('DELETE /step/:id', () => {
  it('should delete a specific step and return 200 status code', async () => {
    const testStep = await new Step({ name: 'testStep' }).save();

    let res = await request(server)
      .delete(`/step/${testStep._id}`);

    expect(res.statusCode).toEqual(200);

    res = await request(server)
      .get(`/step/${testStep._id}`);

    expect(res.statusCode).toEqual(404);
  });
});
