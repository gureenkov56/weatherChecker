

// state & data
let isShowCityList = false;

let city = "Vladivostok";
const apiKey = "dd6ccc78d1334bce8efc95b752b2267e";

let currentWeatherUrl = `https://api.weatherbit.io/v2.0/current?key=${apiKey}&city=${city}`;
let dailyForecastUrl = `http://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=${apiKey}`;
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

function changeCityAnimation(){
  toggleShowCityList();
  toggleColorGeo();
  toggleShowWhiteBgc();
  isShowCityList = !isShowCityList;
}

function setNewCity(newCity){
  console.log(newCity);
  city = newCity;
  getResponses();
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

async function sendRequestForecast(){
  dailyForecastUrl = `http://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=${apiKey}`;
  try{
    let forecast = await fetch(dailyForecastUrl);
    return forecast.json();
  } catch(e) {
    console.error(e);
  }
}

async function getResponses(){
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
  let currentWeatherTemplate = `
    
    <p class="city" onclick='changeCity()' >${city}</p>

    <p class="temperature">${temp}</p>
    <p class="weatherName">${weatherName}</p>
  `;
  currentWeather.innerHTML = currentWeatherTemplate;
}

function addForecastTemplate(forecast){
  let forecastTemplate = ``;  

  for(let key in forecast.data){
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

function toggleShowWhiteBgc(){
  if(isShowCityList){
    whiteBgc.style.cssText = 'opacity: 0;'
    let timer = setTimeout(() => {
      whiteBgc.style.cssText = "display: none;";
    }, 1000)
    clearTimeout(timer);
  } else {
    whiteBgc.style.cssText = "display: block; opacity: 1;";
  }
}

function toggleColorGeo(){
  if(isShowCityList){
    geoBlock.style.cssText = 'color: white;';
    geoBlockIcon.style.cssText = "filter: brightness(0) invert(1);";
  } else {
    geoBlock.style.cssText = "color: black;";
    geoBlockIcon.style.cssText = "filter: brightness(0) invert(0);";
  }
}

function toggleShowCityList() {
  if (isShowCityList) {
    cityList.style.cssText = "opacity: 0;";
    let timer = setTimeout(() => {
      cityList.style.cssText = "display: none;";
    }, 1000);
    clearTimeout(timer);
  } else {
    cityList.style.cssText = "display: block; opacity: 1;";
  }
}



// functions start
getResponses();