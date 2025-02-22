// build your `/api/projects` router here

const express = require("express");

const Projects = require("./project-model");

const router = express.Router();

router.post("/", async (req, res, next) => {
  const { project_name } = req.body;
  if (!project_name) {
    return res.status(404).json("Project name is a required missing field");
  } else {
    Projects.create(req.body)
      .then((newProject) => {
        res.status(201).json(newProject);
      })
      .catch(next);
  }
});
router.get("/", async (req, res, next) => {
  Projects.getAll()
    .then((projects) => {
      res.status(200).json(projects);
    })
    .catch(next);
});

router.use((err, req, res, next) => {
  res.status(500).json({
    customMessage: "Getting an internal error ❌",
    message: err.message,
    stack: err.stack,
  });
});

module.exports = router;
