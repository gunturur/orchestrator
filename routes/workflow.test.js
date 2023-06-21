const { connectDB, stopDB, clearDB, workflow } = require('../test-utils');
const Task = require('../models/task');
const Step = require('../models/step');


const request = require("supertest");
const server = require("../server");

beforeAll(async () => {
  await connectDB();
});

afterAll(async () => {
  await stopDB();
});

beforeEach(async () => {
  await clearDB();
});

describe('POST /workflow', () => {
  it('should create a new workflow and return 200 status code', async () => {
    const res = await request(server)
      .post('/workflow')
      .send({ name: 'testWorkflow' });

    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toEqual('testWorkflow');
  });
});

describe('GET /workflow', () => {
  it('should fetch all workflows and return 200 status code', async () => {
    const res = await request(server)
      .get('/workflow');

    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });
});

describe('POST /workflow then GET /workflow/:workflowId', () => {
  it('should create a new workflow, fetch it, and return 200 status code', async () => {
    let res = await request(server)
      .post('/workflow')
      .send({ name: 'testWorkflow' });
    const workflowId = res.body._id;

    res = await request(server)
      .get(`/workflow/${workflowId}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toEqual('testWorkflow');
  });
});

describe('POST /workflow then DELETE /workflow/:workflowId', () => {
  it('should create a new workflow, delete it, and return 200 status code', async () => {
    let res = await request(server)
      .post('/workflow')
      .send({ name: 'testWorkflow' });
    const workflowId = res.body._id;

    res = await request(server)
      .delete(`/workflow/${workflowId}`);

    expect(res.statusCode).toEqual(200);

    res = await request(server)
      .get(`/workflow/${workflowId}`);

    expect(res.statusCode).toEqual(404);
  });
});

describe('POST /workflow then DELETE /workflow/:workflowId', () => {
  it('should create a new workflow with tasks and steps, delete the workflow and ensure tasks and steps are deleted', async () => {
    const testStep = await new Step({ name: 'testStep' }).save();
    const testTask = await new Task({ name: 'testTask', steps: [testStep._id] }).save();
    const testWorkflow = {
      name: 'testWorkflow',
      tasks: [testTask._id]
    };

    // Create the workflow
    let res = await request(server)
      .post('/workflow')
      .send(testWorkflow);
    const workflowId = res.body._id;

    expect(res.statusCode).toEqual(200);

    // Delete the workflow
    res = await request(server)
      .delete(`/workflow/${workflowId}`);

    expect(res.statusCode).toEqual(200);

    // Check if the workflow exists
    res = await request(server)
      .get(`/workflow/${workflowId}`);

    expect(res.statusCode).toEqual(404);

    // Check if the task and step were deleted
    const deletedTask = await Task.findById(testTask._id);
    const deletedStep = await Step.findById(testStep._id);

    expect(deletedTask).toBeNull();
    expect(deletedStep).toBeNull();
  });
});

