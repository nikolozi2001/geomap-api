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
const regResaleController = require("../controllers/regResale.controller");
const munResaleController = require("../controllers/munResale.controller");
const regInvestmentController = require("../controllers/regInvestment.controller");
const munInvestmentController = require("../controllers/munInvestment.controller");
const regProdValController = require("../controllers/regProdVal.controller");
const munProdValController = require("../controllers/munProdVal.controller");
const regPurchasesController = require("../controllers/regPurchases.controller");
const munPurchasesController = require("../controllers/munPurchases.controller");
const regRemunerationController = require("../controllers/regRemuneration.controller");
const munRemunerationController = require("../controllers/munRemuneration.controller");
const regCostsController = require("../controllers/regCosts.controller");
const munCostsController = require("../controllers/munCosts.controller");
const regIntConsumptionController = require("../controllers/regIntConsumption.controller");
const munIntConsumptionController = require("../controllers/munIntConsumption.controller");
const regEmployeesGenderController = require("../controllers/regEmployeesGender.controller");

// Define routes with error handling
const handleRoute = (controller, method) => {
  return (req, res) => {
    if (typeof controller[method] !== 'function') {
      return res.status(500).json({ error: `Handler ${method} is not implemented` });
    }
    return controller[method](req, res);
  };
};

router.get("/getRegBrunva", handleRoute(regBrunvaController, 'getRegBrunva'));
router.get("/getPayGender", handleRoute(payGenderController, 'getPayGender'));
router.get("/getValAdded", handleRoute(valAddedController, 'getValAdded'));
router.get("/getMunBrunva", handleRoute(munBrunvaController, 'getMunBrunva'));
router.get("/getMunValAdded", handleRoute(munValAddedController, 'getMunValAdded'));
router.get("/getMunPayGender", handleRoute(munPayGenderController, 'getMunPayGender'));
router.get("/getRegEmployees", handleRoute(regEmployeesController, 'getRegEmployees'));
router.get("/getMunEmployees", handleRoute(munEmployeesController, 'getMunEmployees'));
router.get("/getRegEmployed", handleRoute(regEmployedController, 'getRegEmployed'));
router.get("/getMunEmployed", handleRoute(munEmployedController, 'getMunEmployed'));
router.get("/getRegResale", handleRoute(regResaleController, 'getRegResale'));
router.get("/getMunResale", handleRoute(munResaleController, 'getMunResale'));
router.get("/getRegInvestment", handleRoute(regInvestmentController, 'getRegInvestment'));
router.get("/getMunInvestment", handleRoute(munInvestmentController, 'getMunInvestment'));
router.get("/getRegProdVal", handleRoute(regProdValController, 'getRegProdVal'));
router.get("/getMunProdVal", handleRoute(munProdValController, 'getMunProdVal'));
router.get("/getRegPurchases", handleRoute(regPurchasesController, 'getRegPurchases'));
router.get("/getMunPurchases", handleRoute(munPurchasesController, 'getMunPurchases'));
router.get("/getRegRemuneration", handleRoute(regRemunerationController, 'getRegRemuneration'));
router.get("/getMunRemuneration", handleRoute(munRemunerationController, 'getMunRemuneration'));
router.get("/getRegCosts", handleRoute(regCostsController, 'getRegCosts'));
router.get("/getMunCosts", handleRoute(munCostsController, 'getMunCosts'));
router.get("/getRegIntConsumption", handleRoute(regIntConsumptionController, 'getRegIntConsumption'));
router.get("/getMunIntConsumption", handleRoute(munIntConsumptionController, 'getMunIntConsumption'));
router.get("/getRegEmployeesGender", handleRoute(regEmployeesGenderController, 'getRegEmployeesGender'));

module.exports = router;
