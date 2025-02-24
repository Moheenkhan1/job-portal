const mongoose = require("mongoose");

const RecruiterSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
},
  companyName: { 
    type: String, 
    required: true 
},
  companyWebsite: { 
    type: String 
},
  phone: { 
    type: String, 
    required: true 
},
  postedJobs: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Job" 
}], 
  createdAt: { 
    type: Date, 
    default: Date.now 
},
});

module.exports = mongoose.model("Recruiter", RecruiterSchema);
