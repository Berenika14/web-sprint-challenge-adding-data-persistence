// build your `Task` model here
const db = require("../../data/dbConfig");

// - [ ] `[POST] /api/tasks`
//   - Even though `task_completed` is stored as an integer,
// the API uses booleans when interacting with the client
//   - Example of response body: `{"task_id":1,
// "task_description":"baz","task_notes":null,"task_completed":false,"project_id:1}`

// - [ ] `[GET] /api/tasks`
//   - Even though `task_completed` is stored as an integer,
// the API uses booleans when interacting with the client
//   - Each task must include `project_name` and `project_description`
//   - Example of response body: `[{"task_id":1,"task_description":"baz",
// "task_notes":null,"task_completed":false,"project_name:"bar","project_description":null}]`

function mapTasks(tasks) {
  return { ...tasks, task_completed: Boolean(tasks.task_completed) };
}
const getAll = () => {
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
