const { connectDB, stopDB, clearDB, workflow, task, step } = require('../test-utils');

beforeAll(async () => {
  await connectDB();
});

afterAll(async () => {
  await stopDB();
});

beforeEach(async () => {
  await clearDB();
});

describe('Workflow Tests', () => {
  it('should create and delete workflow with tasks and steps', async () => {
    const step = await new step({ name: 'testStep' }).save();
    const task = await new task({ name: 'testTask', steps: [step._id] }).save();
    const workflow = await new workflow({ name: 'testWorkflow', tasks: [task._id] }).save();
  
    // Check Workflow, Task, and Step creation
    const foundWorkflow = await workflow.findById(workflow._id).populate({
      path: 'tasks',
      populate: { path: 'steps' }
    });
    
    expect(foundWorkflow.tasks[0].steps[0].name).toEqual('testStep');
    expect(foundWorkflow.tasks[0].name).toEqual('testTask');
    expect(foundWorkflow.name).toEqual('testWorkflow');
  
    // Delete workflow
    await Workflow.deleteOne({ _id: workflow._id });
    
    // Check deletion of Workflow, Task, and Step
    const deletedWorkflow = await workflow.findById(workflow._id);
    const deletedTask = await task.findById(task._id);
    const deletedStep = await step.findById(step._id);
    
    expect(deletedWorkflow).toBeNull();
    expect(deletedTask).toBeNull();
    expect(deletedStep).toBeNull();
  });
});

