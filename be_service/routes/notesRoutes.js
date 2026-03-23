const express = require("express");
const router = express.Router();
const notesController = require("../controllers/notesController");

router.get("/", notesController.getAllNotes);
router.get("/:id", notesController.getNotesById);
router.post("/", notesController.createNotes);
router.put("/:id", notesController.updateNotes);
router.delete("/:id", notesController.deleteNotes);

module.exports = router;
