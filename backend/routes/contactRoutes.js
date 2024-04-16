const express = require('express')
const router = express.Router()
const {auth} = require('../middleware/middleware')
const {createcontact,getContacts,getAContact,deleteContact,updateContact} = require('../controllers/contactController')

router.post('/new',auth,createcontact)
router.get('/',auth,getContacts)
router.get('/:id',auth,getAContact)
router.delete('/delete/:id',auth,deleteContact)
router.patch('/update/:id',auth,updateContact)

module.exports = router