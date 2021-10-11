// state & data
let city = "Moscow";
const apiKey = "dd6ccc78d1334bce8efc95b752b2267e";
const currentWeatherUrl = `https://api.weatherbit.io/v2.0/current?key=${apiKey}&city=${city}`;
const minutelyForecastUrl = `https://api.weatherbit.io/v2.0/forecast/minutely?key=${apiKey}&city=${city}`;
const currentWeather = document.querySelector(".currentWeather");

// functions
async function sendRequest() {
  try {
    let response = await fetch(currentWeatherUrl);
    let data = await response.json();
    console.dir(data.data[0]);
    addCurrentWeatherTemplate(
      city,
      data.data[0].app_temp,
      data.data[0].weather.description
    );
  } catch (e) {
    console.error(e);
  }
}

function addCurrentWeatherTemplate(city, temp, weatherName) {
  let currentWeatherTemplate = `
    <p class="city">${city}</p>
    <p class="temperature">${temp}</p>
    <p class="weatherName">${weatherName}</p>
  `;
  currentWeather.innerHTML = currentWeatherTemplate;
}

// functions start
sendRequest();
