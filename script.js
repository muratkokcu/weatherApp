const searchInput = document.getElementById('searchWeather');
const form = document.getElementById('form');

// Submit EventListener
form.addEventListener('submit', setWeatherQuery)

// setting up query
function setWeatherQuery(e) {
    e.preventDefault();
    let input = searchInput.value;
    if (input) {
        getWeatherResults(input);
    }
    searchInput.value = '';
}
// OpenWeatherMap url and api
const url = 'https://api.openweathermap.org/data/2.5/';
const apiKey = 'APIKEY';

// Get Weather Results by City Name
async function getWeatherResults(cityName) {
    const resp = await fetch(`${url}weather?q=${cityName}&appid=${apiKey}&units=metric&lang=en`);
    const respData = await resp.json();
    const weatherApi = respData;
    console.log('weatherApi', weatherApi)

    const temp = document.querySelector('.temp');
    temp.innerText = `${Math.floor(weatherApi.main.temp)}°C`;
    const city = document.querySelector('.city');
    city.innerText = `${weatherApi.name}, ${weatherApi.sys.country}`;
    const desc = document.querySelector('.desc');
    desc.innerText = `${weatherApi.weather[0].description}`;
    const iconEl = document.querySelector('.icon');
    iconEl.src = `https://openweathermap.org/img/wn/${weatherApi.weather[0].icon}@2x.png`;
    const minmax = document.querySelector('.minmax');
    minmax.innerText = `Min/Max: ${Math.floor(weatherApi.main.temp_min)}°C / ${Math.floor(weatherApi.main.temp_max)}°C`;
    const humidity = document.querySelector('.humidity');
    humidity.innerText = `Humidity: ${weatherApi.main.humidity}%`;
}