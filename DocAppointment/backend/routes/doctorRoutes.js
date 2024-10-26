const express = require('express')
const router = express.Router()
const Doctor = require('./../models/doctor')
const {jwtAuthMiddleware,generateTokenDoctor,blacklist} = require('./../jwt')
const doctor = require('./../models/doctor')





router.post('/signup',async(req,res)=>{
    try 
    {
            const data = req.body 
            const newDoctor = new Doctor(data) 
            const response = await newDoctor.save()
            console.log('Data saved')
            const payload = {
                id:response._id,
                username : response.username,
                email:response.email
            }
            const token = generateTokenDoctor(payload) 
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
                const doctor = await Doctor.findOne({email:email})
                if (!doctor){
                    return res.status(401).json({ error: 'Invalid email or password' });
                }
                const isMatch = await doctor.comparePassword(password);
                if (!isMatch) {
                    return res.status(401).json({ error: 'Invalid email or password' });
                }
                const payload = {
                    id : doctor._id,
                    username : doctor.username,
                    email:doctor.email
                }
                const token = generateTokenDoctor(payload)
                console.log('Doctor Token:',token)
                
                res.json({token})

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
        const data = await Doctor.find()
        console.log('Data fetched')
        res.status(200).json(data)
    } catch (error) {
        console.log(error)
        res.status(500).json({error:'Internal Server Error'})
    }
})












// code to update doctor record
router.put('/:doctor_id',jwtAuthMiddleware,async (req,res) => {
    try {
            const doctor_Id = req.params.doctor_id 
            const updatedDoctorData = req.body 

            const response = await Doctor.findByIdAndUpdate(doctor_Id,updatedDoctorData,{
                new : true, 
                runValidators : true 
            })

            if(!response){
                return res.status(404).json({error:'Doctor not found'})
            }

            console.log('Data Updated')
            res.status(200).json(response)
    } catch (error) {
            console.log(error)
            res.status(500).json({error:'Internal Server Error'})
    }
})














// code to delete a doctor record
router.delete('/:doctor_id',jwtAuthMiddleware,async (req,res) => {
    try {
        const doctor_Id = req.params.doctor_id
        const response = await Doctor.findByIdAndDelete(doctor_Id)

        if(!response){
            return res.status(404).json({error:'Doctor not found'})
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
            const doctorData = req.user
            console.log('Doctor data : ',doctorData)
            const doctorId  = req.user.id
            const doctor = await Doctor.findById(doctorId)
            res.status(200).json(doctor)
    } catch (error) {
            console.log(error)
            res.status(500).json({error:'Internal Server Error'})
    }
})



module.exports = router