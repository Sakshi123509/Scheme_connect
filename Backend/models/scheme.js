import mongoose from "mongoose";

const schemeSchema = new mongoose.Schema(
{
  name: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  category: {
    type: String
  },

  state: {
    type: String
  },

 eligibility: {
    type: [String],
    default: []
  },

  link: {
    type: String
  }
},
{ timestamps: true }
);

export default mongoose.model("Scheme", schemeSchema);