const con = require("../config/db.config");

exports.getMunIntConsumption = async (req, res) => {
  const year = (req.query.year || "").toString();

  try {
    const [rows] = await con.query(
      `SELECT municipal_, name_ge, name_en, w_${year} FROM [geomap].[geomap].[mun_shualeduri_mokhmareba]`
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
