// import mongoose from "mongoose";
import mongoose, { Document, Schema, model } from "mongoose";

// export interface user extends Document {
//   username: string;
//   password: string;
//   password2: string;
//   role: Role;
// }

const blogSchema: Schema = new Schema(
  {
    username: {
      type: String,
    },
    caption: {
      type: String,
    },
    image: {
      data: Buffer,
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
