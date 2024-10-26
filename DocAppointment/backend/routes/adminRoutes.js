const express = require('express')
const router = express.Router()
const admin = require('./../models/admin')
const {jwtAuthMiddleware,generateTokenAdmin,blacklist} = require('./../jwt')






router.post('/signup',async(req,res)=>{
    try 
    {
            const data = req.body 
            const newAdmin = new admin(data) 
            const response = await newAdmin.save()
            console.log('Data saved')
            const payload = {
                id:response._id,
                username : response.username,
                email : response.email
            }
            const token = generateTokenAdmin(payload) 
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
                const adminLogin = await admin.findOne({email:email})
                if (!adminLogin){
                    return res.status(401).json({ error: 'Invalid username or password' });
                }
                const isMatch = await adminLogin.comparePassword(password);
                if (!isMatch) {
                    return res.status(401).json({ error: 'Invalid username or password' });
                }
                const payload = {
                    id : adminLogin._id,
                    username : adminLogin.username,
                    email : adminLogin.email
                }
                const token = generateTokenAdmin(payload)
                
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
        const data = await admin.find()
        console.log('Data fetched')
        res.status(200).json(data)
    } catch (error) {
        console.log(error)
        res.status(500).json({error:'Internal Server Error'})
    }
})












// code to update a patient record
router.put('/:admin_id',jwtAuthMiddleware,async (req,res) => {
    try {
            const admin_Id = req.params.admin_id 
            const updatedAdminData = req.body 

            const response = await Patient.findByIdAndUpdate(admin_Id,updatedAdminData,{
                new : true, 
                runValidators : true 
            })

            if(!response){
                return res.status(404).json({error:'Admin not found'})
            }

            console.log('Data Updated')
            res.status(200).json(response)
    } catch (error) {
            console.log(error)
            res.status(500).json({error:'Internal Server Error'})
    }
})














// code to delete a patient record
router.delete('/:admin_id',jwtAuthMiddleware,async (req,res) => {
    try {
        const admin_Id = req.params.admin_id
        const response = await Patient.findByIdAndDelete(admin_Id)

        if(!response){
            return res.status(404).json({error:'Admin not found'})
        }

        console.log('Data Deleted')
        res.status(200).json({message:'Admin deleted successfully'})


    } catch (error) {
        console.log(error)
        res.status(500).json({error:'Internal Server Error'})
    }
})







router.get('/profile',jwtAuthMiddleware, async (req,res) =>{
    try {
            const adminData = req.user
            console.log('Admin data : ',adminData)
            const admin_Id  = req.user.id
            const admin = await Patient.findById(admin_Id)
            res.status(200).json(admin)
    } catch (error) {
            console.log(error)
            res.status(500).json({error:'Internal Server Error'})
    }
})



module.exports = router