import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  postId: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  postComment: {
    type: String,
    required: true,
  },
});

const comment = mongoose.model("comment", commentSchema);

export default comment;
