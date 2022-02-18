// build your server here and require it from index.js

const express = require("express");
const ProjectRouter = require("./project/project-router");
const ResourcesRouter = require("./resource/resource-router");

const server = express();

server.use(express.json());
server.use("/api/projects", ProjectRouter);
server.use("/api/resources", ResourcesRouter);

server.use("*", (req, res) => {
  res.status(200).json("Getting all API 😁");
});

module.exports = server;
