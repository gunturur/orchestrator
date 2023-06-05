const request = require('supertest');
const app = require('../server');
const Task = require('../models/task.model');
const testUtils = require('../test-utils');

describe('Tasks', () => {
  // Test the GET route
  it('should GET all the tasks', async () => {
    const res = await request(app).get('/task');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('tasks');
  });
});
