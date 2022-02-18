// build your `/api/resources` router here
const express = require("express");

const Resources = require("./resource-model");

const router = express.Router();

router.post("/", async (req, res, next) => {
  const { resource_name } = req.body;
  if (!resource_name) {
    return res.status(404).json("The name you entered already exists");
  } else {
    Resources.create(req.body)
      .then((newResource) => {
        res.status(201).json(newResource);
      })
      .catch(next);
  }
});
router.get("/", async (req, res, next) => {
  Resources.getAll()
    .then((resources) => {
      res.status(200).json(resources);
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
