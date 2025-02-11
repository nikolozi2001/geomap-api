const con = require("../config/db.config");

exports.getMunResale = (req, res) => {
  let year = req.query.year.toString();

  con.query(
    `SELECT municipal_, name_ge, name_en, w_${year} FROM mun_gadasayidi`,
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
