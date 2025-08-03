import mongoose from "mongoose"
// const {username, password} = env.local
export const connectionStr = "mongodb+srv://i220990:1234@cluster0.pifv89v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

export async function dbConnect() {
    if(mongoose.connections[0].readyState) return;
    await mongoose.connect(connectionStr);
}