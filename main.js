// state & data
let city = "Vladivostok";
const apiKey = "dd6ccc78d1334bce8efc95b752b2267e";

const currentWeatherUrl = `https://api.weatherbit.io/v2.0/current?key=${apiKey}&city=${city}`;
const dailyForecastUrl = `http://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=${apiKey}`;
const currentWeather = document.querySelector(".currentWeather");
const forecast16days = document.querySelector(".forecast__16days");

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


// functions
async function sendRequestCurrent() {
  try {
    let current = await fetch(currentWeatherUrl);
    let currentResult = await current.json();
    addCurrentWeatherTemplate(
      city,
      currentResult.data[0].app_temp,
      currentResult.data[0].weather.description
    ); 
  } catch (e) {
    console.error(e);
  }
}

async function sendRequestForecast(){
  let forecast = await fetch(dailyForecastUrl);
  return forecast.json();
}

async function getResponses(){
  let forecast = await sendRequestForecast();
  addForecastTemplate(forecast);
}


// DOM functions
function addCurrentWeatherTemplate(city, temp, weatherName) {
  let currentWeatherTemplate = `
    <p class="city">${city}</p>
    <p class="temperature">${temp}</p>
    <p class="weatherName">${weatherName}</p>
  `;
  currentWeather.innerHTML = currentWeatherTemplate;
}

function addForecastTemplate(forecast){
  let forecastTemplate = ``;
  console.dir(forecast);
  

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



// functions start
sendRequestCurrent();

getResponses();