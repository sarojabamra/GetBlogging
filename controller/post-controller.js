import Post from "../model/post.js";

export const createPost = async (request, response) => {
  try {
    const post = new Post(request.body);
    await post.save();
    return response.status(201).json({ message: "Post saved successfully" });
  } catch (error) {
    if (error.name === "ValidationError") {
      return response
        .status(400)
        .json({ message: error.message, errors: error.errors });
    }
    return response
      .status(500)
      .json({ message: "Internal server error", error });
  }
};

export const getAllPosts = async (request, response) => {
  try {
    let posts = await Post.find({});

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
