const { default: mongoose } = require("mongoose");

const UsersignupSchema = new mongoose.Schema({
    username: String,
    email: String,
    address: String,
    city: String,
    contact: String,
    password: String,
    c_password: String
})
export const usersignupmodel = mongoose.models.user || mongoose.model('user', UsersignupSchema)