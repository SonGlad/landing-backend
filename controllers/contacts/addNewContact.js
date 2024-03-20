const { Contact } = require("../../models/contact");
const { ctrlWrapper, HttpError } = require("../../helpers/index");


const addNewContact =  async (req, res) => {
    const {_id: owner} = req.user;
    const { ...contactData } = req.body;

    const existingContact = await Contact.findOne({ ...contactData });

    if (existingContact) {
        throw HttpError(400, "Contact already exists" );
    }

    const result = await Contact.create({ ...contactData, owner});

    res.status(201).send(result);
};


module.exports = {
    addNewContact: ctrlWrapper(addNewContact)
};


