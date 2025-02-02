const express = require("express");
const router = express.Router();
const regBrunvaController = require("../controllers/regBrunva.controller");
const payGenderController = require("../controllers/payGender.controller");
const valAddedController = require("../controllers/valAdded.controller");
const munBrunvaController = require("../controllers/munBrunva.controller");

router.get("/getRegBrunva", regBrunvaController.getRegBrunva);
router.get("/getPayGender", payGenderController.getPayGender);
router.get("/getValAdded", valAddedController.getValAdded);
router.get("/getMunBrunva", munBrunvaController.getMunBrunva);

module.exports = router;
