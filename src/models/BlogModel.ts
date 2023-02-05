import mongoose, { Document, Schema, model } from "mongoose";

const blogSchema: Schema = new Schema(
  {
    username: {
      type: String,
    },
    caption: {
      type: String,
    },
    image: {
      type: String,
    },
    komen: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const BlogModel = mongoose.model("blog", blogSchema);
