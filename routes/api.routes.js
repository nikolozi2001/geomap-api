const express = require("express");
const router = express.Router();
const regBrunvaController = require("../controllers/regBrunva.controller");
const payGenderController = require("../controllers/payGender.controller");
const valAddedController = require("../controllers/valAdded.controller");

router.get("/getRegBrunva", regBrunvaController.getRegBrunva);
router.get("/getPayGender", payGenderController.getPayGender);
router.get("/valAdded", valAddedController.valAdded);

module.exports = router;
