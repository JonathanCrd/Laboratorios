const credentials = require('./credentials');
const request = require('request');

let city = "Monterrey, Nuevo Leon";
//Latitud de Monterrey: 25.6714
//Longitud de Monterrey:-100.309

console.log(`EL CLIMA EN ${city}`);

function getWeather(lat,long) {
  console.log(request.get(`https://api.darksky.net/forecast/${credentials.DARK_SKY_SECRET_KEY}/${lat},${long}?lang=es&units=si`));
}

function getGeo(city_name) {
  //Aqui se va a buscar el city name
}

getWeather(25.6714,-100.309);
