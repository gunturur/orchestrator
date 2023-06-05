const Step = require('../models/step');

module.exports.createStep = async (stepData) => {
    const step = new Step(stepData);
    return step.save();
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
    return Step.findByIdAndRemove(id);
}


