const jwt = require('jsonwebtoken')


const blacklist = [];


const jwtAuthMiddleware = (req,res,next) => {
    const authorization = req.headers.authorization
    if(!authorization) return res.status(401).json({error:'Token not found'})

    const token = req.headers.authorization.split(' ')[1]
    if(!token) return res.status(401).json({error:'Unauthorized'})
    
    if (blacklist.includes(token)) {
        return res.status(401).json({ error: 'Invalid token' });
    }
    
    try {
            const decoded = jwt.verify(token,process.env.JWT_SECRET) 
            req.user = decoded  // you can write here as req.userPayload too. req.patient is just to understand
            next()
    } catch (error) {
            console.log(error)
            res.status(401).json({error:'Invalid Token'})
    }
}









const generateToken = (patientData) => { 
    return jwt.sign({ id:patientData.id,username: patientData.username,email:patientData.email }, process.env.JWT_SECRET,{ expiresIn: 120 });
}

const generateTokenDoctor = (doctorData) => { 
    return jwt.sign({ id:doctorData.id,username: doctorData.username ,email:doctorData.email}, process.env.JWT_SECRET,{ expiresIn: 120 });
}
const generateTokenAdmin = (adminData) => { 
    return jwt.sign({ id:adminData.id,username: adminData.username ,email:adminData.email}, process.env.JWT_SECRET,{ expiresIn: 120 });
}

module.exports = {jwtAuthMiddleware,generateToken,generateTokenDoctor,generateTokenAdmin,blacklist}