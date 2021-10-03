
// API_KEY for maps api
let API_KEY = "a8e71c9932b20c4ceb0aed183e6a83bb";
const searchForm = document.getElementById('search-form');
const cardHeader = document.getElementById('card-header');

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const city = document.getElementById('city-input').value;
    getWeatherData(city)
    .then((response) => {
    //   console.log(response);
      showWeatherData(response);
    }).catch((error) => {
        console.log(error);
    })
});

getWeatherData = (city) => {
  const URL = "https://api.openweathermap.org/data/2.5/weather";
  const SEARCH_URL = `${URL}?q=${city}&appid=${API_KEY}&units=metric`;

  const weatherPromise = fetch(SEARCH_URL);
  return weatherPromise.then((response) => {
            return response.json();
        });
}

showWeatherData = (weatherData) => {
  const cityName = document.getElementById('city-name');
  const country = document.getElementById('country');
  const sunrise = document.getElementById('sunrise');
  const sunset = document.getElementById('sunset');
  const weatherType = document.getElementById('weather-type');
  const temp = document.getElementById('temp');
  const minTemp = document.getElementById('min-temp');
  const maxTemp = document.getElementById('max-temp');
  const humidity = document.getElementById('humidity');
  const pressure = document.getElementById('pressure');
  const wind = document.getElementById('wind');

  if( weatherData.weather[0].main == 'Haze') {
    cardHeader.style.backgroundImage = "url('images/haze.jpg')";
  }
  else if( weatherData.weather[0].main == 'Clouds') {
    cardHeader.style.backgroundImage = "url('images/cloudy.jpg')";
  }
  else if( weatherData.weather[0].main == 'Clear') {
    cardHeader.style.backgroundImage = "url('images/sunny.jpg')";
  }

  
  cityName.innerHTML = weatherData.name;
  country.innerHTML = weatherData.sys.country;
  sunrise.innerHTML = convertTime(weatherData.sys.sunrise);
  sunset.innerHTML = convertTime(weatherData.sys.sunset);
  weatherType.innerHTML = weatherData.weather[0].main;
  temp.innerHTML = weatherData.main.temp;
  minTemp.innerHTML = weatherData.main.temp_min;
  maxTemp.innerHTML = weatherData.main.temp_max;
  pressure.innerHTML = weatherData.main.pressure;
  humidity.innerHTML = weatherData.main.humidity;
  wind.innerHTML = weatherData.wind.speed;
  
}



convertTime = (unixTime) => {
    const milliseconds = unixTime * 1000;
    const dateObject = new Date(milliseconds);
    const humanDateFormat = dateObject.toLocaleString("en-US", {hour: "numeric", minute: "numeric"});  

    return humanDateFormat;
}