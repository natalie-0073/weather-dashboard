$(document).ready(function () {
    const now = dayjs();
    const todayDate = now.format('D/M/YYYY');
    $('.current-date').text(`${todayDate}`);
});

function getCoordinates(city) {
    const geocodingApiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(city)}&key=70b902906daa442eade55861bb014ad5`;

    return fetch(geocodingApiUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            const firstResult = data.results[0];
            const coordinates = firstResult.geometry;
            return coordinates;
        });
}

function getForecast(city) {
    getCoordinates(city)
        .then(function (coordinates) {
            const apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lng}&appid=5f472b7acba333cd8a035ea85a0d4d4c&units=metric`;

            return fetch(apiUrl);
        })
        .then(function (response) {
            return response.json();
        })
        .then(function displayContent(data) {
            console.log(data);

            $('.today-temp').text(Math.floor(data.current.temp));
            $('.today-wind').text(data.current.wind_speed);
            $('.today-humidity').text(data.current.humidity);

            // Clear previous forecast data
            $('.forecast-temp').text('');
            $('.forecast-wind').text('');
            $('.forecast-humidity').text('');

            // Update forecast data
            $('.forecast-temp').each(function (index, element) {
                $(element).text(Math.floor(data.daily[index].temp.eve));
            });
            $('.forecast-wind').each(function (index, element) {
                $(element).text(Math.floor(data.daily[index].wind_speed));
            });
            $('.forecast-humidity').each(function (index, element) {
                $(element).text(Math.floor(data.daily[index].humidity));
            });
        });
}

// Attach an event listener to the form
$('.form').submit(function (event) {
    event.preventDefault(); // Prevent the default form submission behavior
    const cityName = $('.search-city').val();
    $('.city-name').text($('.search-city').val()); // Get the value from the input field
    getForecast(cityName); // Call the getForecast function with the city name
});

// Assuming you have a button with class 'button-search' that triggers the form submission
$('.button-search').on('click', function () {
    $('.form').submit(); // Manually trigger the form submission when the button is clicked
});
