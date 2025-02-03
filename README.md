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
   - `GET /api/getRegBrunva?year=<year>`: Retrieve geographical data for a specific year.
   - `GET /api/getPayGender?fyear=<fyear>&myear=<myear>`: Retrieve payment data by gender for specific years.
   - `GET /api/getValAdded?year=<year>`: Retrieve value-added data for a specific year.
   - `GET /api/getMunBrunva?year=<year>`: Retrieve municipal data for a specific year.
   - `GET /`: Basic endpoint to check if the server is running.

## Example

To retrieve data for the year 2020, make a GET request to:

```
http://localhost:3001/api/getRegBrunva?year=2020
```

To retrieve payment data by gender for female year 2020 and male year 2021, make a GET request to:

```
http://localhost:3001/api/getPayGender?fyear=2020&myear=2021
```

To retrieve value-added data for the year 2022, make a GET request to:

```
http://localhost:3001/api/getValAdded?year=2022
```

To retrieve municipal data for the year 2022, make a GET request to:

```
http://localhost:3001/api/getMunBrunva?year=2022
```

## Dependencies

- express
- mysql2
- cors
