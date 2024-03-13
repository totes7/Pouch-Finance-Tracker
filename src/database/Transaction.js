import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  username: { type: String, required: true, index: { unique: true } },
  transactionType: { type: String },
  amount: { type: Number },
  date: { type: Date, immutable: true, default: () => Date.now() },
});

module.exports = mongoose.model("Transaction", transactionSchema);
