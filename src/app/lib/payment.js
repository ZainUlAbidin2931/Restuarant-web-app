const { default: mongoose } = require("mongoose");

const paymentschema= new mongoose.Schema({
    user_id: mongoose.Schema.Types.ObjectId,
    resto_id: mongoose.Schema.Types.ObjectId,
    amount: String,
    fooditemsid:[mongoose.Schema.Types.ObjectId],
    acc_no: String,
    pin: String,
})

export const paymentmodel = mongoose.models.payment || mongoose.model('payment', paymentschema)