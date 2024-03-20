const getAll = require("./getAll");
const getById = require("./getById");
const addNewContact = require("./addNewContact");
const externalContact = require("./externalContact")
const updateById = require("./updateById");
const deleteById = require("./deleteById");
const updateNewContactById = require("./updateNewContactById")


module.exports = {
    getAll,
    getById,
    addNewContact,
    externalContact,
    updateById,
    deleteById,
    updateNewContactById,
};