const credentials = require('./credentials');
const request = require('request');

let city = "Monterrey Nuevo Leon";
//Latitud de Monterrey: 25.6714
//Longitud de Monterrey:-100.309

//Obtener los datos del clima del DIA (se uso Daily en vez de Current)
function getWeather(lat,long,callback) {
  request.get(`https://api.darksky.net/forecast/${credentials.DARK_SKY_SECRET_KEY}/${lat},${long}?lang=es&units=si`,
    function (error, response, body){
      if(error){
        callback("Error, Servicio no disponible", undefined)
      } else if(response.body == 'Forbidden\n'){
        callback('Credenciales incorrectas',undefined)
      } else if(response.body.code == 400){
          callback(response.body.error, undefined);
      } else if(response.body == 'Not Found\n'){
        callback('Error, no se encontró el lugar',undefined)
      }
      else {
        let jsonRequest = JSON.parse(body);
        let weatherData = {
          summary: jsonRequest.daily.data[0].summary,
          temperature: jsonRequest.currently.temperature,
          precipProbability : jsonRequest.daily.data[0].precipProbability
        }
        callback(undefined,weatherData);
      }
    }
  );
}

//Obtener las coordenadas geograficas de la ciudad
function getGeo(city_name, callback) {
  request.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${city_name}.json?access_token=${credentials.MAPBOX_TOKEN}`,
  function (error, response, body){
    let jsonBody = JSON.parse(body);

    if (error){
      callback("Error, servicio no disponible",undefined)
    }else if(jsonBody.message == "Not Found"){
      callback("No encontrado", undefined);
    }else if(jsonBody.message == 'Not Authorized - Invalid Token'){
      callback("Token Invalido", undefined);
    }else if(jsonBody.features.length == 0){
          callback("Error, lugar no encontrado", undefined)
        }
    else{
      let coordinates = {
        long: jsonBody.features[0].center[0],
        lat: jsonBody.features[0].center[1]
      }
      callback(undefined, coordinates)
    }
  });
}


console.log(`CLIMA EN ${city.toUpperCase()}`);
getGeo(city, function(error,response){
  if(error){
    console.log(error);
  }
  else{
    //Una vez que se tienen las coordenadas, podemos obtener los datos climaticos
    getWeather(response.lat, response.long, function(error, response){
      if(error){
        console.log(error);
      }else{
        console.log(`${response.summary} Actualmente está a ${response.temperature}° C. Hay ${response.precipProbability * 100}% de posibilidad de lluvia.`);
      }
    });
  }
});
