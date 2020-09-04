const request = require("request");
const forecast = (latitude, longitude, callback) => {
      const url =
            "http://api.weatherstack.com/current?access_key=69c1d4724ea062fbba0e8100245d7aec&query=" +
            latitude +
            "," +
            longitude;
      request({ url, json: true }, (error, { body }) => {
            if (error) {
                  callback("Unable to connect to weather service!", undefined);
            } else if (body.error) {
                  callback("Unable to find location", undefined);
            } else {
                  callback(
                        undefined,
                        body.current.weather_descriptions[0] +
                              ". It is currently " +
                              body.current.temperature +
                              " degrees out. " +
                              "There is " +
                              body.current.precip +
                              "% chance of rain. " +
                              "It feels like " +
                              body.current.feelslike +
                              ". " +
                              "The humidity is " +
                              body.current.humidity +
                              "% " +
                              "and wind speed " +
                              body.current.wind_speed +
                              " km/h."
                  );
            }
      });
};

module.exports = forecast;
