const contacts = require("../models/contacts");
const {HttpError, ctrlWrapper} = require("../helpers");

const getAll = async (req, res) => {
	const result = await contacts.listContacts();
	res.json(result);
};

const getById = async (req, res) => {
	const {contactId} = req.params;
	const result = await contacts.getContactById(contactId);
	if (!result) {
		throw HttpError(404, "Not Found");
	}
	res.json(result);
};

const Add = async (req, res) => {
	const result = await contacts.addContact(req.body);
	res.status(201).json(result);
};

const removeById = async (req, res) => {
	const {contactId} = req.params;
	const result = await contacts.removeContact(contactId);

	if (!result) {
		throw HttpError(404, "Not found");
	}
	res.status(200).json({message: "contact deleted"});
};

const updateById = async (req, res) => {
	const {contactId} = req.params;

	const result = await contacts.updateContact(contactId, req.body);
	if (!result) {
		throw HttpError(404, "Not found");
	}
	res.json(result);
};

module.exports = {
	getAll: ctrlWrapper(getAll),
	getById: ctrlWrapper(getById),
	Add: ctrlWrapper(Add),
	removeById: ctrlWrapper(removeById),
	updateById: ctrlWrapper(updateById),
};
