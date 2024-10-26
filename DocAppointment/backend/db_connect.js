const mongoose = require('mongoose')
const mongoURL = 'mongodb://localhost:27017/Doctor_Appointment_System'

mongoose.connect(mongoURL,{
    useNewURLParser:true,
    useUnifiedTopology:true
})

const db = mongoose.connection

db.on('connected',() => {
    console.log('Connected to Mongodb server');    
})

db.on('disconnected',function(){
    console.log('Mongodb Disconnected');
})

db.on('error',function(err){
    console.log('Mongodb Connection Error: ',err);
})

module.exports = db