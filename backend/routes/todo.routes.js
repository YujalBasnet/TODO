import express from "express";
import { createTodo, getTodos } from "../controllers/todo.js";

const router = express.Router();

router.get("/get-todo", getTodos);
router.post("/create-todo", createTodo);

export default router;