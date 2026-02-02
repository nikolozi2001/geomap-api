const db = require("../config/db.config");

/**
 * Get all municipal wliuri (annual) data
 * Query parameters: year, month (optional)
 */
exports.getMunWliuri = async (req, res) => {
  try {
    const { year, month } = req.query;
    
    let query = `
      SELECT 
        OGR_FID,
        municipal_,
        name_ge,
        name_en,
        [month],
        [year],
        [value],
        shape_leng,
        shape_area
      FROM [geomap].[geomap].[mun_wliuri]
    `;
    
    const params = [];
    const conditions = [];
    
    // Add year filter if provided
    if (year) {
      conditions.push(`[year] = ?`);
      params.push(year);
    }
    
    // Add month filter if provided
    if (month) {
      conditions.push(`[month] = ?`);
      params.push(month);
    }
    
    // Append WHERE clause if there are conditions
    if (conditions.length > 0) {
      query += ` WHERE ${conditions.join(' AND ')}`;
    }
    
    query += ` ORDER BY [year] DESC, [month] DESC`;
    
    console.log("Executing query:", query);
    
    const [results] = await db.query(query, params);
    
    if (!results || results.length === 0) {
      return res.status(404).json({
        error: {
          message: "No data found",
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
      sqlMessage: err.sqlMessage,
      filters: { year: req.query.year, month: req.query.month },
      stack: err.stack
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

/**
 * Get municipal wliuri data by municipal ID
 * Path parameter: municipal_id
 * Query parameters: year, month (optional)
 */
exports.getMunWliuriByMunicipal = async (req, res) => {
  try {
    const { municipal_id } = req.params;
    const { year, month } = req.query;
    
    if (!municipal_id) {
      return res.status(400).json({
        error: {
          message: "Municipal ID is required",
          status: 400
        }
      });
    }
    
    let query = `
      SELECT 
        OGR_FID,
        municipal_,
        name_ge,
        name_en,
        [month],
        [year],
        [value],
        shape_leng,
        shape_area
      FROM [geomap].[geomap].[mun_wliuri]
      WHERE municipal_ = ?
    `;
    
    const params = [municipal_id];
    const conditions = [];
    
    // Add year filter if provided
    if (year) {
      conditions.push(`[year] = ?`);
      params.push(year);
    }
    
    // Add month filter if provided
    if (month) {
      conditions.push(`[month] = ?`);
      params.push(month);
    }
    
    // Append additional conditions
    if (conditions.length > 0) {
      query += ` AND ${conditions.join(' AND ')}`;
    }
    
    query += ` ORDER BY [year] DESC, [month] DESC`;
    
    console.log("Executing query:", query);
    
    const [results] = await db.query(query, params);
    
    if (!results || results.length === 0) {
      return res.status(404).json({
        error: {
          message: `No data found for municipal_id: ${municipal_id}`,
          status: 404,
          filters: { municipal_id, year, month }
        }
      });
    }
    
    res.json(results);
  } catch (err) {
    console.error("Query error details:", {
      message: err.message,
      code: err.code,
      municipal_id: req.params.municipal_id,
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
      SELECT 
        OGR_FID,
        municipal_,
        name_ge,
        name_en,
        [month],
        [year],
        [value],
        shape_leng,
        shape_area
      FROM [geomap].[geomap].[mun_wliuri]
      WHERE [year] = ? AND [month] = ?
      ORDER BY municipal_
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

/**
 * Get available years and months
 */
exports.getMunWliuriAvailablePeriods = async (req, res) => {
  try {
    const query = `
      SELECT DISTINCT 
        [year],
        [month]
      FROM [geomap].[geomap].[mun_wliuri]
      ORDER BY [year] DESC, [month] DESC
    `;
    
    console.log("Executing query:", query);
    
    const [results] = await db.query(query);
    
    if (!results || results.length === 0) {
      return res.status(404).json({
        error: {
          message: "No data found",
          status: 404
        }
      });
    }
    
    res.json(results);
  } catch (err) {
    console.error("Query error details:", {
      message: err.message,
      code: err.code
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
