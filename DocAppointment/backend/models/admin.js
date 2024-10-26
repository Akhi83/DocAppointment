const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const adminSchema = new mongoose.Schema({
    name:{
        type:String,
        required :true
    },
    email:{
        type:String,
        require:true,
        unique:true
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






adminSchema.pre('save',async function (next) {
    const admin = this

    if(!admin.isModified('password')) return next()

    try {
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(admin.password,salt)
            admin.password = hashedPassword  

            next()
    } catch (error) {
        return next(error)
    }
})







adminSchema.methods.comparePassword = async function (candidatePassword) {
    try {
            const isMatch = await bcrypt.compare(candidatePassword,this.password)
            return isMatch

    } catch (error) {
        
    }
}










const admin = mongoose.model('admin',adminSchema)

module.exports = admin