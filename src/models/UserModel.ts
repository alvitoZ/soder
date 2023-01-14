// import mongoose from "mongoose";
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

// import mongoose from "mongoose";
// import mongoose, { Document, Schema, model } from "mongoose";
// import { Role } from "../roles/roles";

// const userSchema = new mongoose.Schema(
//   {
//     username: {
//       type: String,
//       required: true,
//     },
//     password: {
//       type: String,
//       required: true,
//     },
//     password2: {
//       type: String,
//       required: true,
//     },
//     role: { type: String, required: true, enum: Object.values(Role) },
//   },
//   {
//     timestamps: true,
//   }
// );

// export default mongoose.model("user", userSchema);
// export const UserModel = model<User>("User", UserSchema);
