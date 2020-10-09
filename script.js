var apiKey = "86bf5555dacf7ee41e8ab05473b6d58a";

function currentWeather() {
    navigator.geolocation.getCurrentPosition(function (position) {
        longitude = position.coords.longitude;
        latitude = position.coords.latitude;

        var queryURL = "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKey;
        var UVIndexURL = " http://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKey;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            var iconCode = response.weather[0].icon;

            var iconurl = "http://openweathermap.org/img/w/" + iconCode + ".png";
            $(".city").html("<h1> " + response.name + " </h1>");
            $(".temp").text("Temperature: " + ((response.main.temp - 273.15) * 1.8 + 32).toFixed(0) + " °F");
            $(".humidity").text("Humidity: " + response.main.humidity + " %");
            $(".wind").text("Wind Speed: " + response.wind.speed + " MPH");
            $("#weather-icon").attr("src", iconurl);
        });

        $.ajax({
            url: UVIndexURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            $(".uv-index").text("UV Index: " + response[0].value);
        })
    });
};

function fiveDayForecast() {
    var city = "sydney";
    var fiveDayURL = "https://api.openweathermap.org/data/2.5/forcast?q=" + city + "&appid=" + apiKey;
    $.ajax({
        url: fiveDayURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
    });
};

currentWeather();
fiveDayForecast();