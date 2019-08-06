# Windscraper
A NodeJS module for the Findwind.se API

Live example of the app can be found here https://kitewindscraper.herokuapp.com/20

## API values
```
"spot": Name of the spot
"windspeed": Current wind speed
"gustspeed": Current gust speed
"directiontext": Current wind direction (text form)
"directiondegrees": Current wind direction (degree form)
```

## Example data
```
"spot": "Lomma",
"windspeed": "8.9",
"gustspeed": "17.8",
"directiontext": "S",
"directiondegrees": "180"
```

## Development
```
Setup: npm install
Dev: npm run serve
Run prod: npm start
If you're running a local instance of Windscraper:
Create a .env file in the root folder with your API key
Example: 
USERNAME=your-username
API-KEY=your-findwind-api-key
```

## Built using
```
Node
Express
Axios
```
