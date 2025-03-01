const User = require("../models/User");

exports.createProject = async (req, res) => {
  const { userEmail, name, description } = req.body;

  try {
    let user = await User.findOne({ email: userEmail });

    if (!user) {
      user = new User({ email: userEmail, projects: [] });
    }

    const newProject = { name, description, tasks: [] };
    user.projects.push(newProject);
    await user.save();

    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ error: "Failed to create project" });
  }
};
