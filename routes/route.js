import express from "express";

import { signupUser, signinUser } from "../controller/user-controller.js";
import {
  createPost,
  getAllPosts,
  getPost,
  updatePost,
  deletePost,
} from "../controller/post-controller.js";
import {
  newComment,
  getComments,
  deleteComment,
} from "../controller/comment-controller.js";
import { authenticateToken } from "../controller/jwt-controller.js";

const router = express.Router();

router.post("/signup", signupUser);
router.post("/signin", signinUser);

router.post("/create", authenticateToken, createPost);
router.get("/posts", getAllPosts);
router.get("/post/:id", getPost);
router.put("/update/:id", authenticateToken, updatePost);
router.delete("/delete/:id", authenticateToken, deletePost);
router.post("/comment/new", authenticateToken, newComment);
router.get("/comments/:id", getComments);
router.delete("/comment/delete/:id", authenticateToken, deleteComment);

export default router;
