const apiKey = '8353715845345397b60dfc0dda2a61d5';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

const searchBox = document.querySelector('.input-city');
const searchBtn = document.querySelector('.search-btn');
const weatherIcon = document.querySelector('.weather-icon');
const degBtns = document.querySelectorAll('.weather-deg');
const tempDisplay = document.querySelector('.weather-temp');

let currentTemp = parseFloat(tempDisplay.innerHTML);
let currentUnit = 'C';

const convertTemp = (temp, unit) => {
    if (unit === 'F') {
        return (temp * 1.8) + 32;
    } else {
        return (temp - 32) / 1.8;
    }
};

const getIconWeather = (param) => {
    if(param == "Clouds") {
        weatherIcon.src = require("../img/cloudy.png");
    } else if(param == "Clear") {
        weatherIcon.src = require("../img/clear.png");
    } else if(param == "Rain") {
        weatherIcon.src = require("../img/rain.png");
    } else if(param == "Mist") {
        weatherIcon.src = require("../img/mist.png");
    } else if(param == "Snow") {
        weatherIcon.src = require("../img/snow.png");
    } else if(param == "Windy") {
        weatherIcon.src = require("../img/windy.png");
    }
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert("Геопозиция не поддерживается браузером.");
    }
}

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    var data = await response.json();

    document.querySelector('.weather-city').innerHTML = data.name;
    document.querySelector('.weather-temp').innerHTML = Math.round(data.main.temp);
    currentTemp = Math.round(data.main.temp);
    document.querySelector('.weather-params').innerHTML = data.weather[0].main;

    getIconWeather(data.weather[0].main);

    currentUnit = "C";
    degBtns.forEach((btn) => btn.classList.remove('active'));
    document.querySelector('[data-unit="C"]').classList.add('active');
}

async function showPosition(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`);
    const data = await response.json();
    document.querySelector('.weather-city').innerHTML = data.name;
    document.querySelector('.weather-temp').innerHTML = Math.round(data.main.temp);
    currentTemp = Math.round(data.main.temp);
    document.querySelector('.weather-params').innerHTML = data.weather[0].main;

    getIconWeather(data.weather[0].main);
}

window.onload = () => {
    getLocation();
}

searchBtn.addEventListener('click', () => {
    checkWeather(searchBox.value);
});

degBtns.forEach((degBtn) => {
    degBtn.addEventListener('click', () => {
        degBtns.forEach((btn) => btn.classList.remove('active'));
        degBtn.classList.add('active');

        const unit = degBtn.getAttribute('data-unit');
        if (unit !== currentUnit) {
            if (unit === 'F') {
                currentTemp = convertTemp(currentTemp, 'F');
            } else {
                currentTemp = convertTemp(currentTemp, 'C');
            }
            tempDisplay.innerHTML = currentTemp.toFixed(0);
            currentUnit = unit;
        }
    });
});