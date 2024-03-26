// import api-key from "./data.json";
import key from './data.json' assert { type: 'json' };

let city = document.getElementById("city");
let searchBtn = document.getElementById("search-btn");

let units = "&units=metric";
let place = document.getElementById("city");
let weatherData = document.querySelector(".weather-data");

city.addEventListener("focus",onFocus);
city.addEventListener("focusout",()=> {
    if (place.value === "") {
        document.querySelector(".city-name").classList.remove("active");
    }
});
searchBtn.addEventListener("click",offFocus);

function onFocus () {
    document.querySelector(".city-name").classList.add("active");
}

function offFocus () {
    document.querySelector(".city-name").classList.remove("active");
}


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
        
        weatherData.innerHTML = `
        <h2 id="city-name">${name}</h2>
        <h3 id = "city-condition">${weather}</h3>
        <div id = "temp-wind"><p>${temp}\xB0 C</p><p><img src="https://freepngimg.com/save/22908-wind-transparent/512x293" alt="wind" height="18px">${wind} km/h</div>
        `;
        
    } catch(error) {
        document.getElementById("city").value = "";
        weatherData.innerHTML = "<p style = 'font-size: 32px'>Error: City not found</p>";
    }
    }


getWeather();


document.querySelector(".weather-form").addEventListener("submit", (e)=> {
    e.preventDefault();
    getWeather(place.value);
    weatherData.style.display = "flex";
})