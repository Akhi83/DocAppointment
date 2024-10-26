require('dotenv').config()

const cors = require('cors')
const express = require('express')
const app = express() 
const db = require('./db_connect')
const bodyParser = require('body-parser')
const port = 3000



app.use(cors({
    origin: 'http://localhost:3001', // Allow requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify the allowed methods
    credentials: true // Allow cookies if needed
}));

app.use(bodyParser.json())

const logRequest = (req,res,next) => {
    console.log(`[${new Date().toLocaleString()}] Request made to ${req.originalUrl}`)
    next()  // Move on to the next phase. It is compulsory to write this line
}
app.use(logRequest)




const patientRoutes = require('./routes/patientRoutes')
const doctorRoutes = require('./routes/doctorRoutes')
const appointmentRoutes = require('./routes/appointmentRoutes')
const symptomRoutes = require('./routes/symptomRoutes');
const adminRoutes = require('./routes/adminRoutes');
app.use('/patient',patientRoutes)
app.use('/doctor',doctorRoutes)
app.use('/appointment',appointmentRoutes)
app.use('/symptom', symptomRoutes)
app.use('/admin', adminRoutes)

app.listen(port,()=>{
    console.log(`Server is alive and listening on ${port}`) 
}) 

