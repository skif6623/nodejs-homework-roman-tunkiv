const {Schema, model, SchemaTypes} = require("mongoose");

const Joi = require("joi");

const {handleMongooseError} = require("../helpers");

const contactSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, "Set name for contact"],
		},
		email: {
			type: String,
		},
		phone: {
			type: String,
		},
		favorite: {
			type: Boolean,
			default: false,
		},
		owner: {
			type: SchemaTypes.ObjectId,
			ref: "user",
		},
	},
	{versionKey: false, timestamps: true},
);

contactSchema.post("save", handleMongooseError);

const addSchema = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().required(),
	phone: Joi.string().required(),
	favorite: Joi.boolean(),
});

const toogleFavorite = Joi.object({
	favorite: Joi.boolean().required(),
});

const schemas = {
	addSchema,
	toogleFavorite,
};

const Contact = model("contact", contactSchema);

module.exports = {
	Contact,
	schemas,
};
