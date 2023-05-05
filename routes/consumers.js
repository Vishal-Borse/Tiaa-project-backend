import express from "express";
import { conLogin, conSignup } from "../controllers/auth.js";
import auth from "../middleware/auth.js";

const router = express.Router();
router.post("/signup", conSignup);
router.post("/login", conLogin);

export default router;
