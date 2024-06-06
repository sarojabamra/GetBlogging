import Post from "../model/post.js";
import mongoose from "mongoose";

export const createPost = async (request, response) => {
  try {
    const post = await new Post(request.body);
    post.save();

    response.status(200).json("Post saved successfully");
  } catch (error) {
    response.status(500).json(error);
  }
};

export const getAllPosts = async (request, response) => {
  try {
    let posts = await Post.find();

    return response.status(200).json(posts);
  } catch (error) {
    return response.status(500).json({ msg: error.message });
  }
};

export const getAllUnapprovedPosts = async (request, response) => {
  try {
    // Filter posts by isApproved: false
    let posts = await Post.find({ isApproved: false });

    return response.status(200).json(posts);
  } catch (error) {
    return response.status(500).json({ msg: error.message });
  }
};

export const getPost = async (request, response) => {
  //console.log(request.path);
  try {
    const post = await Post.findById(request.params.id);
    return response.status(200).json(post);
  } catch (error) {
    return response.status(500).json({ msg: "error" });
  }
};

export const updatePost = async (request, response) => {
  try {
    const post = await Post.findById(request.params.id);
    if (!post) {
      return response.status(400).json({ msg: "Post not found." });
    }
    await Post.findByIdAndUpdate(request.params.id, { $set: request.body });

    return response.status(200).json({ msg: "Post updated Successfully." });
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
};

export const deletePost = async (request, response) => {
  try {
    const post = await Post.findById(request.params.id);
    if (!post) {
      return response.status(404).json({ msg: "Post not found." });
    }

    await Post.findByIdAndDelete(request.params.id);

    return response.status(200).json({ msg: "Post deleted successfully." });
  } catch (error) {
    console.log(Post.findById(request.params.id));
    return response.status(500).json({ error: error.message });
  }
};

export const approvePost = async (req, res) => {
  console.log("aprrovePost function was called with postId:", req.params.id);
  try {
    const data = req.params.id;
    const { postId } = JSON.parse(data);
    //console.log(userId);

    const objectId = new mongoose.Types.ObjectId(postId);
    //console.log(objectId);

    const updatedPost = await Post.findByIdAndUpdate(
      objectId,
      { isApproved: true },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ msg: "Post not found" });
    }

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
