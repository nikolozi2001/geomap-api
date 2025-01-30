# Geomap API

This is a simple API for accessing geographical data from a MySQL database.

## Installation

1. Clone the repository:
   ```sh
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```sh
   cd geomap-api
   ```
3. Install the dependencies:
   ```sh
   npm install
   ```

## Usage

1. Start the server:
   ```sh
   node index.js
   ```
2. Access the API endpoints:
   - `GET /getRegBrunva?id=<region_id>&year=<year>`: Retrieve geographical data for a specific region and year.
   - `GET /`: Basic endpoint to check if the server is running.

## Example

To retrieve data for region with ID 1 and year 2020, make a GET request to:

```
http://localhost:3001/getRegBrunva?id=1&year=2020
```

## Dependencies

- express
- mysql2
- cors
