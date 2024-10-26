const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const patientSchema = new mongoose.Schema({
    name:{
        type:String,
        required :true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    mobile:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    gender:{
        type:String,
        enum:['male','female'],
        required:true
    },
    medicalHistory:{
        type:String
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})




patientSchema.pre('save',async function (next) {
    const patient = this

    if(!patient.isModified('password')) return next()

    try {
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(patient.password,salt)
            patient.password = hashedPassword  

            next()
    } catch (error) {
        return next(error)
    }
})







patientSchema.methods.comparePassword = async function (candidatePassword) {
    try {
            const isMatch = await bcrypt.compare(candidatePassword,this.password)
            return isMatch

    } catch (error) {
        
    }
}





const patient = mongoose.model('patient',patientSchema)

module.exports = patient