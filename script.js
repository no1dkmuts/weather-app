
const tempElement = document.querySelector('.temperature-value p');
const iconElement = document.querySelector('.weather-icon');
const locationElement = document.querySelector('.location p');
const descriptionElement = document.querySelector('.temperature-description p');
const notifiElement = document.querySelector('.notification');
const Kelvin = 273;
const key = "41e5315fb3c3f63dda1c45cb34a193a3";
var weather = {};
weather.temperature = {
    unit: "celsius"
}



if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition);
} else {
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Browser doesn't Support Geolocation</p>";
}


function setPosition(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    getWeather(latitude, longitude);
}

function getWeather(latitude, longitude) {
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
    fetch(api)
        .then(function (response) {
            var data = response.json();
            return data;
        })
        .then(function (data) {
            console.log(data);
            weather.temperature.value = Math.round(data.main.temp-Kelvin);
            weather.city = data.name;
            weather.country = data.sys.country;
            weather.icon = data.weather[0].icon;
            weather.description=data.weather[0].description;
        })
        .then(function(){
            display();
        })
}


function display(){
    iconElement.innerHTML=`<img src="icons/${weather.icon}.png">`;
    locationElement.innerHTML=`${weather.city} ${weather.country}`;
    descriptionElement.innerHTML=weather.description;
    tempElement.innerHTML=`${weather.temperature.value}-°C`;
}



tempElement.addEventListener("click",function(){
    if(weather.temperature.unit=="celsius"){
        tempElement.innerHTML=`${Math.floor(weather.temperature.value*9/5+32)}-°F`
        
        weather.temperature.unit="Fahrenheit"
    }else{
        tempElement.innerHTML=`${weather.temperature.value}-°C`; 
        weather.temperature.unit="celsius"; 
    }
})