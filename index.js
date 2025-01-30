var mysql = require("mysql2");
const express = require("express");
const app = express();
const port = 3001;
var cors = require("cors");

app.use(cors());

var con = mysql.createConnection({
  host: "192.168.0.139",
  user: "nkachibaia",
  password: "123",
  database: "geomap",
});

con.connect(function (err) {
  app.get("/getRegBrunva", (req, res) => {
    let id = req.query.id.toString();
    let year = req.query.year.toString();

    if (err) throw err;
    con.query(
      `SELECT OGR_FID, region_id, name_ge, name_en, w_${year} FROM reg_brunva WHERE region_id=${id}`,
      function (err, result) {
        if (err) throw err;
        else {
          res.send(result);
        }
      }
    );
  });
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
