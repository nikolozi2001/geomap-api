const con = require("../config/db.config");

exports.getMunPayGender = async (req, res) => {
  try {
    // Get parameters from query, supporting both formats (with and without underscore)
    const fyear = (req.query.fyear || req.query.f_year || "").toString();
    const myear = (req.query.myear || req.query.m_year || "").toString();

    // Additional validation for non-empty strings
    if (!fyear.trim() || !myear.trim()) {
      return res.status(400).json({
        error: "fyear and myear cannot be empty",
      });
    }

    const [rows] = await con.query(
      `SELECT municipal_, name_ge, name_en, F_${fyear}, M_${myear} FROM [geomap].[geomap].[mun_xelfasi_sqesit]`
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
