const request = require('supertest');
const server = require('../server');
const { connectDB, stopDB, clearDB } = require('../test-utils');
const Task = require('../models/task');
const Step = require('../models/step');

let testStep;

beforeAll(async () => {
  await connectDB();
});

afterAll(async () => {
  await stopDB();
});

beforeEach(async () => {
  await clearDB();
});

// Test post step 
// Test get step by id
// Test get all steps
// Test delete step by id
// Test update step by id

describe('createStep', () => {
  it('should create a new step for a task and return the added step', async () => {
    // Create a mock task
    const task = new Task({ name: 'Test Task' });
    await task.save();

    // Define the step data
    const stepData = { name: 'Test Step' };

    // Call the createStep function
    const addedStep = await createStep(task._id, stepData);

    // Assert the result
    expect(addedStep).toBeDefined();
    expect(addedStep.name).toEqual('Test Step');

    // Verify that the step is added to the task
    const updatedTask = await Task.findById(task._id).populate('steps');
    expect(updatedTask.steps).toContainEqual(addedStep._id);
  });

  it('should return null if the task is not found', async () => {
    // Create a task that doesn't exist
    const taskId = 'nonexistent-task-id';

    // Define the step data
    const stepData = { name: 'Test Step' };

    // Call the createStep function
    const addedStep = await createStep(taskId, stepData);

    // Assert the result
    expect(addedStep).toBeNull();
  });

});
