const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { 
    type: String,
    required: true 
},
  email: { 
    type: String, 
    required: true, 
    unique: true
 },
  password: { 
    type: String, 
    required: true 
},
  role: { 
    type: String, 
    enum: ["student", "recruiter", "admin"], 
    required: true 
},
  savedJobs: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Job" 
}],
  appliedJobs: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Job" 
}],
  createdAt: { 
    type: Date, 
    default: Date.now 
},
});

module.exports = mongoose.model("User", UserSchema);
