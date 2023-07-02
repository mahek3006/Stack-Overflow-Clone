import express from "express";

import { CreatePost, getsAllPosts, postLiked } from "../controllers/Posts.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.post("/createPost", CreatePost);
router.get("/getAllPosts", getsAllPosts);
router.patch("/likedPost/:id", auth, postLiked);

export default router;
