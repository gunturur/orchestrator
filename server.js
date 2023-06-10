const express = require("express");
const cors = require("cors");

const workflowRoutes = require('./routes/workflow');
const taskRoutes = require('./routes/task'); // task.js in routes directory
const stepRoutes = require('./routes/step'); // step.js in routes directory

const server = express();
server.use(cors());
server.use(express.json());

server.use('/workflow', workflowRoutes);
server.use('/task', taskRoutes); // Using task routes
server.use('/step', stepRoutes); // Using step routes

server.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

module.exports = server;

