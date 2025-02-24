const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
},
  permissions: {
    manageUsers: { 
        type: Boolean, 
        default: true 
    },
    manageJobs: { 
        type: Boolean, 
        default: true 
    },
    manageApplications: { 
        type: Boolean, 
        default: true 
    },
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
},
});

module.exports = mongoose.model("Admin", AdminSchema);
