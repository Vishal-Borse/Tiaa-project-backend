import express from "express";
import { consumerSignup } from "../controllers/consumer";
import auth from "../middleware/auth.js";

const router = express.Router();
router.post("/signup", consumerSignup);
// router.post("/login", consumerSignin);

module.exports = router;
