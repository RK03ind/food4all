import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: false },
  chats: { type: Array, required: false },
});
const User = mongoose.model("user", userSchema, "users");
export default User;
