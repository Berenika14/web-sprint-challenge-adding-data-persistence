// build your `/api/tasks` router here
const express = require("express");
const Tasks = require("./task-model");

const router = express.Router();
router.get("/", (req, res, next) => {});

router.post("/", (req, res, next) => {
  const { task_description, project_id } = req.body;
  if (!task_description || !project_id) {
    return res.status(404).json("Missing description or projectId ");
  } else {
    Tasks.create(req.body)
      .then((newTask) => {
        res.status(201).json(newTask);
      })
      .catch(next);
  }
});

router.use((err, req, res, next) => {
  res.status(500).json({
    customMessage: "Getting an internal error ❌",
    message: err.message,
    stack: err.stack,
  });
});
module.exports = router;
