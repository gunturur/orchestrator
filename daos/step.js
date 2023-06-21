const Step = require('../models/step');
const Task = require('../models/task');

module.exports.createStep = async (taskId, stepData) => {
    try {
      const step = new Step(stepData);
      await step.save();
  
      const task = await Task.findById(taskId);
      if (!task) {
        console.log(`Task with ID ${taskId} not found.`);
        return null;
      }
      task.steps.push(step._id);
      await task.save();
  
      const addedStep = await Step.findById(step._id);
      return addedStep;
    } catch (error) {
      console.error(`Error creating step: ${error}`);
      return null;
    }
  }

module.exports.getStep = async (id) => {
    return Step.findById(id);
}

module.exports.getSteps = async () => {
    return Step.find();
}

module.exports.updateStep = async (id, updatedData) => {
    return Step.findByIdAndUpdate(id, updatedData, { new: true });
}

module.exports.deleteStep = async (id) => {
    const stepToDelete = await Step.findById(id);
    if (!stepToDelete) {
        console.error(`Step with ID ${id} not found.`);
        return null;
    }
    const task = await Task.findById(stepToDelete.taskId);
    if (task) {
        const index = task.steps.indexOf(id);
        if (index !== -1) {
            task.steps.splice(index, 1);
            await task.save();
        }
    }
    
    const deletedStep = await Step.findByIdAndRemove(id);
    if(deletedStep) {
        console.log(`Step with ID ${deletedStep._id} was successfully deleted.`);
    } else {
        console.log(`Step with ID ${id} was not deleted.`);
    }
    
    return deletedStep;
}
