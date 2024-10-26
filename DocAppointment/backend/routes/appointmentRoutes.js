const express = require("express");
const router = express.Router();
const Appointment = require("./../models/appointments");
const Doctor = require("./../models/doctor");
const Patient = require("./../models/patient");
const { jwtAuthMiddleware } = require("./../jwt");






router.post("/book", jwtAuthMiddleware, async (req, res) => {
  try {
    const { time_slot, appointment_date, doctorEmail } = req.body;

    // Extract patient ID from the JWT token
    const patientId = req.user.id;

    // Find doctor by email
    const doctor = await Doctor.findOne({ email: doctorEmail });
    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    // Find patient by ID
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    // Create the appointment
    const newAppointment = new Appointment({
      patientId,
      doctorID: doctor._id,
      time_slot,
      appointment_date,
      status: "scheduled",
    });

    // Save the appointment to the database
    const savedAppointment = await newAppointment.save();

    // Print patient name and doctor name in console
    console.log(`Patient: ${patient.name}, Doctor: ${doctor.name}`);

    // Return the appointment details along with patient and doctor names
    res.status(200).json({
      appointment: savedAppointment,
      patientName: patient.name,
      doctorName: doctor.name,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});







// code to fetch all appointments for the specific logged in patient only
router.get('/patientappointments', jwtAuthMiddleware, async (req, res) => {
  try {
      const patientId = req.user.id;  // Get the patient ID from JWT token

      const appointments = await Appointment.find({ patientId }).populate('doctorID', 'name email');
      if(appointments.length == 0 ){
        res.status(404).json({message:'No appoints found!'})
        console.log('No appointments found')
        return
      }else{

        res.status(200).json(appointments);
      }
  } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});








// code to fetch all appointments for the specific logged in doctor only
router.get('/doctorappointments', jwtAuthMiddleware, async (req, res) => {
  try {
      const doctorEmail = req.user.email;  // Get the doctor email from JWT token
      const doctor = await Doctor.findOne({ email: doctorEmail });

      if (!doctor) {
        return res.status(404).json({ message: "Doctor not found" });
    }

      const appointments = await Appointment.find({ doctorID: doctor._id }).populate('patientId', 'name email');

      if(appointments.length == 0){
        res.status(404).json({message:"No appointments found"})
        return
      }

      res.status(200).json(appointments);
  } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});







router.put('/:appointment_id/cancel', jwtAuthMiddleware, async (req, res) => {
  try {
      const appointmentId = req.params.appointment_id;

      const appointment = await Appointment.findByIdAndUpdate(
          appointmentId,
          { status: 'cancelled' },
          { new: true }
      );

      if (!appointment) {
          return res.status(404).json({ error: 'Appointment not found' });
      }

      res.status(200).json({ message: 'Appointment cancelled successfully', appointment });
  } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});







module.exports = router;


















// const express = require('express');
// const router = express.Router();
// const Appointment = require('./../models/appointments');
// const Doctor = require('../models/doctor');
// const jwtAuthMiddleware = require('../jwt').jwtAuthMiddleware;

// // Booking an appointment
// router.post('/book', jwtAuthMiddleware, async (req, res) => {
//     try {
//         // Extracting user (patient) information from the JWT token
//         const patientId = req.user.id;

//         // Extracting doctor's email from the request body
//         const { doctorEmail, time_slot, appointment_date } = req.body;

//         // Find doctor by email
//         const doctor = await Doctor.findOne({ email: doctorEmail });
//         if (!doctor) {
//             return res.status(404).json({ error: 'Doctor not found' });
//         }

//         // Create a new appointment
//         const newAppointment = new Appointment({
//             patientId,
//             doctorID: doctor._id,
//             time_slot,
//             appointment_date,
//             status: 'scheduled'  // default status
//         });

//         // Save the appointment to the database
//         const response = await newAppointment.save();

//         console.log('Appointment booked:', response);
//         res.status(200).json(response);

//     } catch (error) {
//         console.error('Error booking appointment:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// module.exports = router;
