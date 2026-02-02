const db = require("../config/db.config");

/**
 * Get all regional wliuri (annual) data
 * Query parameters: year, month (optional)
 */
exports.getRegWliuri = async (req, res) => {
  try {
    const { year, month } = req.query;
    
    let query = `
      SELECT 
        OGR_FID,
        region_id,
        name_ge,
        name_en,
        [month],
        [year],
        [value],
        shape_leng,
        shape_area
      FROM [geomap].[geomap].[reg_wliuri]
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
 * Get regional wliuri data by region ID
 * Path parameter: region_id
 * Query parameters: year, month (optional)
 */
exports.getRegWliuriByRegion = async (req, res) => {
  try {
    const { region_id } = req.params;
    const { year, month } = req.query;
    
    if (!region_id) {
      return res.status(400).json({
        error: {
          message: "Region ID is required",
          status: 400
        }
      });
    }
    
    let query = `
      SELECT 
        OGR_FID,
        region_id,
        name_ge,
        name_en,
        [month],
        [year],
        [value],
        shape_leng,
        shape_area
      FROM [geomap].[geomap].[reg_wliuri]
      WHERE region_id = ?
    `;
    
    const params = [region_id];
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
          message: `No data found for region_id: ${region_id}`,
          status: 404,
          filters: { region_id, year, month }
        }
      });
    }
    
    res.json(results);
  } catch (err) {
    console.error("Query error details:", {
      message: err.message,
      code: err.code,
      region_id: req.params.region_id,
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
exports.getRegWliuriByYearMonth = async (req, res) => {
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
        region_id,
        name_ge,
        name_en,
        [month],
        [year],
        [value],
        shape_leng,
        shape_area
      FROM [geomap].[geomap].[reg_wliuri]
      WHERE [year] = ? AND [month] = ?
      ORDER BY region_id
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
exports.getRegWliuriAvailablePeriods = async (req, res) => {
  try {
    const query = `
      SELECT DISTINCT 
        [year],
        [month]
      FROM [geomap].[geomap].[reg_wliuri]
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
