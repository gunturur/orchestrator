const Task = require('../models/task');

module.exports.createTask = async (taskData) => {
  const task = new Task(taskData);
  return task.save();
};

module.exports.getTask = async (id) => {
  return Task.findById(id);
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
