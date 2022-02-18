// build your server here and require it from index.js

const express = require("express");

const server = express();

server.use(express.json());

server.use("*", (req, res) => {
  res.status(200).json("Getting all API 😁");
});

module.exports = server;
