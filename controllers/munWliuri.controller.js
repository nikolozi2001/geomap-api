const db = require("../config/db.config");


/**
 * Get data for a specific year and month combination
 * Query parameters: year (required), month (required)
 */
exports.getMunWliuriByYearMonth = async (req, res) => {
  try {
    const { year, month } = req.query;
    
    if (!year || !month) {
      return res.status(400).json({
        error: {
          message: "Year and month parameters are required",
          status: 400
        }
      });
    }
    
    const query = `
      SELECT *
      FROM [geomap].[v_mun_wliuri_named]
      WHERE [year] = ? AND [month] = ?
      ORDER BY municipal_ ASC
    `;
    
    console.log("Executing query:", query);
    
    const [results] = await db.query(query, [year, month]);
    
    if (!results || results.length === 0) {
      return res.status(404).json({
        error: {
          message: `No data found for year ${year} and month ${month}`,
          status: 404,
          filters: { year, month }
        }
      });
    }
    
    res.json(results);
  } catch (err) {
    console.error("Query error details:", {
      message: err.message,
      code: err.code,
      filters: { year: req.query.year, month: req.query.month }
    });
    
    res.status(500).json({
      error: {
        message: process.env.NODE_ENV === "development" ? err.message : "Internal Server Error",
        code: err.code,
        status: 500
      }
    });
  }
};

