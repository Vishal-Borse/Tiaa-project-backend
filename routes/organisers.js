import express from "express";
import { orgLogin, orgSignup } from "../controllers/auth.js";
import auth from "../middleware/auth.js";

const router = express.Router();
router.post("/signup", orgSignup);
router.post("/login", orgLogin);

export default router;
