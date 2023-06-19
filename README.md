# orchestrator

##################################

As of Jun18 - the orchestrator is still work in progress. 

1. Test coverage is still not full and need to update the test caeses. 

Test Suites: 4 failed, 4 total
Tests:       6 failed, 11 passed, 17 total
Snapshots:   0 total
Time:        7.993 s, estimated 8 s

2. The front end to display the workflows created via API is working, however need to add the forms to create the workflow, tasks and steps. 

3. Eventually the steps should also allow to integrate with any APIs that can do the automation. 

Goal; 

The idea of this prject is to build A orchestration system that helps a network engineer to buil a datacenter , where it involves complex tasks/milestones and each involving the steps. The orchestration allows the user to track each task/milestone and steps and allows the user to finish the project 

4. Authentication and Autherization 
Authentication is explicitly avoided to make use of internal systems for now. 




##############################

1. Description:

The project will create an Orchestration System, which is a control system that can manage different types of workflows. Each workflow is made up of multiple sub-steps, and the system can track and control the execution of these steps in the correct order.

2. Problem Statement:

In day to dat network role, complex tasks need to be executed in a specific order. Manual tracking and managing of these tasks can be error-prone and inefficient. The orchestration system aims to automate this process, increasing efficiency and reducing errors.

3. Technical Components:

The technical components of the project will include:

   - Routes: The REST API will have endpoints to manage workflows and steps. These will allow the creation, retrieval, update, and deletion (CRUD operations) of workflows and steps.
   - Data Models: The data will be stored in MongoDB. Models will include `Workflow` (with fields like `name`, `description`, `steps`) and `Step` (with fields like `name`, `description`, `status`, `executionOrder`).
   - Workflow Engine: This is the core component that will execute the steps in the correct order and manage their status.

4. Meeting Project Requirements:

The project will meet requirements by building a REST API with Node.js and Express, using MongoDB as a database. The project will include error handling middleware for improved error responses.

5. Project Timeline:

- Week 1:
   - Setup the Node.js project with Express and MongoDB.
   - Design and create the data models (`Workflow`, `Step`).
   - Implement routes for creating (POST) and retrieving (GET) workflows and steps.
- Week 2:
   - Implement the routes for updating (PUT) and deleting (DELETE) workflows and steps.
   - Implement the Workflow Engine to execute the steps in the correct order and manage their status.
- Week 3:
   - Ensure all components are working together as expected.
   - Implement error handling middleware for better error response.
   - Refactor the code and fix any bugs.
   - Prepare the final project report and documentation.
   
This project provides a system to orchestrate complex processes or workflows, such as IT process automation, business process management.
