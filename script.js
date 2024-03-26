// import api-key from "./data.json";
import key from './data.json';

let city = document.getElementById("city");
let searchBtn = document.getElementById("search-btn");

let units = "&units=metric";
let place = document.getElementById("city");
let weatherData = document.querySelector(".weather-data");

// event listener - input field
city.addEventListener("focus",onFocus);
city.addEventListener("focusout",()=> {
    if (place.value === "") {
        document.querySelector(".city-name").classList.remove("active");
    }
});
searchBtn.addEventListener("click",offFocus);

// function - input field
function onFocus () {
    document.querySelector(".city-name").classList.add("active");
}

function offFocus () {
    document.querySelector(".city-name").classList.remove("active");
}


// async function to fetch data
async function getWeather (city) {
    try {

        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${place.value}&appid=${key['api-key']}${units}`);
        let data = await response.json();
        console.log(data);
        document.getElementById("city").value = "";
        
        let name = data.name;
        let temp = Math.round(data.main.temp);
        let weather = data.weather[0].main;
        let wind = Math.round(data.wind.speed);
        let humid = data.main.humidity;
        
        weatherData.innerHTML = `
        <h2 id="city-name">${name}</h2>
        <div id = "temp-condition"><p class = "temp">${temp}\xB0 C</p><p class="weather">${weather}</div>
        <div class = "show">
        <div id = "temp-wind-display"><p class = "head">Humidity:</p><p class = "info">${humid}%</p></div>
        <div id = "temp-wind"><p class = "head">Wind:</p><p class = "info">${wind} km/h</p></div>
        </div>
        `;
        
    } catch(error) {
        document.getElementById("city").value = "";
        weatherData.innerHTML = "<p style = 'font-size: 32px'>Error: City not found</p>";
    }
    }


getWeather();


// event listener to search
document.querySelector(".weather-form").addEventListener("submit", (e)=> {
    e.preventDefault();
    getWeather(place.value);
    weatherData.style.display = "flex";
})