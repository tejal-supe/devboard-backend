import Task from "../models/Task.model.js";

export const createTask = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { title, description, status, dueDate, isDeleted } = req.body;
    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }
    const taskCreated = await Task.create({
      title,
      description,
      dueDate,
      status,
      isDeleted,
      projectId,
    });
    if (!taskCreated) {
      return res.status(400).json({ message: "Error in creating task" });
    }
    res.status(201).json({
      message: "Task created successfully!",
      success: true,
      data: taskCreated,
    });
  } catch (error) {
    console.log("Error in create task controller", error);
  }
};

export const getAllTasks = async (req, res) => {
  try {
    const { projectId } = req.params;
    const page = parseInt(req.query.page || "1");
    const limit = parseInt(req.query.limit || "10");
    const startIndex = (page - 1) * limit;
    const total = await Task.countDocuments();

    const tasks = await Task.find({ projectId, isDeleted: false })
      .skip(startIndex)
      .limit(limit);

    if (!tasks) {
      res.status(400).json({ message: "Error while fetching tasks data" });
    }
    res.status(201).json({
      message: "Tasks fetched succesfully!",
      success: true,
      data: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
        data: tasks,
      },
    });
  } catch (error) {
    console.log("Error in fetching all tasks controller", error);
  }
};

export const updateTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTask = await Task.findOneAndUpdate(
      {
        _id: id,
        isDeleted: false,
      },
      req.body,
      { new: true }
    );
    if (!updatedTask) {
      return res.status(400).json({ message: "Task not found" });
    }
    res.status(201).json({
      message: "Task updated succesfully!",
      success: true,
      data: updatedTask,
    });
  } catch (error) {
    console.log("Error in update task controller", error);
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const taskDeleted = await Task.findOneAndUpdate(
      {
        _id: id,
        isDeleted: false,
      },
      { isDeleted: true },
      { new: true }
    );
    if (!taskDeleted) {
      return res.status(400).json({ message: "Task not found" });
    }
    res
      .status(201)
      .json({ message: "Task deleted successfully!", success: true });
  } catch (error) {
    console.log("Error in delete task controller", error);
  }
};
