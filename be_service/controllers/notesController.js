const notesModels = require("../models/notesModels");

const getAllNotes = async (req, res) => {
  try {
    const allDataNotes = await notesModels.findAll();
    res.status(200).json({
      message: "Notes retrieved successfully",
      data: allDataNotes,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving notes",
      error: error.message,
    });
  }
};

const createNotes = async (req, res) => {
  const { judul, isi} = req.body;

  if (!judul || !isi) {
    return res.status(400).json({
      message: "Title and content are required",
    });
  }

  try {
    const newNotes = await notesModels.create({ judul, isi});
    res.status(201).json({
      message: "Notes created successfully",
      data: newNotes,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error creating notes",
      error: error.message,
    });
  }
};

const getNotesById = async (req, res) => {
  const { id } = req.params;

  try {
    const note = await notesModels.findById(id);

    if (!note) {
      return res.status(404).json({
        message: "Notes not found",
      });
    }

    res.status(200).json({
      message: "Notes retrieved successfully",
      data: note,
    });

  } catch (error) {
    res.status(500).json({
      message: "Error retrieving notes",
      error: error.message,
    });
  }
};

const updateNotes = async (req, res) => {
  const { id } = req.params;
  const { judul, isi} = req.body;

  try {
    const note = await notesModels.findById(id);

    if (!note) {
      return res.status(404).json({
        message: "Notes not found",
      });
    }

    const updatedNotes = await notesModels.updateById(id, { judul, isi});

    res.status(200).json({
      message: "Notes updated successfully",
      data: updatedNotes,
    });

  } catch (error) {
    res.status(500).json({
      message: "Error updating notes",
      error: error.message,
    });
  }
};

const deleteNotes = async (req, res) => {
  const { id } = req.params;

  try {
    const note = await notesModels.findById(id);

    if (!note) {
      return res.status(404).json({
        message: "Notes not found",
      });
    }

    await notesModels.deleteById(id);

    res.status(200).json({
      message: "Notes deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: "Error deleting notes",
      error: error.message,
    });
  }
};

module.exports = {
  getAllNotes,
  createNotes,
  getNotesById,
  updateNotes,
  deleteNotes,
};