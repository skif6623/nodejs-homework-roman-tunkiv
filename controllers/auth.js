const bcrypt = require("bcrypt");

const {User} = require("../models/user");

const {HttpError, ctrlWrapper} = require("../helpers");

const register = async (req, res) => {
	const {email, password} = req.body;
	const user = await User.findOne({email});

	if (user) {
		throw HttpError(409, "Email alredy in use");
	}

	const hashPassword = await bcrypt.hash(password, 10);

	const newUser = await User.create({...req.body, password: hashPassword});

	res.json({
		email: newUser.email,
	});
};

const login = async (req, res) => {
	const {email, password} = req.body;
	const user = await User.findOne({email});

	if (!user) {
		throw HttpError(401, "Email or password invalid");
	}

	const comparePassword = await bcrypt.compare(password, user.password);

	if (!comparePassword) {
		throw HttpError(401, "Email or password invalid");
	}

	const token = "sldjkflskjdfkskldf.sdfjsdklfjlsdjfsldf.sldfjskdjfljsldkfj";

	res.json({
		token,
	});
};

module.exports = {
	register: ctrlWrapper(register),
	login: ctrlWrapper(login),
};
