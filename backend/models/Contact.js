const mongoose = require('mongoose')
const User = require('./User')

const contactSchema = new mongoose.Schema({

    fullName:{
        type:String,
        required:true,

    },

    contactNumber:{
        type:String,
        required:true

    },

    email:{

        type:String,
        required:true,

    },

    gender:{

        type:String,
        required:true,
        enum:['Male','Female']

    },

    User:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User

    }


})


module.exports = mongoose.model('Contacts',contactSchema)