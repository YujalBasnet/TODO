import express from "express";
import { createTodo, deleteTodo, getTodos } from "../controllers/todo.js";
import { isLoggedIn } from "../middleware/checkAuth.js";

const router = express.Router();

router.get("/get-todo", isLoggedIn, getTodos);
router.post("/create-todo", isLoggedIn, createTodo);
router.delete("/delete-todo/:id", isLoggedIn, deleteTodo);

export default router;