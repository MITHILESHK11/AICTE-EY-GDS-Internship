const User = require("../models/User");

exports.addTask = async (req, res) => {
  const { userEmail, projectId, name, description, priority, status } = req.body;

  try {
    const user = await User.findOne({ email: userEmail });
    if (!user) return res.status(404).json({ error: "User not found" });

    const project = user.projects.id(projectId);
    if (!project) return res.status(404).json({ error: "Project not found" });

    const newTask = { name, description, priority, status };
    project.tasks.push(newTask);

    await user.save();
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ error: "Failed to add task" });
  }
};

exports.getTasks = async (req, res) => {
  const { userEmail, projectId } = req.query;

  try {
    const user = await User.findOne({ email: userEmail });
    if (!user) return res.status(404).json({ error: "User not found" });

    const project = user.projects.id(projectId);
    if (!project) return res.status(404).json({ error: "Project not found" });

    res.json({ success: true, tasks: project.tasks });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
};
