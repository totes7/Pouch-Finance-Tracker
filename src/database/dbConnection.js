import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://pouch-admin:Q3vCgSH4083yE0pl@cluster1.29xedog.mongodb.net/"
    );
  } catch (err) {
    console.log(err);
  }
};

connectDB();

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
});
