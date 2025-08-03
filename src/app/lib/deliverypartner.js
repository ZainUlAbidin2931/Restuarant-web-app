const { default: mongoose } = require("mongoose");

const deliverypartnerschema = new mongoose.Schema({
username: String,
address: String,
city: String,
contact: String,
password: String
})

export const deliverypartnermodel= mongoose.models.deliverypartner || mongoose.model('deliverypartner',deliverypartnerschema)