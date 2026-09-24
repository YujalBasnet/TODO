import express from "express";
import { createTodo, deleteTodo, getTodos } from "../controllers/todo.js";

const router = express.Router();

router.get("/get-todo", getTodos);
router.post("/create-todo", createTodo);
router.delete("/delete-todo/:id", deleteTodo);

export default router;