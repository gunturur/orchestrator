const express = require("express");
const cors = require("cors");

const workflowRoutes = require('./routes/workflow');
const taskRoutes = require('./routes/task'); // task.js in routes directory
const stepRoutes = require('./routes/step'); // step.js in routes directory
const userRoutes = require('./routes/user'); // user.js in routes directory

const server = express();
server.use(cors());
server.use(express.json());

server.use('/workflow', workflowRoutes);
server.use('/task', taskRoutes); // Using task routes
server.use('/step', stepRoutes); // Using step routes
server.use('/user', userRoutes); // Using user routes
// server.use('/workflow/:workflowId/tasks/:taskId/steps', stepRoutes);

// server.use(/'project'/, projectRoutes); // Using project routes')

server.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error: err.message });
});

module.exports = server;
