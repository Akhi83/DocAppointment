const express = require("express");
const router = express.Router();
const Symptom = require("./../models/symptoms");
const { jwtAuthMiddleware } = require("./../jwt");






// Add new symptoms for a patient
router.post("/add", jwtAuthMiddleware, async (req, res) => {
    try {
        const patientId = req.user.id; // Get patient ID from the JWT token
        const { symptoms } = req.body;

        if (!symptoms) {
            return res.status(400).json({ error: "Symptoms are required" });
        }

        const newSymptom = new Symptom({
            patientId,
            symptoms,
        });

        await newSymptom.save();
        res.status(201).json({ message: "Symptoms added successfully", newSymptom });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});






// Get symptoms for the logged-in patient
router.get("/", jwtAuthMiddleware, async (req, res) => {
    try {
        const patientId = req.user.id; // Get patient ID from JWT token
        const symptoms = await Symptom.find({ patientId });

        if (!symptoms || symptoms.length === 0) {
            return res.status(404).json({ message: "No symptoms found for this patient" });
        }

        res.status(200).json(symptoms);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});







// Update symptoms for a patient
router.put("/update/:symptomId", jwtAuthMiddleware, async (req, res) => {
    try {
        const { symptomId } = req.params;
        const { symptoms } = req.body;

        if (!symptoms) {
            return res.status(400).json({ error: "Symptoms are required" });
        }

        const updatedSymptom = await Symptom.findByIdAndUpdate(symptomId, { symptoms }, { new: true });

        if (!updatedSymptom) {
            return res.status(404).json({ message: "Symptom not found" });
        }

        res.status(200).json({ message: "Symptoms updated successfully", updatedSymptom });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});









// Delete symptoms for a patient
router.delete("/delete/:symptomId", jwtAuthMiddleware, async (req, res) => {
    try {
        const { symptomId } = req.params;

        const deletedSymptom = await Symptom.findByIdAndDelete(symptomId);

        if (!deletedSymptom) {
            return res.status(404).json({ message: "Symptom not found" });
        }

        res.status(200).json({ message: "Symptoms deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


module.exports = router;
