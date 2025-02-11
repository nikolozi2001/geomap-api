const con = require("../config/db.config");

exports.getMunIntConsumption = (req, res) => {
  let year = req.query.year.toString();

  con.query(
    `SELECT municipal_, name_ge, name_en, w_${year} FROM mun_shualeduri_mokhmareba`,
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
