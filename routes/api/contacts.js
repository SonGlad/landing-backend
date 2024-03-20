const express = require('express');


const router = express.Router();
const {
    getAll, 
    getById, 
    addNewContact,
    externalContact, 
    updateById, 
    deleteById,
    updateNewContactById,
} = require("../../controllers/contacts/index");
const {validateBody, isValidId, authenticate} = require("../../middlewares/index");
const  { schemas }  = require("../../models/contact");


router.get('/', authenticate, getAll.getAll);

router.get('/:contactId', authenticate, isValidId, getById.getById);

router.post('/',authenticate, validateBody(
    schemas.addSchema), addNewContact.addNewContact);

router.post('/external',validateBody(
    schemas.addSchema), externalContact.externalContact);

router.patch('/:contactId',authenticate, isValidId, validateBody(
    schemas.updateSchema), updateById.updateById);

router.patch('/:contactId/newContact', authenticate, isValidId, validateBody(
    schemas.updateNewContactSchema), updateNewContactById.updateNewContactById);

router.delete("/:contactId",authenticate, isValidId, deleteById.deleteById);



module.exports = router;

