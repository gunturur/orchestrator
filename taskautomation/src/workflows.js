import React, { useState, useEffect } from 'react';
import API_BASE_URL from './config';
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Accordion, Card, Button, Navbar, NavDropdown } from 'react-bootstrap';
import './style.css';

function Workflows() {
  const [workflows, setWorkflows] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/workflow`)
      .then(response => response.json())
      .then(data => setWorkflows(data))
      .catch(error => console.error(error));
  }, []);

  return (
    <Container>
      <div>
        <h1>Workflows</h1>
        <Row className="mb-3">
          <Col style={{backgroundColor: 'blue', color: 'white'}}>NAME</Col>
          <Col style={{backgroundColor: 'green', color: 'white'}}>Description</Col>
        </Row>
        {workflows.map((workflow, index) => (
          <Row key={index} className="mb-3">
            <Col style={{backgroundColor: 'blue', color: 'white'}}>
              <Link to={`/workflow/${workflow._id}`}>{workflow.name}</Link>
            </Col>
            <Col style={{backgroundColor: 'green', color: 'white'}}>{workflow.description}</Col>
          </Row>
        ))}
      </div>
    </Container>
  );
}

export default Workflows;

