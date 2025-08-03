import mongoose from "mongoose";

const ResturantSchema = new mongoose.Schema({
  username: String,
  email: String,
  address: String,
  city: String,
  contact: String,
  password: String,
});

export const ResturantModel =
  mongoose.models.resturant || mongoose.model("resturant", ResturantSchema);
