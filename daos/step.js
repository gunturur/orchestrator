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

        const updatedTask = await Task.findById(taskId).populate('steps');
        console.log(updatedTask);

        return step;
    } catch (error) {
        console.error(`Error creating step: ${error}`);
        return null;
    }
};

  

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
    return Step.findByIdAndRemove(id);
}


