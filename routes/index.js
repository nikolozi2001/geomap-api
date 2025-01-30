const express = require("express");
const router = express.Router();
const apiRoutes = require("./api.routes");

router.use("/api", apiRoutes);

router.get("/", (req, res) => {
  res.send("Hello World!");
});

module.exports = router;
