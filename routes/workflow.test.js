const request = require('supertest');
const app = require('../server');
const Workflow = require('../models/workflow.model');
const testUtils = require('../test-utils');

describe('Workflows', () => {
  // Test the GET route
  it('should GET all the workflows', async () => {
    const res = await request(app).get('/workflow');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('workflows');
  });
});
