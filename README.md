# Waypoints

## Installation

To install and set up the project, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/sahildaswani/Waypoints
cd Waypoints
```

2. Install the Dependencies

```bash
npm install
```

3. Replace environment variables in `.env.example`

- Replace the waypoint API URL with your own API URL
- Replace the Google Maps API key with your own API key [(Google Maps API)](https://developers.google.com/maps/documentation/javascript/get-api-key)
- Make sure Directions API and Places API are enabled on Google Maps Platform

4. Rename the `.env.example` file to `.env.development`
5. Run the project

```bash
npm run dev
```

## Creating a production build

1. Rename the `.env.example` file to `.env.production` and replace the environment variables

2. Run the following command to create a production build

```bash
npm run build
```

3. The production build will be created in the `dist` folder

## Testing

1. Run the following command to run the tests

```bash
npm run test
```
