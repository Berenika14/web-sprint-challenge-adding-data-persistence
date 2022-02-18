// build your `Project` model here
const db = require("../../data/dbConfig");

const getAll = () => {
  return db("projects").then((projects) => projects.map(mapProject));
};

function mapProject(project) {
  return { ...project, project_completed: Boolean(project.project_completed) };
}

const getById = (project_id) => {
  return db("projects")
    .where("project_id", project_id)
    .first()
    .then(mapProject);
};
const create = (project) => {
  return db("projects")
    .insert(project)
    .then(([project_id]) => {
      return getById(project_id);
    });
};

module.exports = {
  getAll,
  getById,
  create,
};
