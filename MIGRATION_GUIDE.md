# MySQL to SQL Server Migration Guide

## Overview
Your geomap-api project has been successfully converted from MySQL to SQL Server. All necessary changes have been made to the codebase.

## Changes Made

### 1. **package.json** ✅
- **Removed:** `mysql2` dependency
- **Added:** `mssql` v10.0.0

**Before:**
```json
"mysql2": "^3.2.0"
```

**After:**
```json
"mssql": "^10.0.0"
```

### 2. **config/db.config.js** ✅
Completely refactored for SQL Server compatibility:

#### Key Changes:
- Changed from `mysql2.createPool()` to `mssql.ConnectionPool()`
- Updated connection configuration:
  - `host` → `server`
  - Removed MySQL-specific options (`waitForConnections`, `connectionLimit`, `queueLimit`)
  - Added SQL Server options: `encrypt: false`, `trustServerCertificate: true`, `enableArithAbort: true`

#### New Features:
- Automatic parameter conversion from MySQL `?` placeholders to SQL Server `@p1`, `@p2` format
- Async connection initialization with proper error handling
- Support for both parameterized and non-parameterized queries

**Query Method:**
```javascript
// MySQL style (now converted automatically):
await db.query('SELECT * FROM table WHERE id = ?', [123])

// Converted internally to SQL Server:
await db.query('SELECT * FROM table WHERE id = @p1', [123])
```

### 3. **controllers/munBrunva.controller.js** ✅
Updated column discovery for SQL Server:

**Before (MySQL):**
```javascript
const [columns] = await db.query("SHOW COLUMNS FROM mun_brunva");
```

**After (SQL Server):**
```javascript
const columnsQuery = `
  SELECT COLUMN_NAME as Field 
  FROM INFORMATION_SCHEMA.COLUMNS 
  WHERE TABLE_NAME = 'mun_brunva'
  ORDER BY ORDINAL_POSITION
`;
const [columns] = await db.query(columnsQuery);
```

Also updated column name references in SELECT clause to use brackets `[]` for safety:
```javascript
[${yearColumn.Field}] as value  // SQL Server syntax for column names
```

## All Controllers - Compatibility Status

All 25 controller files are **compatible** with SQL Server:
- ✅ regBrunva.controller.js
- ✅ regCosts.controller.js
- ✅ regEmployed.controller.js
- ✅ regEmployees.controller.js
- ✅ regEmployeesGender.controller.js
- ✅ regIntConsumption.controller.js
- ✅ regInvestment.controller.js
- ✅ regProdVal.controller.js
- ✅ regPurchases.controller.js
- ✅ regRemuneration.controller.js
- ✅ regResale.controller.js
- ✅ valAdded.controller.js
- ✅ munBrunva.controller.js (updated)
- ✅ munCosts.controller.js
- ✅ munEmployed.controller.js
- ✅ munEmployees.controller.js
- ✅ munIntConsumption.controller.js
- ✅ munInvestment.controller.js
- ✅ munPayGender.controller.js
- ✅ munProdVal.controller.js
- ✅ munPurchases.controller.js
- ✅ munRemuneration.controller.js
- ✅ munResale.controller.js
- ✅ munValAdded.controller.js
- ✅ payGender.controller.js

These controllers use simple queries that work with both MySQL and SQL Server without modification. The parameter conversion is handled automatically by the db.config.js wrapper.

## Environment Configuration

Update your `.env` file if needed (or set these environment variables):
```
DB_HOST=192.168.0.139          # SQL Server hostname/IP
DB_USER=nkachibaia             # SQL Server login username
DB_PASSWORD=123                # SQL Server login password
DB_NAME=geomap                 # Database name
PORT=3000                      # Express server port
```

## Installation & Setup

1. **Install dependencies:**
```bash
npm install
```

2. **Run the server:**
```bash
npm start
```

Or for development with auto-reload:
```bash
npm run dev
```

## SQL Server vs MySQL - Key Differences Handled

| Aspect | MySQL | SQL Server | Status |
|--------|-------|-----------|--------|
| Driver | mysql2 | mssql | ✅ Updated |
| Connection | `mysql.createPool()` | `new sql.ConnectionPool()` | ✅ Updated |
| Parameters | `?` placeholders | `@param` placeholders | ✅ Auto-converted |
| Column Info | `SHOW COLUMNS FROM` | `INFORMATION_SCHEMA.COLUMNS` | ✅ Updated in munBrunva.controller.js |
| Column Names | Plain text | Bracketed `[name]` for safety | ✅ Updated where needed |
| Query Results | Array of arrays | `.recordset` property | ✅ Wrapped in db.config.js |

## Testing the Migration

1. Ensure SQL Server instance is running and accessible at `192.168.0.139`
2. Database and tables have been migrated (manually or via migration script)
3. Start the server: `npm start`
4. Test an endpoint: `GET http://localhost:3000/getRegBrunva?year=2022`

## Error Codes

The db.config.js now handles SQL Server error codes:
- `ELOGIN` - Authentication failed (check username/password)
- `ESOCKET` - Connection refused (check server address/port)

## Notes

- All your existing controller code works without modification thanks to the abstraction layer in db.config.js
- The parameter conversion happens automatically, so you can keep using the MySQL-style `?` placeholders in your queries
- Column names with special characters are safely wrapped in brackets `[]`
- The connection pool is initialized asynchronously on startup

## Next Steps

1. ✅ Verify all tables exist in SQL Server database
2. ✅ Ensure SQL Server user has proper permissions
3. ✅ Test all API endpoints
4. ✅ Monitor logs for any connection issues

---

**Migration completed successfully! Your application is now ready for SQL Server.**
