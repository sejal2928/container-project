var searchButton = $('.searchButton');
var pastButton = $('#pastButton');
var span = document.getElementsByTagName('span');
var apiKey = '86f0b50d034902d364600f3d102c19e6';
var keyCount = 0;
// Need to persist the data onto the page with this for loop
for (var i = 0; i < localStorage.length; i++) {

    var city = localStorage.getItem(i);
    
    var cityName = $(".list-group").addClass("list-group-item");

    cityName.append("<button>" + city + "</button>"); //add button element, then list 
}
//function for search button after city name is typed in
searchButton.click(function () {

    var searchInput = $(".searchInput").val();

    // current weather (NEED TO INCLUDE IMPERIAL UNITS TO NEGATE KELVIN DEFAULT.)
    var urlCurrent = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput + "&Appid=" + apiKey + "&units=imperial";
    // five day forecast (NEED TO INCLUDE IMPERIAL UNITS TO NEGATE KELVIN DEFAULT.)
    var urlFiveDay = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchInput + "&Appid=" + apiKey + "&units=imperial";


    if (searchInput == "") {
        console.log(searchInput);
    } else {
        $.ajax({
            url: urlCurrent,
            method: "GET"
        }).then(function (response) {
            
            
            console.log("Search input: " + response.name + "; " + response.main.temp + " degrees F; " + response.main.humidity + "% Humidity; " 
            + response.wind.speed + "MPH");

            var cityName = $(".list-group").addClass("list-group-item");
            cityName.append("<button>" + response.name + "</button>"); //add button element
            // Local storage
            var local = localStorage.setItem(keyCount, response.name);
            keyCount = keyCount + 1;

            // Start Current Weather append
            //how? appending as <p> text
            //need to add class for div

            var currentForecast = $(".currentForecast").append("<div>").addClass("card-body");
            currentForecast.empty();
            var currentName = currentForecast.append("<p>");
            // .addClass("card-text");
            currentForecast.append(currentName);

            // Adjust Date 
            var timeUTC = new Date(response.dt * 1000);
            currentName.append(response.name + " " + timeUTC.toLocaleDateString("en-US"));
            currentName.append(`<img src="https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png">`);
           //temperature
            var currentTemp = currentName.append("<p>");
            // .addClass("card-text");
            currentName.append(currentTemp);
            currentTemp.append("<p>" + "Temperature: " + response.main.temp + "°F" + "</p>");
            //humidity, in %
            currentTemp.append("<p>" + "Humidity: " + response.main.humidity + "%" + "</p>");
            //wind speed in MPH 
            currentTemp.append("<p>" + "Wind Speed: " + response.wind.speed + "MPH" + "</p>");

            // UV Index URL
            var urlForUV = `https://api.openweathermap.org/data/2.5/uvi?appid=86f0b50d034902d364600f3d102c19e6&lat=${response.coord.lat}&lon=${response.coord.lon}`;

            // UV Index
            $.ajax({
                url: urlForUV,
                method: "GET"
            }).then(function (response) {

                var currentUV = currentTemp.append("<span>" + "UV Index: " + response.value + "</span>").addClass("card-text");

                if (response.value > 7) {
                    $(span).removeClass();
                    $(span).addClass("highUV")
                }
                
                if (response.value < 4) {
                    $(span).removeClass();
                    $(span).addClass("lowUV")
                }
                if(response.value > 4 && response.value < 7) {
                    $(span).removeClass();
                    $(span).addClass("warningUV")
                }

                currentUV.addClass("UV");
                currentTemp.append(currentUV);
                // currentUV.append("UV Index: " + response.value);
            });

        });

        // Start call for 5-day forecast 
        $.ajax({
            url: urlFiveDay,
            method: "GET"
        }).then(function (response) {
            // Array for 5-days 

            console.log(response);

            var screenshotDay = [0, 8, 16, 24, 32];
            var fiveDayForecast = $(".fiveDayForecast").addClass("card-body");
            var fiveDayDiv = $(".listOfFiveDay").addClass("card-text");
            fiveDayDiv.empty();
            // For each for 5 days
            screenshotDay.forEach(function (i) {
                var FiveDayTime = new Date(response.list[i].dt * 1000);
                FiveDayTime = FiveDayTime.toLocaleDateString("en-US");

                fiveDayDiv.append("<div class=fiveDayColor>" + "<p>" + FiveDayTime + "</p>" + `<img src="https://openweathermap.org/img/wn/${response.list[i].weather[0].icon}@2x.png">` 
                + "<p>" + "Temperature: " + response.list[i].main.temp + "°F" + "</p>" + "<p>" + "Humidity: " + response.list[i].main.humidity + "%" + "</p>" + "</div>");


            })

        });
    }
});

