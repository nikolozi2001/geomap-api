const con = require("../config/db.config");

exports.getRegBrunva = (req, res) => {
  let id = req.query.id.toString();
  let year = req.query.year.toString();

  con.query(
    `SELECT OGR_FID, region_id, name_ge, name_en, w_${year} FROM reg_brunva WHERE region_id=${id}`,
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
