import mongoose from "mongoose";

const orderSchema= new mongoose.Schema({
    user_id: mongoose.Schema.Types.ObjectId,
    resto_id: mongoose.Schema.Types.ObjectId,
    amount: String,
    fooditemsid:[mongoose.Schema.Types.ObjectId],
    status:String,
    address:String,
    deliveryboyid:String
});

export const orderModel = mongoose.models.order || mongoose.model("order", orderSchema)
