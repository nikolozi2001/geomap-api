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
const munInpController = require("../controllers/geomap4/munInp.controller");
const munWliuriController = require("../controllers/munWliuri.controller");
const regInpController = require("../controllers/regInp.controller");
const regWliuriController = require("../controllers/regWliuri.controller");


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
router.get("/getRegBrunva/:region_id", handleRoute(regBrunvaController, 'getRegBrunvaByRegionId'));
router.get("/getPayGender", handleRoute(payGenderController, 'getPayGender'));
router.get("/getRegPayGender/:region_id", handleRoute(payGenderController, 'getPayGenderByRegionId'));
router.get("/getValAdded", handleRoute(valAddedController, 'getValAdded'));
router.get("/getRegValAdded/:region_id", handleRoute(valAddedController, 'getValAddedByRegionId'));
router.get("/getMunBrunva", handleRoute(munBrunvaController, 'getMunBrunva'));
router.get("/getMunValAdded", handleRoute(munValAddedController, 'getMunValAdded'));
router.get("/getMunPayGender", handleRoute(munPayGenderController, 'getMunPayGender'));
router.get("/getRegEmployees", handleRoute(regEmployeesController, 'getRegEmployees'));
router.get("/getRegEmployees/:region_id", handleRoute(regEmployeesController, 'getRegEmployeesByRegionId'));
router.get("/getMunEmployees", handleRoute(munEmployeesController, 'getMunEmployees'));
router.get("/getRegEmployed", handleRoute(regEmployedController, 'getRegEmployed'));
router.get("/getRegEmployed/:region_id", handleRoute(regEmployedController, 'getRegEmployedByRegionId'));
router.get("/getMunEmployed", handleRoute(munEmployedController, 'getMunEmployed'));
router.get("/getRegResale", handleRoute(regResaleController, 'getRegResale'));
router.get("/getRegResale/:region_id", handleRoute(regResaleController, 'getRegResaleByRegionId'));
router.get("/getMunResale", handleRoute(munResaleController, 'getMunResale'));
router.get("/getRegInvestment", handleRoute(regInvestmentController, 'getRegInvestment'));
router.get("/getRegInvestment/:region_id", handleRoute(regInvestmentController, 'getRegInvestmentByRegionId'));
router.get("/getMunInvestment", handleRoute(munInvestmentController, 'getMunInvestment'));
router.get("/getRegProdVal", handleRoute(regProdValController, 'getRegProdVal'));
router.get("/getRegProdVal/:region_id", handleRoute(regProdValController, 'getRegProdValByRegionId'));
router.get("/getMunProdVal", handleRoute(munProdValController, 'getMunProdVal'));
router.get("/getRegPurchases", handleRoute(regPurchasesController, 'getRegPurchases'));
router.get("/getRegPurchases/:region_id", handleRoute(regPurchasesController, 'getRegPurchasesByRegionId'));
router.get("/getMunPurchases", handleRoute(munPurchasesController, 'getMunPurchases'));
router.get("/getRegRemuneration", handleRoute(regRemunerationController, 'getRegRemuneration'));
router.get("/getRegRemuneration/:region_id", handleRoute(regRemunerationController, 'getRegRemunerationByRegionId'));
router.get("/getMunRemuneration", handleRoute(munRemunerationController, 'getMunRemuneration'));
router.get("/getRegCosts", handleRoute(regCostsController, 'getRegCosts'));
router.get("/getRegCosts/:region_id", handleRoute(regCostsController, 'getRegCostsByRegionId'));
router.get("/getMunCosts", handleRoute(munCostsController, 'getMunCosts'));
router.get("/getRegIntConsumption", handleRoute(regIntConsumptionController, 'getRegIntConsumption'));
router.get("/getRegIntConsumption/:region_id", handleRoute(regIntConsumptionController, 'getRegIntConsumptionByRegionId'));
router.get("/getMunIntConsumption", handleRoute(munIntConsumptionController, 'getMunIntConsumption'));
router.get("/getRegEmployeesGender", handleRoute(regEmployeesGenderController, 'getRegEmployeesGender'));
router.get("/getRegEmployeesGender/:region_id", handleRoute(regEmployeesGenderController, 'getRegEmployeesGenderByRegionId'));

// Municipal Input endpoints (from geomap4 database)
router.get("/getMunInp", handleRoute(munInpController, 'getMunInp'));
router.get("/getMunInp/:municipal_id", handleRoute(munInpController, 'getMunInpByMunicipal'));
router.get("/getMunInpByYearMonth", handleRoute(munInpController, 'getMunInpByYearMonth'));
router.get("/getMunInpAvailablePeriods", handleRoute(munInpController, 'getMunInpAvailablePeriods'));
// Municipal Wliuri endpoints (Annual data from geomap database)
router.get("/getMunWliuri", handleRoute(munWliuriController, 'getMunWliuri'));
router.get("/getMunWliuri/:municipal_id", handleRoute(munWliuriController, 'getMunWliuriByMunicipal'));
router.get("/getMunWliuriByYearMonth", handleRoute(munWliuriController, 'getMunWliuriByYearMonth'));
router.get("/getMunWliuriAvailablePeriods", handleRoute(munWliuriController, 'getMunWliuriAvailablePeriods'));

// Regional Input endpoints (from geomap database)
router.get("/getRegInp", handleRoute(regInpController, 'getRegInp'));
router.get("/getRegInp/:region_id", handleRoute(regInpController, 'getRegInpByRegion'));
router.get("/getRegInpByYearMonth", handleRoute(regInpController, 'getRegInpByYearMonth'));
router.get("/getRegInpAvailablePeriods", handleRoute(regInpController, 'getRegInpAvailablePeriods'));

// Regional Wliuri endpoints (Annual data from geomap database)
router.get("/getRegWliuri", handleRoute(regWliuriController, 'getRegWliuri'));
router.get("/getRegWliuri/:region_id", handleRoute(regWliuriController, 'getRegWliuriByRegion'));
router.get("/getRegWliuriByYearMonth", handleRoute(regWliuriController, 'getRegWliuriByYearMonth'));
router.get("/getRegWliuriAvailablePeriods", handleRoute(regWliuriController, 'getRegWliuriAvailablePeriods'));

module.exports = router;
