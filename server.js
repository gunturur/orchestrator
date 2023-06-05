const express = require("express");
const cors = require("cors");

const workflowRoutes = require('./routes/workflow');

const server = express();
server.use(cors());
server.use(express.json());

server.use('/workflow', workflowRoutes);

server.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`Server is listening on port ${port}`));

module.exports = server;
