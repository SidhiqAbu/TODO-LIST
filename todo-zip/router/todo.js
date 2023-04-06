const express = require("express");
const {
  createTodo,
  getTodo,
  getTodoBYId,
  updateStatus,
} = require("../controller/todoController");
const router = express.Router();

router.post("/", createTodo);
router.get("/", getTodo);
router.get("/:id", getTodoBYId);
router.post("/:id/update_status/:status_id", updateStatus);
module.exports = router;
