var mysql = require("mysql2");

var con = mysql.createConnection({
  host: "192.168.0.139",
  user: "nkachibaia",
  password: "123",
  database: "geomap",
});

con.connect(function (err) {
  if (err) {
    console.error("Database connection error:", err);
    process.exit(1);
  }
});

module.exports = con;
