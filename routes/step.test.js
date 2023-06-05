const request = require('supertest');
const app = require('../server');
const Step = require('../models/step.model');

describe('Steps', () => {
  // Test the GET route
  it('should GET all the steps', async () => {
    const res = await request(app).get('/step');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('steps');
  });
});
