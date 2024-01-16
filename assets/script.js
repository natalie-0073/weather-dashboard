
$(document).ready(function(){
    const now=dayjs();
    const todayDate=now.format('D/M/YYYY');
    $('.current-date').text(`${todayDate}`);
})


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
        });
}


const cityName = 'London'; 
getForecast(cityName);


