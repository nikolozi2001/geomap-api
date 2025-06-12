const con = require("../config/db.config");

exports.getRegPurchases = async (req, res) => {
  const year = (req.query.year || "").toString();

  try {
    const [rows] = await con.query(
      `SELECT region_id, name_ge, name_en, w_${year} FROM reg_saqonelisa_da_momsaxurebis_kidvebi`
    );
    res.json(rows);
  } catch (error) {
    console.error("Query error:", error);
    res.status(500).json({
      error: "Internal Server Error",
      details: error.message,
    });
  }
};
