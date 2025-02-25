const mongoose = require("mongoose");

const ApplicationSchema = new mongoose.Schema({
  job: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Job", 
    required: true 
},
  student: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
},
  recruiter: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
},
  resumeLink: { 
    type: String, 
    required: true 
},
  status: {
    type: String,
    enum: ["pending", "reviewed", "accepted", "rejected"],
    default: "pending",
  },
  appliedAt: { 
    type: Date, 
    default: Date.now 
},
});

module.exports = mongoose.model("Application", ApplicationSchema);
