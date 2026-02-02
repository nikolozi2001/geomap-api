const con = require("../config/db.config");

exports.getMunCosts = async (req, res) => {
  const year = (req.query.year || "").toString();

  try {
    const [rows] = await con.query(
      `SELECT municipal_, name_ge, name_en, w_${year} FROM [geomap].[geomap].[mun_shromiti_danaxarjebi]`
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
