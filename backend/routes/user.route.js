import express from "express";

import {register,login,} from "../controllers/auth.js";
import upload from "../middleware/multer.js";

const router = express.Router();

router.post("/register", upload.single("image"), register);

router.post("/login", login);

export default router;