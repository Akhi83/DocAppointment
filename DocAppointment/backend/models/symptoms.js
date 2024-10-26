const mongoose = require("mongoose");

const symptomsSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "patient",
    required: true,
  },
  symptoms:{
    type:String,
    require:true
  }
});

const symptoms = mongoose.model("symptoms", symptomsSchema);

module.exports = symptoms;
