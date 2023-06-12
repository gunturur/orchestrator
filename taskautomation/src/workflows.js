import React, { useState, useEffect } from 'react';
import API_BASE_URL from './config';
import {Link} from "react-router-dom"
import Card from 'react-bootstrap/Card';
import Container from "react-bootstrap/Container";
import 'bootstrap/dist/css/bootstrap.min.css'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Workflows() {
  const [workflows, setWorkflows] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/workflow`)
      .then(response => response.json())
      .then(data => setWorkflows(data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h1>Workflows</h1>
      {workflows.map((workflow, index) => (
        <div key={index}>
          <h2>{workflow.name}</h2>
          <p>{workflow.description}</p>
          {/* Add more fields as required */}
        </div>
      ))}
    </div>
  );
}

export default Workflows;
