import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: true,
        min: 1,
        max: 150
    },
    income: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        required: true,
        enum: ['General', 'SC', 'ST', 'OBC', 'Minority']
    },
    location: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: ['Male', 'Female', 'Other']
    },
    occupation: {
        type: String,
        required: true
    }
}, { timestamps: true });

export default mongoose.model("Profile", profileSchema);