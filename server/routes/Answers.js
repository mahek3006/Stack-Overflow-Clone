import express from "express";

import { postAnswers, deleteAnswers } from "../controllers/Answers.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.patch("/postAnswer/:id", auth, postAnswers);
router.patch("/deleteAnswer/:id", auth, deleteAnswers);

export default router;
