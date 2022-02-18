// build your `/api/projects` router here

// - [ ] `[POST] /api/projects`
//   - Even though `project_completed` is stored as an integer, the API uses booleans when interacting with the client
//   - Example of response body: `{"project_id":1,"project_name":"bar","project_description":null,"project_completed":false}`

// - [ ] `[GET] /api/projects`
//   - Even though `project_completed` is stored as an integer, the API uses booleans when interacting with the client
//   - Example of response body: `[{"project_id":1,"project_name":"bar","project_description":null,"project_completed":false}]`
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
router.get("/", async (req, res, next) => {});

router.use((err, res, req, next) => {
  res.status(500).json({
    customMessage: "Getting an internal error ❌",
    message: err.message,
    stack: err.stack,
  });
});

module.exports = router;
