const express = require('express')
const router = express.Router()

const {createcontact,getContacts,getAContact,deleteContact,updateContact} = require('../controllers/contactController')

router.post('/new',createcontact)
router.get('/',getContacts)
router.get('/:id',getAContact)
router.delete('/delete/:id',deleteContact)
router.patch('/update/:id',updateContact)

module.exports = router