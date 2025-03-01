const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  name: String,
  description: String,
  priority: String,
  status: String,
});

const ProjectSchema = new mongoose.Schema({
  name: String,
  description: String,
  tasks: [TaskSchema],
});

const UserSchema = new mongoose.Schema({
  email: String,
  projects: [ProjectSchema],
});

module.exports = mongoose.model("User", UserSchema);
