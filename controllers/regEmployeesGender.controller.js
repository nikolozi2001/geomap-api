const con = require("../config/db.config");

exports.getRegEmployeesGender = (req, res) => {
  let fyear = req.query.fyear.toString();
  let myear = req.query.myear.toString();

  con.query(
    `SELECT REGION_ID, NAME_GE, F_${fyear}, M_${myear} FROM reg_dasaqmeba_sqesit`,
    function (err, result) {
      if (err) {
        console.error("Query error:", err);
        res.status(500).send("Internal Server Error");
      } else {
        res.send(result);
      }
    }
  );
};