//function for accessing past inputs
//inputs appended as buttons, which will grab previous data
pastButton.on("click", "button", function(e) {
    e.preventDefault();

    var cityName = $(this).text();

    // current weather (NEED TO INCLUDE IMPERIAL UNITS TO NEGATE KELVIN DEFAULT.)
    var urlCurrent = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&Appid=" + apiKey + "&units=imperial";
    // five day forecast (NEED TO INCLUDE IMPERIAL UNITS TO NEGATE KELVIN DEFAULT.)
    var urlFiveDay = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&Appid=" + apiKey + "&units=imperial";


    if (cityName == "") {
        console.log(cityName);
    } else {
        $.ajax({
            url: urlCurrent,
            method: "GET"
        }).then(function (response) {
            
            
            console.log("Search input: " + response.name + "; " + response.main.temp + " degrees F; " + response.main.humidity + "% Humidity; " 
            + response.wind.speed + "MPH");

            //var cityName = $(".list-group").addClass("list-group-item");
            //cityName.append("<button>" + response.name + "</button>"); //add button element
            // Local storage
            var local = localStorage.setItem(keyCount, response.name);
            keyCount = keyCount + 1;

            // Start Current Weather append
            //how? appending as <p> text
            //need to add class for div

            var currentForecast = $(".currentForecast").append("<div>").addClass("card-body");
            currentForecast.empty();
            var currentName = currentForecast.append("<p>");
            // .addClass("card-text");
            currentForecast.append(currentName);

            // Adjust Date 
            var timeUTC = new Date(response.dt * 1000);
            currentName.append(response.name + " " + timeUTC.toLocaleDateString("en-US"));
            currentName.append(`<img src="https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png">`);
           //temperature
            var currentTemp = currentName.append("<p>");
            // .addClass("card-text");
            currentName.append(currentTemp);
            currentTemp.append("<p>" + "Temperature: " + response.main.temp + "°F" + "</p>");
            //humidity, in %
            currentTemp.append("<p>" + "Humidity: " + response.main.humidity + "%" + "</p>");
            //wind speed in MPH 
            currentTemp.append("<p>" + "Wind Speed: " + response.wind.speed + "MPH" + "</p>");

            // UV Index URL
            var urlForUV = `https://api.openweathermap.org/data/2.5/uvi?appid=86f0b50d034902d364600f3d102c19e6&lat=${response.coord.lat}&lon=${response.coord.lon}`;

             // UV Index
             $.ajax({
                url: urlForUV,
                method: "GET"
            }).then(function (response) {

                var currentUV = currentTemp.append("<span>" + "UV Index: " + response.value + "</span>").addClass("card-text");

                if (response.value > 7) {
                    $(span).removeClass();
                    $(span).addClass("highUV")
                }
                
                if (response.value < 4) {
                    $(span).removeClass();
                    $(span).addClass("lowUV")
                }
                if (response.value > 4 && response.value < 7) {
                    $(span).removeClass();
                    $(span).addClass("warningUV")
                }

                currentUV.addClass("UV");
                currentTemp.append(currentUV);
                
            });

        });

        // Start call for 5-day forecast 
        $.ajax({
            url: urlFiveDay,
            method: "GET"
        }).then(function (response) {
            // Array for 5-days 

            console.log(response);

            var screenshotDay = [0, 8, 16, 24, 32];
            var fiveDayForecast = $(".fiveDayForecast").addClass("card-body");
            var fiveDayDiv = $(".listOfFiveDay").addClass("card-text");
            fiveDayDiv.empty();
            // For each for 5 days
            screenshotDay.forEach(function (i) {
                var FiveDayTime = new Date(response.list[i].dt * 1000);
                FiveDayTime = FiveDayTime.toLocaleDateString("en-US");

                fiveDayDiv.append("<div class=fiveDayColor>" + "<p>" + FiveDayTime + "</p>" + `<img src="https://openweathermap.org/img/wn/${response.list[i].weather[0].icon}@2x.png">` 
                + "<p>" + "Temperature: " + response.list[i].main.temp + "°F" + "</p>" + "<p>" + "Humidity: " + response.list[i].main.humidity + "%" + "</p>" + "</div>");


            })

        });
    }
});
