// state & data
let isShowCityList = false;

let city = "Moscow";
const apiKey = "dd6ccc78d1334bce8efc95b752b2267e";

let currentWeatherUrl = `https://api.weatherbit.io/v2.0/current?key=${apiKey}&city=${city}`;
let dailyForecastUrl = `http://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=${apiKey}`;

const body = document.querySelector("body");
const currentWeather = document.querySelector(".currentWeather");
const forecast16days = document.querySelector(".forecast__16days");
const geoBlock = document.querySelector(".geoBlock");
const geoBlockIcon = document.querySelector(".geoBlock > p > img");
const whiteBgc = document.querySelector(".whiteBgc");
const cityList = document.querySelector(".cityList");

const month = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

//functions

function changeCityAnimation() {
  toggleShowCityList();
  toggleColorGeo();
  toggleShowWhiteBgc();
  isShowCityList = !isShowCityList;
}

function setNewCity(newCity) {
  if (city !== newCity) {
    city = newCity;
    getResponses();
    setLoadingStatusInHTML();
  }
  changeCityAnimation();
}

// async functions
async function sendRequestCurrent() {
  currentWeatherUrl = `https://api.weatherbit.io/v2.0/current?key=${apiKey}&city=${city}`;
  try {
    let current = await fetch(currentWeatherUrl);
    return current.json();
  } catch (e) {
    console.error(e);
  }
}

async function sendRequestForecast() {
  dailyForecastUrl = `http://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=${apiKey}`;
  try {
    let forecast = await fetch(dailyForecastUrl);
    return forecast.json();
  } catch (e) {
    console.error(e);
  }
}

async function getResponses() {
  let current = await sendRequestCurrent();
  console.log(current);
  addCurrentWeatherTemplate(
    city,
    current.data[0].app_temp,
    current.data[0].weather.description
  );

  let forecast = await sendRequestForecast();
  addForecastTemplate(forecast);
}

// DOM functions
function addCurrentWeatherTemplate(city, temp, weatherName) {
  switch (weatherName) {
    case "Thunderstorm with light rain":
    case "Thunderstorm with rain":
    case "Thunderstorm with heavy rain":
    case "Thunderstorm with light drizzle":
    case "Thunderstorm with drizzle":
    case "Thunderstorm with heavy drizzle":
    case "Thunderstorm with Hail":
      body.style.cssText =
        "background-image: url('./assets/images/Thunderstorm.jpg');";
      break;
    case "Light Drizzle":
    case "Drizzle":
    case "Heavy Drizzle":
    case "Light Rain":
    case "Light rain":
    case "Moderate Rain":
    case "Light shower rain":
    case "Shower rain":
    case "Heavy shower rain":
    case "Heavy Rain":
      body.style.cssText = "background-image: url('./assets/images/rain.jpg');";
      break;
    case "Light snow":
    case "Heavy Snow":
    case "Mix snow/rain":
    case "Sleet":
    case "Snow shower":
    case "Heavy sleet":
    case "Heavy snow shower":
    case "Snow":
    case "Flurries":
    case "Snow":
    case "Snow":
      body.style.cssText = "background-image: url('./assets/images/snow.jpg');";
      break;
    case "Mist":
    case "Smoke":
    case "Haze":
    case "Sand/dust":
    case "Fog":
    case "Freezing Fog":
    case "Fog":
      body.style.cssText = "background-image: url('./assets/images/snow.jpg');";
      break;
    case "Clear sky":
    case "Few clouds":
    case "Unknown Precipitation":
      body.style.cssText =
        "background-image: url('./assets/images/sunny.jpg');";
      break;
    case "Scattered Clouds":
    case "Scattered clouds":

    case "Broken clouds":
    case "Overcast clouds":
    case "Few clouds":
    case "Few clouds":
      body.style.cssText =
        "background-image: url('./assets/images/clouds.jpeg');";
      break;
    default:
      body.style.cssText =
        "background-image: url('./assets/images/sunny.jpeg');";
      break;
  }

  let currentWeatherTemplate = `
    
    <p class="city">${city}</p>

    <p class="temperature">${temp} °С</p>
    <p class="weatherName">${weatherName}</p>
  `;
  currentWeather.innerHTML = currentWeatherTemplate;
}

function addForecastTemplate(forecast) {
  let forecastTemplate = ``;

  for (let key in forecast.data) {
    let date = new Date(forecast.data[key].datetime);

    forecastTemplate += `
      <div class='forecast__16days__item'>
        <div class='forecast__16days__item__date'>
          <p>${date.getDate()} ${month[date.getMonth()]}
        </div>

        <img class='forecast__16days__item__icon' src='https://www.weatherbit.io/static/img/icons/${
          forecast.data[key].weather.icon
        }.png' >
        
        <div class='forecast__16days__item__temp'>
          <p>
            ${forecast.data[key].app_max_temp} 
            / 
            <span class='forecast__16days__item__lowTemp'>${
              forecast.data[key].low_temp
            }<span>
          </p>
        </div>
      </div>`;
  }

  forecast16days.innerHTML = forecastTemplate;
}

function toggleShowWhiteBgc() {
  if (isShowCityList) {
    whiteBgc.style.cssText = "opacity: 0; height: 10%";
  } else {
    whiteBgc.style.cssText = "opacity: 1; height: 100%";
  }
}

function toggleColorGeo() {
  if (isShowCityList) {
    geoBlock.style.cssText = "color: white;";
    geoBlockIcon.style.cssText = "filter: brightness(0) invert(1);";
  } else {
    geoBlock.style.cssText = "color: black;";
    geoBlockIcon.style.cssText = "filter: brightness(0) invert(0);";
  }
}

function toggleShowCityList() {
  if (isShowCityList) {
    cityList.style.cssText = "opacity: 0; display: none;";
  } else {
    cityList.style.cssText = "opacity: 1; display: block;";
  }
}

function setLoadingStatusInHTML() {
  currentWeather.innerHTML = "<p>Loading...</p>";
  forecast16days.innerHTML = "<p>Loading...</p>";
  body.style.cssText = "background-image: url('none');";
}

// functions start
getResponses();
