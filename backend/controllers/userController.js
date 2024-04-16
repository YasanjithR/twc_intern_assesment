const User = require('../models/User')
const validator = require('validator')
const bcrypt =require('bcrypt')
const jwt = require('jsonwebtoken')

const createToken = (user) =>{

    const payload = {
        _id:user._id,
        email:user.email,
    }

    return jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:'3d'})

}


const signup= async(req,res)=>{

    const{email,password} = req.body

    if(!email||!password){

        return res.status(500).json({msg:"Fll all fields"})

    }

    if(!validator.isEmail(email)){
        return res.status(500).json({msg:"Invalid email"})
    }

    const exists = await User.findOne({email})

    if(exists){
        return res.status(500).json({msg:"User already exists"})
    }

   const user= await User.create({email,password})
    const token = createToken(user)

    res.status(200).json({token,email})

}


const login = async(req,res)=>{

    const{email,password} = req.body
    
    
    if(!email||!password){

        return res.status(500).json({msg:"Fll all fields"})

    }

    if(!validator.isEmail(email)){
        return res.status(500).json({msg:"Invalid email"})
    }

    try{

        const user = await  User.findOne({email:email})

        if(!user){
            return res.status(404).json({msg:"User does not exists"})
        }

        if(user.password !=password){

            return res.status(500).json({msg:"Invalid password"})
        }

        const token = createToken(user)       
        res.status(200).json({token,email})
        res.status(200).json({msg:"Log in succesful"})




    }catch(error){

        console.log(error)
        res.status(500).json({msg:"Error loging in"})


    }

    



}



module.exports={signup,login}

