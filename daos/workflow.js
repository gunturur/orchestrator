const Workflow = require('../models/workflow');

module.exports.createWorkflow = async (workflowData) => {
  const workflow = new Workflow(workflowData);
  return workflow.save();
}

module.exports.getWorkflow = async (id) => {
  return Workflow.findById(id).populate({
    path: 'tasks',
    populate: {
      path: 'steps',
    }
  });
}

module.exports.getWorkflows = async () => {
  return Workflow.find().populate({
    path: 'tasks',
    populate: {
      path: 'steps',
    }
  });
}

module.exports.updateWorkflow = async (id, updatedData) => {
  return Workflow.findByIdAndUpdate(id, updatedData, { new: true });
}

module.exports.deleteWorkflow = async (id) => {
  return Workflow.findByIdAndRemove(id);
}

module.exports.addTask = async (workflowId, taskData) => {
  const workflow = await Workflow.findById(workflowId);
  if (!workflow) throw new Error('Workflow not found');
  const task = new Task(taskData);
  await task.save();
  workflow.tasks.push(task._id);
  return workflow.save();
};