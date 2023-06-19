const Workflow = require('../models/workflow');
const Task = require('../models/task');
const Step = require('../models/step');

module.exports.createWorkflow = async (workflowData) => {
  const workflow = new Workflow(workflowData);
  return workflow.save();
}

// module.exports.getWorkflow = async (id) => {
//   return Workflow.findById(id).lean().populate({
//     path: 'tasks',
//     model: 'Task',
//     populate: {
//       path: 'steps',
//       model: 'Step'
//     }
//   });
// }


module.exports.getWorkflow = async (id) => {
  try {
    const workflow = await Workflow.findById(id).lean().populate({
      path: 'tasks',
      populate: {
        path: 'steps',
        model: 'Step'
      }
    });
  
    console.log(workflow);
  
    return workflow;
  } catch (error) {
    console.error(error);
    // handle error, maybe send response with error message
  }
};



module.exports.getWorkflows = async () => {
  return Workflow.find()
    .populate({
      path: 'tasks',
      model: 'Task',
      populate: {
        path: 'steps',
        model: 'Step'
      }
    });
}


module.exports.updateWorkflow = async (id, updatedData) => {
  return Workflow.findByIdAndUpdate(id, updatedData, { new: true });
}

module.exports.deleteWorkflow = async (id) => {
  const workflow = await Workflow.findById(id);

  // Delete tasks associated with the workflow
  if (workflow.tasks && workflow.tasks.length > 0) {
    for (let taskId of workflow.tasks) {
      let task = await Task.findById(taskId);
      
      // Delete steps associated with the task
      if (task.steps && task.steps.length > 0) {
        for (let stepId of task.steps) {
          await Step.findByIdAndRemove(stepId);
        }
      }

      await Task.findByIdAndRemove(taskId);
    }
  }

  return Workflow.findByIdAndRemove(id);
}


module.exports.addTask = async (workflowId, taskData) => {
  // create a new task
  const task = new Task(taskData);
  await task.save();

  // find the workflow and add the task to it
  const workflow = await Workflow.findById(workflowId);
  workflow.tasks.push(task._id);
  await workflow.save();

  // return the updated workflow
  return workflow;
};

module.exports.createStep = async (taskId, stepData) => {
  // create a new step
  const step = new Step(stepData);
  await step.save();

  // find the task and add the step to it
  const task = await Task.findById(taskId);
  task.steps.push(step._id);
  await task.save();

  // return the updated task
  return task;
}