import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const connectdb = async () => {
    try {
        const mongoURL = process.env.MONGO_URI || 'mongodb://localhost:27017/schemesathi';
        await mongoose.connect(mongoURL);
        console.log("Connected to mongodb")
    } catch (err) {
        console.log('mongoDB connection error: ', err);
    }
}

export default connectdb;
