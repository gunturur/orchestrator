import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import axios from 'axios';

const WorkflowForm = () => {
  const [workflowName, setWorkflowName] = useState("");
  const [tasks, setTasks] = useState([{ taskName: "", steps: [""] }]);

  const addTask = () => {
    setTasks([...tasks, { taskName: "", steps: [""] }]);
  };

  const addStep = (taskIndex) => {
    const newTasks = [...tasks];
    newTasks[taskIndex].steps.push("");
    setTasks(newTasks);
  };

  const handleTaskNameChange = (event, taskIndex) => {
    const newTasks = [...tasks];
    newTasks[taskIndex].taskName = event.target.value;
    setTasks(newTasks);
  };

  const handleStepNameChange = (event, taskIndex, stepIndex) => {
    const newTasks = [...tasks];
    newTasks[taskIndex].steps[stepIndex] = event.target.value;
    setTasks(newTasks);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Handle API calls here
      const workflowResponse = await axios.post('http://localhost:7007/workflow', { name: workflowName });
      const workflowId = workflowResponse.data._id;

      for (let task of tasks) {
        const taskResponse = await axios.post(`http://localhost:7007/workflow/${workflowId}/tasks`, { name: task.taskName });
        const taskId = taskResponse.data._id;

        for (let step of task.steps) {
          await axios.post(`http://localhost:7007/workflow/${workflowId}/tasks/${taskId}/steps`, { name: step });
        }
      }
      alert('Workflow created successfully');
    } catch (error) {
      console.log(error);
      alert('Failed to create workflow');
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Workflow Name</Form.Label>
          <Form.Control type="text" value={workflowName} onChange={e => setWorkflowName(e.target.value)} />
        </Form.Group>

        {tasks.map((task, taskIndex) => (
          <div key={taskIndex}>
            <Form.Group>
              <Form.Label>Task Name</Form.Label>
              <Form.Control type="text" value={task.taskName} onChange={e => handleTaskNameChange(e, taskIndex)} />

              {task.steps.map((step, stepIndex) => (
                <div key={stepIndex}>
                  <Form.Label>Step Name</Form.Label>
                  <Form.Control type="text" value={step} onChange={e => handleStepNameChange(e, taskIndex, stepIndex)} />
                </div>
              ))}

              <Button variant="primary" onClick={() => addStep(taskIndex)}>Add Step</Button>
            </Form.Group>
          </div>
        ))}

        <Button variant="primary" onClick={addTask}>Add Task</Button>

        <Button variant="primary" type="submit">Submit</Button>
      </Form>
    </Container>
  );
};

export default WorkflowForm;
