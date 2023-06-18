import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API_BASE_URL from './config';
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Accordion, Card, Button, Navbar, NavDropdown } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';



const WorkflowDetails = () => {
  const { id } = useParams(); // get the workflow id from the URL
  const [workflow, setWorkflow] = useState(null);

  useEffect(() => {
    console.log(`Fetching: ${API_BASE_URL}/workflow/${id}`);

    fetch(`${API_BASE_URL}/workflow/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Received data:', data); // check the data
        setWorkflow(data);
      })
      .catch(error => {
        console.error('An error occurred:', error);
      });
  }, [id]);


  if (!workflow) return <div>Loading...</div>;

  return (
    <div>
      <h1>{workflow.name}</h1>
      {workflow.tasks.map((task, taskIndex) => (
        <Container fluid="md">

        <Accordion>

          <Accordion.Item eventKey="taskIndex">
            <Accordion.Header>{task.name}</Accordion.Header>
            <Accordion.Body >
              {task.steps.map((step, stepIndex) => (
                <Row key={stepIndex}>
                  <Container fluid="md">
                    <Row>
                      <Col style={{backgroundColor: 'blue', color: 'white'}}>{step.name}</Col>
                      <Col style={{backgroundColor: 'green', color: 'white'}}>{step.description}</Col>
                    </Row>
                  </Container>
                </Row>))}
            </Accordion.Body>
          </Accordion.Item>

        </Accordion>
        </Container>
      ))}
    </div>
  );


};

export default WorkflowDetails;
