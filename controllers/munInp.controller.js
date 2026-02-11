const db = require("../config/db.config");

/**
 * Get data for a specific year and month combination
 * Query parameters: year (required), month (required)
 */
exports.getMunInpByYearMonth = async (req, res) => {
  try {
    const { year, month } = req.query;

    if (!year || !month) {
      return res.status(400).json({
        error: {
          message: "Year and month parameters are required",
          status: 400,
        },
      });
    }

    const query = `
      SELECT 
        *
      FROM [geomap].[geomap].[v_mun_inp_named]
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
          filters: { year, month },
        },
      });
    }

    res.json(results);
  } catch (err) {
    console.error("Query error details:", {
      message: err.message,
      code: err.code,
      filters: { year: req.query.year, month: req.query.month },
    });

    res.status(500).json({
      error: {
        message:
          process.env.NODE_ENV === "development"
            ? err.message
            : "Internal Server Error",
        code: err.code,
        status: 500,
      },
    });
  }
};

/**
 * Get the latest year and month that has data
 */
exports.getLatestYearMonth = async (req, res) => {
  try {
    const query = `
      SELECT TOP 1
      [OGR_FID]
      ,[municipal_]
      ,[web_munic_id]
      ,[name_ge]
      ,[name_en]
      ,[month]
      ,[year]
      ,[value]
      FROM [geomap].[geomap].[v_mun_inp_named]
      ORDER BY [year] DESC, [month] DESC
    `;

    console.log("Executing getLatestYearMonth query");
    const [results] = await db.query(query);
    console.log("Query results:", results);

    if (!results || results.length === 0) {
      return res.status(404).json({
        error: {
          message: "No data found",
          status: 404,
        },
      });
    }

    // Handle both array and single object responses
    const data = Array.isArray(results) ? results[0] : results;
    
    res.json({
      OGR_FID: data.OGR_FID,
      municipal_: data.municipal_,
      web_munic_id: data.web_munic_id,
      name_ge: data.name_ge,
      name_en: data.name_en,
      month: data.month,
      year: data.year,
      value: data.value,
    });
  } catch (err) {
    console.error("Query error:", err.message, err.stack);
    res.status(500).json({
      error: {
        message: process.env.NODE_ENV === "development"
          ? err.message
          : "Internal Server Error",
        status: 500,
      },
    });
  }
};
