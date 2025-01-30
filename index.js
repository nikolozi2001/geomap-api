var mysql = require("mysql2");
const express = require("express");
const app = express();
const port = 3001;
const cors = require("cors");
const routes = require("./routes");

app.use(cors());
app.use("/", routes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
