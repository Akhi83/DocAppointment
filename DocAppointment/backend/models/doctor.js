const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const doctorSchema = new mongoose.Schema({
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
    specialization:{
        type:String,
        required:true
    },
    experience:{
        type:Number,
        default:0,
        required:true
    },
    available_days:{
        type:[String],
        default:[],
        required:true
    },
    available_time_slots:{
        type:[String],
        default:[],
        required:true
    },
    hospital:{
        type:String,
        required:true
    },
    ratings:{
        type:Number,
        default:0
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






doctorSchema.pre('save',async function (next) {
    const doctor = this

    if(!doctor.isModified('password')) return next()

    try {
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(doctor.password,salt)
            doctor.password = hashedPassword  

            next()
    } catch (error) {
        return next(error)
    }
})







doctorSchema.methods.comparePassword = async function (candidatePassword) {
    try {
            const isMatch = await bcrypt.compare(candidatePassword,this.password)
            return isMatch

    } catch (error) {
        
    }
}










const doctor = mongoose.model('doctor',doctorSchema)

module.exports = doctor