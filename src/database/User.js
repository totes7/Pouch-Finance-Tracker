import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  cardNumber: { type: String },
  balance: { type: Number },
  savings: { type: Number },
  createdOn: { type: Date, immutable: true, default: () => Date.now() },
  updatedOn: { type: Date, default: () => Date.now() },
});

module.exports = mongoose.model("User", userSchema);
