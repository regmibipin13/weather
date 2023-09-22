let response = placeSearch({
    key: '375JSGWwMUuznJ0NMbu3ahgkm6jSxLM8',
    container: document.querySelector('#location')
});

response.on('change',(e) => {
    const lat = e.result.latlng.lat
    const long = e.result.latlng.lng

    fetch('/weather',{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'Accept':'application/json',
        },
        body:JSON.stringify({
            lat:lat,
            lng:long
        })
    }).then((response) => response.json()).then((data) => {
        console.log(data)
        setWeather(data.location, data.weather)
    })
})


var currentLocation = document.querySelector('[data-current-location]');
var wind = document.querySelector('[data-wind]');
var temp = document.querySelector('[data-temp]');
var humid = document.querySelector('[data-humid]');
var cloud = document.querySelector('[data-cloud]');
var icon = document.querySelector('.current-weather-icon');
var text = document.querySelector('.condition-text');
icon.innerHTML = "<i class='bx bx-sun'></i>"

function setWeather(location, weather) {
    currentLocation.innerHTML = `${location.name}, ${location.country}`
    wind.innerHTML = `${weather.wind_kph} kph`
    temp.innerHTML = `${weather.temp_c}° C`
    humid.innerHTML = `${weather.humidity}`
    cloud.innerHTML = `${weather.cloud}`
    text.innerHTML = `${weather.condition.text}`
    if(weather.condition.icon) {
        icon.innerHTML = `<img src='${weather.condition.icon}' alt='${weather.condition.text}'>`;
    }

}
