import express from "express";
import { parseTodo } from "../controllers/ai.js";
import {isLoggedIn} from "../middleware/checkAuth.js";

const router = express.Router();

router.post("/parse-todo", isLoggedIn, parseTodo);

export default router;