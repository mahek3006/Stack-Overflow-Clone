import express from "express";

import {
  AskQuestion,
  getAllQuestions,
  deleteQuestion,
  voteQuestion,
} from "../controllers/Questions.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.post("/askQuestion", auth, AskQuestion);
router.get("/getAllQuestions", getAllQuestions);
router.delete("/deleteQuestion/:id", deleteQuestion);
router.patch("/voteQuestion/:id", auth, voteQuestion);

export default router;
