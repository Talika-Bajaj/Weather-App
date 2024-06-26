async function fetchWeather() {
    const city = document.getElementById('cityInput').value;
    const mykey = key.api_key;
const units = "&units=metric";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${mykey}${units}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        // console.log(data);
        displayWeather(data);
    } catch (error) {
        console.error('Error fetching data');
    }
}

function displayWeather(data) {
    const weatherData = document.querySelector(".weather-data");
    if (data.cod === "404") {
        document.getElementById('cityInput').value = "";
        weatherData.innerHTML = `<p style = 'font-size: 32px'>Error: City not found</p>`;
        // return;
    } else {
        document.getElementById('cityInput').value = "";

        let name = data.name;
        let temp = Math.round(data.main.temp);
        let weatherPlace = data.weather[0].main;
        let icon = data.weather[0].icon;
        let wind = Math.round(data.wind.speed);
        let humid = data.main.humidity;

        weatherData.innerHTML = `
        <h2 id="city-name">${name}</h2>
        <div id = "temp-condition"><p class = "temp">${temp}\xB0 C</p>
        <div id = "icon-weather">
        <img src="https://openweathermap.org/img/wn/${icon}@2x.png" height=80><p class="weather">${weatherPlace}</p>
        </div>
        </div>
        <div class = "show">
        <div id = "temp-wind-display"><p class = "head">Humidity:</p><p class = "info">${humid}%</p></div>
        <div id = "temp-wind"><p class = "head">Wind:</p><p class = "info">${wind} km/h</p></div>
        </div>
        `;
    }
}

document.querySelector(".weather-form").addEventListener("submit", (e) => {
    e.preventDefault();
    // console.log("Hello I am working");
    setTimeout(() => {
        fetchWeather();
    }, 30);

    setTimeout(() => {
        document.querySelector(".weather-data").style.display = "flex";
    }, 500);
});

let searchBtn = document.getElementById("search-btn");
searchBtn.addEventListener("click", offFocus);

// function - input field
function onFocus() {

    document.querySelector(".city-name").classList.add("active");
}

function offFocus() {
    document.querySelector(".city-name").classList.remove("active");
}


const place = document.getElementById('cityInput');
place.addEventListener("focus", onFocus);
place.addEventListener("focusout", () => {
    if (place.value === "") {
        document.querySelector(".city-name").classList.remove("active");
    }
});