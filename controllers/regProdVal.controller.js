const con = require("../config/db.config");

exports.getRegProdVal = async (req, res) => {
  const year = (req.query.year || "").toString();

  try {
    const [rows] = await con.query(
      `SELECT region_id, name_ge, name_en, w_${year} FROM reg_produqciis_gamoshveba`
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
