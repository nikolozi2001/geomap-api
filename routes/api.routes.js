const express = require("express");
const router = express.Router();
const regBrunvaController = require("../controllers/regBrunva.controller");
const payGenderController = require("../controllers/payGender.controller");

router.get("/getRegBrunva", regBrunvaController.getRegBrunva);
router.get("/getPayGender", payGenderController.getPayGender);

module.exports = router;
