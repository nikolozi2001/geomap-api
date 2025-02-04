const con = require("../config/db.config");

exports.getMunPayGender = (req, res) => {
  let fyear = req.query.fyear.toString();
  let myear = req.query.myear.toString();

  con.query(
    `SELECT municipal_, name_ge, name_en, F_${fyear}, M_${myear} FROM mun_xelfasi_sqesit`,
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
