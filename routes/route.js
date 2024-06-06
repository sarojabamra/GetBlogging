import express from "express";
import {
  signupUser,
  signinUser,
  getAllUsers,
  deleteUser,
  updateIsAdmin,
} from "../controller/user-controller.js";
import {
  createPost,
  getAllPosts,
  getPost,
  updatePost,
  deletePost,
  getAllUnapprovedPosts,
  approvePost,
} from "../controller/post-controller.js";
import {
  newComment,
  getComments,
  deleteComment,
} from "../controller/comment-controller.js";
import { authenticateToken } from "../controller/jwt-controller.js";
import upload from "../utils/upload.js";
import { uploadImage, getImage } from "../controller/image-controller.js";

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
router.get("/users", getAllUsers);
router.delete("/user/delete/:id", deleteUser);

router.put("/user/admin/:id", updateIsAdmin);
router.get("/unapprovedposts", getAllUnapprovedPosts);
router.patch("/approve-post/:id", approvePost);
router.post("/file/upload", upload.single("file"), uploadImage);
router.get("/file/:filename", getImage);
export default router;
