const con = require("../config/db.config");

exports.getRegEmployeesGender = async (req, res) => {
  const fyear = (req.query.fyear || "").toString();
  const myear = (req.query.myear || "").toString();

  try {
    const [rows] = await con.query(
      `SELECT region_id, name_ge, name_en, f_${fyear}, m_${myear} FROM [geomap].[geomap].[reg_dasaqmeba_sqesit]`
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

exports.getRegEmployeesGenderByRegionId = async (req, res) => {
  const { region_id } = req.params;
  const fyear = (req.query.fyear || "").toString();
  const myear = (req.query.myear || "").toString();

  try {
    const [rows] = await con.query(
      `SELECT region_id, name_ge, name_en, f_${fyear}, m_${myear} FROM [geomap].[geomap].[reg_dasaqmeba_sqesit] WHERE region_id = ?`,
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
