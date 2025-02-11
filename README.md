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
   - `GET /api/getMunValAdded?year=<year>`: Retrieve municipal value-added data for a specific year.
   - `GET /api/getMunPayGender?fyear=<fyear>&myear=<myear>`: Retrieve municipal payment data by gender for specific years.
   - `GET /api/getRegEmployees?year=<year>`: Retrieve regional employee data for a specific year.
   - `GET /api/getMunEmployees?year=<year>`: Retrieve municipal employee data for a specific year.
   - `GET /api/getRegEmployed?year=<year>`: Retrieve regional employed data for a specific year.
   - `GET /api/getMunEmployed?year=<year>`: Retrieve municipal employed data for a specific year.
   - `GET /`: Basic endpoint to check if the server is running.

## API Routes

The following routes are available in the Geomap API:

- `GET /getRegBrunva` - Retrieve regional Brunva data.
- `GET /getPayGender` - Retrieve pay by gender data.
- `GET /getValAdded` - Retrieve value added data.
- `GET /getMunBrunva` - Retrieve municipal Brunva data.
- `GET /getMunValAdded` - Retrieve municipal value added data.
- `GET /getMunPayGender` - Retrieve municipal pay by gender data.
- `GET /getRegEmployees` - Retrieve regional employees data.
- `GET /getMunEmployees` - Retrieve municipal employees data.
- `GET /getRegEmployed` - Retrieve regional employed data.
- `GET /getMunEmployed` - Retrieve municipal employed data.
- `GET /getRegResale` - Retrieve regional resale data.
- `GET /getMunResale` - Retrieve municipal resale data.
- `GET /getRegInvestment` - Retrieve regional investment data.
- `GET /getMunInvestment` - Retrieve municipal investment data.
- `GET /getRegProdVal` - Retrieve regional production value data.
- `GET /getMunProdVal` - Retrieve municipal production value data.
- `GET /getRegPurchases` - Retrieve regional purchases data.
- `GET /getMunPurchases` - Retrieve municipal purchases data.
- `GET /getRegRemuneration` - Retrieve regional remuneration data.
- `GET /getMunRemuneration` - Retrieve municipal remuneration data.
- `GET /getRegCosts` - Retrieve regional costs data.
- `GET /getMunCosts` - Retrieve municipal costs data.
- `GET /getRegIntConsumption` - Retrieve regional intermediate consumption data.
- `GET /getMunIntConsumption` - Retrieve municipal intermediate consumption data.
- `GET /getRegEmployeesGender` - Retrieve regional employees by gender data.

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
