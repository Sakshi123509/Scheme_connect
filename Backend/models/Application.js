import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    scheme: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Scheme',
        required: true
    },
    status: {
        type: String,
        enum: ['Saved', 'Applied', 'Under Review', 'Approved', 'Rejected'],
        default: 'Saved'
    },
    appliedDate: {
        type: Date,
        default: Date.now
    },
    notes: String
}, { timestamps: true });

export default mongoose.model("Application", applicationSchema);