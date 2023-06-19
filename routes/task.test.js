const request = require('supertest');
const server = require('../server');
const { connectDB, stopDB, clearDB } = require('../test-utils');

beforeAll(async () => {
  await connectDB();
});

afterAll(async () => {
  await stopDB();
});

beforeEach(async () => {
  await clearDB();
});

it('should create a new task and return 200 status code', async () => {
  const res = await request(server)
    .post('/task')
    .send({ name: 'testTask' });

  expect(res.statusCode).toEqual(200);
  expect(res.body.name).toEqual('testTask');
});

it('should add a step to a task and return 200 status code', async () => {
  const taskRes = await request(server)
    .post('/task')
    .send({ name: 'testTask' });

  const taskId = taskRes.body._id;

  const res = await request(server)
    .post(`/task/${taskId}/steps`)
    .send({ name: 'testStep' });

  expect(res.statusCode).toEqual(200);
  expect(res.body.steps[0]).toBeDefined();
});

describe('GET /task', () => {
  it('should get all tasks and return 200 status code', async () => {
    await request(server)
      .post('/task')
      .send({ name: 'testTask' });

    const res = await request(server)
      .get('/task');

    expect(res.statusCode).toEqual(200);
    expect(res.body[0].name).toEqual('testTask');
  });
});

describe('GET /task/:id', () => {
  it('should get a specific task and return 200 status code', async () => {
    const taskRes = await request(server)
      .post('/task')
      .send({ name: 'testTask' });

    const taskId = taskRes.body._id;

    const res = await request(server)
      .get(`/task/${taskId}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toEqual('testTask');
  });
});

describe('PUT /task/:id', () => {
  it('should update a specific task and return 200 status code', async () => {
    const taskRes = await request(server)
      .post('/task')
      .send({ name: 'testTask' });

    const taskId = taskRes.body._id;

    const res = await request(server)
      .put(`/task/${taskId}`)
      .send({ name: 'updatedTask' });

    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toEqual('updatedTask');
  });
});

describe('DELETE /task/:id', () => {
  it('should delete a specific task and return 200 status code', async () => {
    const taskRes = await request(server)
      .post('/task')
      .send({ name: 'testTask' });

    const taskId = taskRes.body._id;

    let res = await request(server)
      .delete(`/task/${taskId}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual('Task deleted');

    res = await request(server)
      .get(`/task/${taskId}`);

    expect(res.statusCode).toEqual(404);
  });
});
