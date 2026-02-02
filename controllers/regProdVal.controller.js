const con = require("../config/db.config");

exports.getRegProdVal = async (req, res) => {
  const year = (req.query.year || "").toString();

  try {
    const [rows] = await con.query(
      `SELECT region_id, name_ge, name_en, w_${year} FROM [geomap].[geomap].[reg_produqciis_gamoshveba]`
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

exports.getRegProdValByRegionId = async (req, res) => {
  const { region_id } = req.params;
  const year = (req.query.year || "").toString();

  try {
    const [rows] = await con.query(
      `SELECT region_id, name_ge, name_en, w_${year} FROM [geomap].[geomap].[reg_produqciis_gamoshveba] WHERE region_id = ?`,
      [region_id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        error: "Region not found",
        message: `No data found for region_id: ${region_id}`,
      });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Query error:", error);
    res.status(500).json({
      error: "Internal Server Error",
      details: error.message,
    });
  }
};
