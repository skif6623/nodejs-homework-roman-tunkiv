const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/contactsCtrls");

const {schemas} = require("../../models/contact");

const {validateBody, isValidId} = require("../../middlewares");

router.get("/", ctrl.getAll);
router.get("/:contactId", isValidId, ctrl.getById);
router.post("/", validateBody(schemas.addSchema), ctrl.Add);
router.delete("/:contactId", isValidId, ctrl.removeById);
router.put("/:contactId", isValidId, validateBody(schemas.addSchema), ctrl.updateById);
router.patch("/:contactId/favorite", isValidId, validateBody(schemas.toogleFavorite), ctrl.updateStatusContact);

module.exports = router;
