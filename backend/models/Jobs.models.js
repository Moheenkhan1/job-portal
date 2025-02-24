const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
},
  company: { 
    type: String, 
    required: true 
},
  location: { 
    type: String, 
    required: true 
},
  description: { 
    type: String, 
    required: true 
},
  requirements: [{
    type: String
}],
  salaryRange: { 
    type: String 
},
  recruiter: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Recruiter", 
    required: true 
},
  applicants: [{
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User" 
}], 
  createdAt: { 
    type: Date, 
    default: Date.now 
},
});

module.exports = mongoose.model("Job", JobSchema);
