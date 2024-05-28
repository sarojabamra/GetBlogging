import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  tags: [
    {
      type: String,
    },
  ],

  createdDate: {
    type: Date,
    required: true,
  },
});

const post = mongoose.model("post", postSchema);

export default post;
