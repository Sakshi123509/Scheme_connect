import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config(); // ← ADD THIS

const connectdb = async () => {
    try {
        const mongoURL = process.env.MONGO_URI;
        console.log("MONGO_URI:", mongoURL ? "Found" : "NOT FOUND");
        await mongoose.connect(mongoURL);
        console.log("Connected to mongodb")
    } catch (err) {
        console.log('mongoDB connection error: ', err);
    }
}

export default connectdb;