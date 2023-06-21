const request = require('supertest');
const server = require('../server');
const { connectDB, stopDB, clearDB } = require('../test-utils');
const Workflow = require('../models/workflow');

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
    const workflowName = `Workflow_${Date.now()}`;
    const res = await request(server)
      .post('/workflow')
      .send({ name: workflowName });

    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toEqual(workflowName);
  });
});

describe('GET /workflow', () => {
  it('should fetch all workflows and return 200 status code', async () => {
    const workflow1 = await new Workflow({ name: 'Workflow 1' }).save();
    const workflow2 = await new Workflow({ name: 'Workflow 2' }).save();

    const res = await request(server).get('/workflow');

    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    expect(res.body.length).toEqual(2);
    expect(res.body[0]._id).toBeDefined();
    expect(res.body[0].name).toEqual(workflow1.name);
    expect(res.body[1]._id).toBeDefined();
    expect(res.body[1].name).toEqual(workflow2.name);
  });
});


describe('POST /workflow then GET /workflow/:workflowId', () => {
  it('should create a new workflow, fetch it, and return 200 status code', async () => {
    const workflowName = `Workflow_${Date.now()}`;
    const workflow = await new Workflow({ name: workflowName }).save();

    const res = await request(server).get(`/workflow/${workflow._id}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body._id).toEqual(workflow._id.toString());
    expect(res.body.name).toEqual(workflowName);
  });
});

describe('POST /workflow then DELETE /workflow/:workflowId', () => {
  it('should create a new workflow, delete it, and return 200 status code', async () => {
    const workflowName = `Workflow_${Date.now()}`;
    const workflow = await new Workflow({ name: workflowName }).save();

    const res = await request(server).delete(`/workflow/${workflow._id}`);

    expect(res.statusCode).toEqual(200);

    const fetchRes = await request(server).get(`/workflow/${workflow._id}`);
    expect(fetchRes.statusCode).toEqual(404);
  });
});
