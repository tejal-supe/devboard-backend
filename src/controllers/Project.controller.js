import Project from "../models/Project.model.js";

export const createProject = async (req, res) => {
  try {    
    const { _id } = req.user;
    const { title, description, collaborators } = req.body;
    const project = await Project.create({ userId: _id,title,description,collaborators });
    if (!project) {
      return res.status(400).json({ message: "Error in creating project" });
    }
    res.status(201).json({
      message: "Project Created Successfully!",
      success: true,
    });
  } catch (error) {
    console.log("Error in create project controller", error);
  }
};

export const getProjects = async (req, res) => {
  try {
    const { _id } = req.user;

    const allProjects = await Project.find({
      userId: _id,
      isDeleted: false,
    }).lean();
    if (!allProjects) {
      return res.status(400).json({ message: "Error in getting project" });
    }
    res.status(201).json({
      message: "Projects fetched succesfully!",
      success: true,
      data: allProjects,
    });
  } catch (error) {
    console.log("Error in get projects controller", error);
  }
};

export const getProjectById = async (req, res) => {
  try {
    const { _id } = req.user;
    const { id } = req.params;
    const projectData = await Project.findOne({
      id: id,
      userId: _id,
      isDeleted: false,
    });
    if (!projectData) {
      return res.status(400).json({ message: "Data not Found" });
    }
    res.status(201).json({
      message: "Data fetched Successfully!",
      data: projectData,
      success: true,
    });
  } catch (error) {
    console.log("Error in get project by id controller", error);
  }
};

export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { _id } = req.user;
    const projectDataUpdated = await Project.findOneAndUpdate(
      { id: id, userId, _id },
      req.body,
      { new: true }
    );
    if (!projectDataUpdated) {
      return res.status(400).json({ message: "Data not found" });
    }
    res.status(201).json({
      message: "Data updated succesfully!",
      success: true,
      data: projectDataUpdated,
    });
  } catch (error) {
    console.log("Error in update project controller", error);
  }
};

export const deleteProject = async (req, res) => {
  try {
    const { _id } = req.user;
    const { id } = req.params;
    const deletedProject = await Project.findOneAndUpdate(
      {
        id: id,
        userId: _id,
      },
      { isDeleted: true },
      { new: true }
    );
    if (!deletedProject) {
      return res.status(400).json({ message: "Project not found" });
    }
    res.status(201).json({
      message: "Project Deleted Successfully!",
      success: true,
      data: deletedProject,
    });
  } catch (error) {
    console.log("Error in delete project controller", error);
  }
};

export const exportProject = async (req, res) => {
  try {
    const { _id } = req.user;
    const { id } = req.params;
    const exportData = await Project.findOne({
      _id: id,
      userId: _id,
      isDeleted: false,
    })
      .populate("collaborators.userId", "name email")
      .lean();
    if (!exportData) {
      return res.status(400).json({ message: "Project not found" });
    }
    res
      .status(201)
      .setHeader(
        "Content-Disposition",
        `attachment; filename=project-${id}.json`
      )
      .json({
        message: "Data exported succesfully!",
        success: true,
        data: exportData,
      });
  } catch (error) {
    console.log("Error in export project controller", error);
  }
};
