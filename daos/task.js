const Task = require('../models/task');
const Step = require('../models/step');

module.exports.createTask = async (taskData) => {
  const task = new Task(taskData);
  return task.save();
};

module.exports.getTask = async (id) => {
  console.log(`getTask: fetching task with id ${id}`);
  const task = await Task.findById(id);
  if (task) {
    console.log(`getTask: found task with name ${task.name}`);
  } else {
    console.log(`getTask: no task found with id ${id}`);
  }
  return task;
};


module.exports.getTasks = async () => {
  return Task.find();
};

module.exports.updateTask = async (id, updatedData) => {
  return Task.findByIdAndUpdate(id, updatedData, { new: true });
};

module.exports.deleteTask = async (id) => {
  return Task.findByIdAndRemove(id);
};


module.exports.addStep = async (taskId, stepData) => {
  const task = await Task.findById(taskId);
  if (!task) throw new Error('Task not found');
  const step = new Step(stepData);
  await step.save();
  task.steps.push(step._id);
  return task.save();
};