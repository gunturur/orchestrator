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

