const express = require("express");
const router = express.Router();
const apiRoutes = require("./api.routes");

router.use("/api", apiRoutes);

router.get("/", (req, res) => {
  res.send("Hello World!");
});

// TODO: Remove this route after testing
router.get("/test-env", (req, res) => {
  res.json({
    dbHost: process.env.DB_HOST,
    nodeEnv: process.env.NODE_ENV,
    // Don't expose sensitive information in production
    envVarsSet: {
      DB_HOST: !!process.env.DB_HOST,
      DB_USER: !!process.env.DB_USER,
      DB_PASSWORD: !!process.env.DB_PASSWORD,
      DB_NAME: !!process.env.DB_NAME,
      ALLOWED_ORIGINS: !!process.env.ALLOWED_ORIGINS,
      NODE_ENV: !!process.env.NODE_ENV
    }
  });
});

module.exports = router;
