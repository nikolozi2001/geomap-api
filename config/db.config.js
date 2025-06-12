const mysql = require("mysql2");

// Create the connection pool configuration
const poolConfig = {
  host: process.env.DB_HOST || "192.168.0.139",
  user: process.env.DB_USER || "nkachibaia",
  password: process.env.DB_PASSWORD || "123",
  database: process.env.DB_NAME || "geomap",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
};

console.log('Database configuration:', {
  host: poolConfig.host,
  user: poolConfig.user,
  database: poolConfig.database,
  // Don't log the password
});

const pool = mysql.createPool(poolConfig);
const promisePool = pool.promise();

// Test and monitor the connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error("Initial database connection error:", err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('Database connection was closed.');
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('Database has too many connections.');
    }
    if (err.code === 'ECONNREFUSED') {
      console.error('Database connection was refused.');
    }
    if (err.code === 'ER_ACCESS_DENIED_ERROR') {
      console.error('Access denied - check username and password');
    }
    // Don't exit the process, let the application handle the error
    return;
  }
  
  if (connection) {
    connection.release();
    console.log('Database connected successfully');
    
    // Test the connection with a simple query
    pool.query('SELECT 1', (err, results) => {
      if (err) {
        console.error('Test query failed:', err);
      } else {
        console.log('Test query successful');
      }
    });
  }
});

// Handle pool errors
pool.on('error', (err) => {
  console.error('Database pool error:', err);
  if (err.code === 'PROTOCOL_CONNECTION_LOST') {
    console.error('Database connection was closed.');
  }
});

module.exports = promisePool;
