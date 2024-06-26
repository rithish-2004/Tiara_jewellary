const mongoose = require('mongoose');

// Check if the model is already defined
if (!mongoose.models.Chit) {
  // Define the Chit schema if not already defined
 
  const chitSchema = new mongoose.Schema({
    id:{
      type:Number,
      required:true,
      unique :true,
    },
    startingDate: { type: Date, default: null },
    ChitName: { type: String, default: null },
    GroupName: { type: String, default: null },
    DueType: { type: String, default: null },
    DueDays: { type: Number, default: null },
    TotalDues: { type: Number, default: null },
    DueAmount: { type: Number, default: null },
    IncentiveCutDays: { type: Number, default: null },
    IncentivePercentage: { type: Number, default: null },
    IncentiveAmt: { type: Number, default: null },
    ReceiptAC: { type: String, default: null },
    LateFeeAC: { type: String, default: null },
  }, {
    timestamps: true,
    minimize: false, // This prevents mongoose from removing empty objects
    setDefaultsOnInsert: true,
  });

  // Define the Chit model
  const Chit = mongoose.model('Chit', chitSchema);

  // Export the Chit model
  module.exports = Chit;
} else {
  // If the model is already defined, export it directly
  module.exports = mongoose.models.Chit;
}
