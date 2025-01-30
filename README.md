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
   - `GET /api/getRegBrunva?id=<region_id>&year=<year>`: Retrieve geographical data for a specific region and year.
   - `GET /api/getPayGender?id=<region_id>&fyear=<fyear>&myear=<myear>`: Retrieve payment data by gender for a specific region and years.
   - `GET /`: Basic endpoint to check if the server is running.

## Example

To retrieve data for region with ID 1 and year 2020, make a GET request to:

```
http://localhost:3001/api/getRegBrunva?id=1&year=2020
```

To retrieve payment data by gender for region with ID 1, female year 2020, and male year 2021, make a GET request to:

```
http://localhost:3001/api/getPayGender?id=1&fyear=2020&myear=2021
```

## Dependencies

- express
- mysql2
- cors
