const express = require("express");
const router = express.Router();
const regBrunvaController = require("../controllers/regBrunva.controller");
const payGenderController = require("../controllers/payGender.controller");
const valAddedController = require("../controllers/valAdded.controller");
const munBrunvaController = require("../controllers/munBrunva.controller");
const munValAddedController = require("../controllers/munValAdded.controller");
const munPayGenderController = require("../controllers/munPayGender.controller");
const regEmployeesController = require("../controllers/regEmployees.controller");
const munEmployeesController = require("../controllers/munEmployees.controller");
const regEmployedController = require("../controllers/regEmployed.controller");
const munEmployedController = require("../controllers/munEmployed.controller");

router.get("/getRegBrunva", regBrunvaController.getRegBrunva);
router.get("/getPayGender", payGenderController.getPayGender);
router.get("/getValAdded", valAddedController.getValAdded);
router.get("/getMunBrunva", munBrunvaController.getMunBrunva);
router.get("/getMunValAdded", munValAddedController.getMunValAdded);
router.get("/getMunPayGender", munPayGenderController.getMunPayGender);
router.get("/getRegEmployees", regEmployeesController.getRegEmployees);
router.get("/getMunEmployees", munEmployeesController.getMunEmployees);
router.get("/getRegEmployed", regEmployedController.getRegEmployed);
router.get("/getMunEmployed", munEmployedController.getMunEmployed);

module.exports = router;
