$(function() {
      function geoFindMe() {
        console.log("Find me");
        if (!navigator.geolocation) {
          $("#city").html("Your browser doesn't support location access");
          return;
        }

        navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
      }

      function errorCallback(error) {
        alert('ERROR(' + error.code + '): ' + error.message);
      }

      function successCallback(position) {
        console.log("successCallback");
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;

        var city = "";
        var cenas = "";

        var cityAPIUrl = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + latitude + "," + longitude + "&key=AIzaSyCV8z3Yoo6-kvvzwtATiGcNlkV2ovTyJpY";
        var forecastAPIUrl = "https://api.darksky.net/forecast/969dee190d46b3bfcf4de39598c07ede/" + latitude + "," + longitude;
        console.log(cityAPIUrl);

        // Get city from lat and long -  Google Maps API
        $.ajax({
          url: cityAPIUrl,
          // Expect `json` back from server
          dataType: 'json',

          success: function(data) {
            $("#city").html(data.results[0].address_components[2].long_name);
          },

          error: function(jqXHR, textStatus, errorThrown) {
            $("#city").html(textStatus);
          }
        });

        //Get weather info from lat and long -  forecast.io
        $.ajax({
          url: forecastAPIUrl,
          // Expect `json` back from server
          dataType: 'jsonp',

          success: function(data) {
            $("#degrees").html(data.currently.temperature);
            $("#apparent").html(data.currently.apparentTemperature);
            $("#weather").html(data.currently.summary);
            setIcon(data.currently.icon);
          },

          error: function(jqXHR, textStatus, errorThrown) {
            $("#city").html(textStatus);
          }
        });
      }

      function setIcon(weather) {
        $("#icon").removeClass();
        var weatherIcon = "";

        switch (weather) {
          case "clear-day":
            weatherIcon = "wi wi-forecast-io-clear-day";
            break;
          case "clear-night":
            weatherIcon = "wi wi-forecast-io-clear-night";
            break;
          case "rain":
            weatherIcon = "wi wi-forecast-io-rain";
            break;
          case "snow":
            weatherIcon = "wi wi-forecast-io-snow";
            break;
          case "sleet":
            weatherIcon = "wi wi-forecast-io-sleet";
            break;
          case "wind":
            weatherIcon = "wi wi-forecast-io-wind";
            break;
          case "fog":
            weatherIcon = "wi wi-forecast-io-fog";
            break;
          case "cloudy":
            weatherIcon = "wi wi-forecast-io-cloudy";
            break;
          case "partly-cloudy-day":
            weatherIcon = "wi wi-forecast-io-partly-cloudy-day";
            break;
          case "partly-cloudy-night":
            weatherIcon = "wi wi-forecast-io-partly-cloudy-night";
            break;
          case "hail":
            weatherIcon = "wi wi-forecast-io-hail";
            break;
          case "thunderstorm":
            weatherIcon = "wi wi-forecast-io-thunderstorm";
            break;
          case "tornado":
            weatherIcon = "wi wi-forecast-io-tornado";
            break;
        }

        $("#icon").addClass(weatherIcon);
      }

      $(".unit").click(function() {
        var currentUnit = $(".unit").html();
        var currentDegrees = $("#degrees").html();
        console.log(currentDegrees);
        var currentApparentDegrees = $("#apparent").html();

        if (currentUnit === "ºF") {
          var degreesCelsius = (currentDegrees - 32) / 1.8;
          var apparentCelsius = (currentApparentDegrees - 32) / 1.8;
          $("#degrees").html(degreesCelsius.toFixed(2));
          $("#apparent").html(apparentCelsius.toFixed(2));
          $(".unit").html("ºC");
          return;
        }

        var degreesFahrenheit = (currentDegrees * 1.8) + 32;
        var apparentFahrenheit = (currentApparentDegrees * 1.8) + 32;
        $("#degrees").html(degreesFahrenheit.toFixed(2));
        $("#apparent").html(apparentFahrenheit.toFixed(2));
        $(".unit").html("ºF");
      });

        geoFindMe();
});