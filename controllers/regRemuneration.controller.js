const con = require("../config/db.config");

exports.getRegRemuneration = (req, res) => {
  let year = req.query.year.toString();

  con.query(
    `SELECT region_id, name_ge, name_en, w_${year} FROM reg_shromis_anazgaureba`,
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
