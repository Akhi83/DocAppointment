const express = require('express')
const router = express.Router()
const Patient = require('./../models/patient')
const {jwtAuthMiddleware,generateToken,blacklist} = require('./../jwt')





router.post('/signup',async(req,res)=>{
    try 
    {
            const data = req.body 
            const newPatient = new Patient(data) 
            const response = await newPatient.save()
            console.log('Data saved')
            const payload = {
                id:response._id,
                username : response.username,
                email : response.email
            }
            const token = generateToken(payload) 
            console.log('Token is : ',token)
            res.status(200).json({response:response,token:token})
    }
    catch (error)
    {
        console.log(error)
        res.status(500).json({error:'Internal Server Error'})
    } 
})








router.post('/login',async(req,res) => {
    
    try {
                const {email,password} = req.body
                const patient = await Patient.findOne({email:email})
                if (!patient){
                    return res.status(401).json({ error: 'Invalid username or password' });
                }
                const isMatch = await patient.comparePassword(password);
                if (!isMatch) {
                    return res.status(401).json({ error: 'Invalid username or password' });
                }
                const payload = {
                    id : patient._id,
                    username : patient.username,
                    email : patient.email
                }
                const token = generateToken(payload)
                
                res.json({token})
                console.log('Logged in')
                console.log(token)

    } catch (error) {
         console.log(error)
         res.status(500).json({error:'Internal server error'})
    }
})








router.post('/logout', jwtAuthMiddleware, (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    blacklist.push(token);  
    res.status(200).json({ message: 'Logged out successfully' });
    console.log('logged out tokens: ',blacklist)
});







router.get('/',jwtAuthMiddleware,async(req,res) => {
    try {
        const data = await Patient.find()
        console.log('Data fetched')
        res.status(200).json(data)
    } catch (error) {
        console.log(error)
        res.status(500).json({error:'Internal Server Error'})
    }
})












// code to update a patient record
router.put('/:patient_id',jwtAuthMiddleware,async (req,res) => {
    try {
            const patient_Id = req.params.patient_id 
            const updatedPatientData = req.body 

            const response = await Patient.findByIdAndUpdate(patient_Id,updatedPatientData,{
                new : true, 
                runValidators : true 
            })

            if(!response){
                return res.status(404).json({error:'Patient not found'})
            }

            console.log('Data Updated')
            res.status(200).json(response)
    } catch (error) {
            console.log(error)
            res.status(500).json({error:'Internal Server Error'})
    }
})














// code to delete a patient record
router.delete('/:patient_id',jwtAuthMiddleware,async (req,res) => {
    try {
        const patient_Id = req.params.patient_id
        const response = await Patient.findByIdAndDelete(patient_Id)

        if(!response){
            return res.status(404).json({error:'Patient not found'})
        }

        console.log('Data Deleted')
        res.status(200).json({message:'Person deleted successfully'})


    } catch (error) {
        console.log(error)
        res.status(500).json({error:'Internal Server Error'})
    }
})







router.get('/profile',jwtAuthMiddleware, async (req,res) =>{
    try {
            const patientData = req.user
            console.log('Patient data : ',patientData)
            const patientId  = req.user.id
            const patient = await Patient.findById(patientId)
            res.status(200).json(patient)
    } catch (error) {
            console.log(error)
            res.status(500).json({error:'Internal Server Error'})
    }
})



module.exports = router