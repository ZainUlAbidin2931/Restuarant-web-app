import mongoose from "mongoose";

const foodSchema= new mongoose.Schema({
    name: String,
    price: String,
    path: String,
    description: String,
    resto_id: mongoose.Schema.Types.ObjectId
});

export const foodModel = mongoose.models.addfooditems || mongoose.model("addfooditems", foodSchema)