const con = require("../config/db.config");

exports.getPayGender = async (req, res) => {
  const fyear = (req.query.fyear || "").toString();
  const myear = (req.query.myear || "").toString();

  try {
    const [rows] = await con.query(
      `SELECT region_id, name_ge, name_en, f_${fyear}, m_${myear} FROM reg_anazgaureba_sqesit`
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
