const validator = require('validator')
const Contact = require('../models/Contact')
const User = require('../models/User')


const createcontact = async (req,res) =>{

    const {fullName,contactNumber,email,gender} = req.body

    if(!fullName||!contactNumber||!email||!gender){
        return res.status(404).json({msg:"Fill all fields"})
    }

    if(!validator.isEmail(email)){
        return res.status(500).json({msg:"Enter valid email"})
    }

    try{

    const contact = await Contact.create({fullName,contactNumber,email,gender})
    res.status(200).json({msg:"Contact created succesfully"})

    }catch(error){

        console.log(error)
        res.status(500).json({msg:"Error creating contact"})
    }





}


const getContacts = async (req,res) =>{

    try{

        const contacts = await Contact.find()
        res.status(200).json(contacts)


    }catch(error){


        console.log(error)
        res.status(500).json({msg:"Error fetching contacts"})


    }


}


const getAContact = async(req,res) =>{

    const contactID = req.params.id

    try{

        const contact = await Contact.findById(contactID)

        if(!contact){
            return res.status(404).json({msg:"Could not find contact"})
        }

        res.status(200).json(contact)

    }catch(error){

        console.log(error)
        res.status(500).json({msg:"Error fetching the contact"})

    }


}

const deleteContact = async(req,res)=>{

    const contactID = req.params.id

    try{

        const contact = await Contact.findById(contactID)

        if(!contact){
            return res.status(404).json({msg:"Could not find contact"})
        }

        await Contact.deleteOne(contact)
        res.status(200).json({msg:"Contact deleted Succefully"})


    }catch(error){

        console.log(error)
        res.status(500).json({msg:"Error fetching the contact"})


    }
}


const updateContact = async(req,res)=>{

    const contactID = req.params.id
    const {fullName,contactNumber,email,gender} = req.body

    if(!validator.isEmail(email)){
        return res.status(500).json({msg:"Enter valid email"})
    }

    try{



        const contact = await Contact.findById(contactID)

        if(!contact){
            return res.status(404).json({msg:"Could not find contact"})
        }

        await contact.updateOne({fullName,contactNumber,email,gender})
        res.status(200).json({msg:"Contact updated Succefully"})
        


    }catch(error){

        console.log(error)
        res.status(500).json({msg:"Error updating the contact"})


    }





}

module.exports ={createcontact,getContacts,getAContact,deleteContact,updateContact}
