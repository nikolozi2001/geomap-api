const db = require("../config/db.config");

exports.getMunBrunva = async (req, res) => {
  try {
    if (!req.query.year) {
      return res.status(400).json({
        error: {
          message: "Year parameter is required",
          status: 400,
        },
      });
    }

    const year = req.query.year.toString();

    // First, get the table structure using SQL Server information schema
    const columnsQuery = `
      SELECT COLUMN_NAME as Field 
      FROM INFORMATION_SCHEMA.COLUMNS 
      WHERE TABLE_NAME = 'mun_brunva'
      ORDER BY ORDINAL_POSITION
    `;
    
    const [columns] = await db.query(columnsQuery);
    console.log(
      "Available columns:",
      columns.map((c) => c.Field)
    );

    // Try different possible column name formats
    const possibleColumnNames = [
      `w_${year}`, // w_2022
    ];

    // Find the matching column
    const yearColumn = columns.find(
      (col) =>
        possibleColumnNames.includes(col.Field) ||
        col.Field.toLowerCase().includes(year)
    );

    if (!yearColumn) {
      return res.status(404).json({
        error: {
          message: `No data column found for year ${year}`,
          status: 404,
          availableColumns: columns.map((c) => c.Field),
        },
      });
    }

    const query = `
      SELECT 
        municipal_, 
        name_ge, 
        name_en, 
        [${yearColumn.Field}] as value 
      FROM [geomap].[geomap].[mun_brunva]
    `;

    console.log("Executing query:", query);

    const [results] = await db.query(query);

    if (!results || results.length === 0) {
      return res.status(404).json({
        error: {
          message: `No data found for year ${year}`,
          status: 404,
        },
      });
    }

    res.json(results);
  } catch (err) {
    console.error("Query error details:", {
      message: err.message,
      code: err.code,
      sqlState: err.sqlState,
      sqlMessage: err.sqlMessage,
      sql: err.sql,
      year: req.query.year,
      stack: err.stack,
    });

    res.status(500).json({
      error: {
        message:
          process.env.NODE_ENV === "development"
            ? err.message
            : "Internal Server Error",
        code: err.code,
        status: 500,
        details: err.message,
      },
    });
  }
};
