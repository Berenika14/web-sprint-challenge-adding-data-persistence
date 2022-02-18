// build your `Task` model here
const db = require("../../data/dbConfig");

function mapTasks(tasks) {
  return { ...tasks, task_completed: Boolean(tasks.task_completed) };
}
const getAll = () => {
  //  SELECT task_id ,task_description, task_notes,  task_completed
  // ,project_name,project_description FROM
  // tasks as t
  // join projects as p on t.project_id = p.project_id
  return db("tasks").then((tasks) => tasks.map(mapTasks));
};

const getById = (task_id) => {
  return db("tasks").where("task_id", task_id).first().then(mapTasks);
};
const create = (task) => {
  return db("tasks")
    .insert(task)
    .then(([task_id]) => {
      return getById(task_id).then(mapTasks);
    });
};
module.exports = {
  getById,
  getAll,
  create,
};
