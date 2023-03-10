import mongoose, { Document, Schema, model } from "mongoose";
import { Role } from "../roles/roles";

export interface user extends Document {
  username: string;
  password: string;
  password2: string;
  role: Role;
}

const userSchema: Schema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    password2: {
      type: String,
      required: true,
    },
    role: { type: String, required: true, enum: Object.values(Role) },
  },

  {
    timestamps: true,
  }
);

export const UserModel = model<user>("user", userSchema);
