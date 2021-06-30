const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];
const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];
const searchInput = document.getElementById('searchWeather');
const form = document.getElementById('form');
const dateEl = document.getElementById('date');

let tempDate = new Date();
let tempYear = tempDate.getFullYear();
let tempMonth = tempDate.getMonth();
let tempDay = tempDate.getDate();
let temptoday = tempDate.getDay();

console.log(weekdays[temptoday], months[tempMonth], tempDay, tempYear);

dateEl.textContent = `${weekdays[temptoday]}, ${months[tempMonth]} ${tempDay}, ${tempYear}`;

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
// OpenWeatherMap.org url and api
const url = 'https://api.openweathermap.org/data/2.5/';
const apiKey = 'INSERT_YOUR_WEATHER_API_KEY';

// Get Weather Results by City Name
async function getWeatherResults(cityName) {
    const resp = await fetch(`${url}weather?q=${cityName}&appid=${apiKey}&units=metric&lang=en`);
    const respData = await resp.json();
    const weatherApi = respData;

    // Main Temp
    const temp = document.querySelector('.temp');
    temp.innerText = `${Math.floor(weatherApi.main.temp)}°c`;

    // Location
    const city = document.querySelector('.city');
    city.innerText = `${weatherApi.name}, ${weatherApi.sys.country}`;

    // Weather Description
    const desc = document.querySelector('.desc');
    desc.innerText = `${weatherApi.weather[0].description}`;

    // Weather Icon
    const iconEl = document.querySelector('.icon');
    iconEl.src = `https://openweathermap.org/img/wn/${weatherApi.weather[0].icon}@2x.png`;

    // Weather min/max degree
    const minmax = document.querySelector('.minmax');
    minmax.innerText = `Min/Max: ${Math.floor(weatherApi.main.temp_min)}°C / ${Math.floor(weatherApi.main.temp_max)}°C`;

    // Humidity
    const humidity = document.querySelector('.humidity');
    humidity.innerText = `Humidity: ${weatherApi.main.humidity}%`;

    // 
}