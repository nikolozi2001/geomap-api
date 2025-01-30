const con = require("../config/db.config");

exports.getPayGender = (req, res) => {
  let id = req.query.id.toString();
  let fyear = req.query.fyear.toString();
  let myear = req.query.myear.toString();

  con.query(
    `SELECT REGION_ID, NAME_GE, F_${fyear}, M_${myear} FROM reg_anazgaureba_sqesit WHERE region_id=${id}`,
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
