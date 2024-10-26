const mongoose = require("mongoose");

const appointSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "patient",
    required: true,
  },
  doctorID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "doctor",
    required: true,
  },
  time_slot: {
    type: String,
    required: true,
  },
  appointment_date: {
    type: Date,
    required: true,
  },
  status: {
    enum: ["scheduled", "completed", "cancelled"],
  },
});

const appointment = mongoose.model("appointment", appointSchema);

module.exports = appointment;
