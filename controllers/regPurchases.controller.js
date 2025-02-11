const con = require("../config/db.config");

exports.getRegPurchases = (req, res) => {
  let year = req.query.year.toString();

  con.query(
    `SELECT region_id, name_ge, name_en, w_${year} FROM reg_saqonelisa_da_momsaxurebis_kidvebi`,
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
