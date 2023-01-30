const api = {
    key: "cb65f39416d84ca6ab64d69724be8605",
    base:"https://timezone.abstractapi.com/v1/current_time/?api_key="
}

const api2 = {
    key: "5c629cb0399a4a91bf5e16bab945a5e8",
    base: "https://api.openweathermap.org/data/2.5/"
  }


const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

let myloc = 'Kuantan';
runfunction();
setInterval(runfunction, 60000);

function runfunction(){
    getResultsWeather(myloc);
    getResults(myloc);
}

function setQuery(evt){
    if(evt.keyCode == 13){
        getResults(searchbox.value);
        getResultsWeather(searchbox.value);
        myloc = searchbox.value;
    }
}

function getResults(query){
    fetch(`${api.base}${api.key}&location=${query}`)
    .then(mytimezone => {
        return mytimezone.json();
    }).then(displayResults);
}

function getResultsWeather (query) {
    fetch(`${api2.base}weather?q=${query}&units=metric&APPID=${api2.key}`)
      .then(weather => {
        return weather.json();
      }).then(displayResultsWeather);
  }

function displayResults(mytimezone){
    let datetime = mytimezone.datetime;
    const datetime_array = datetime.split(" ");
    document.getElementById('myclock').innerText = datetime_array[1];
    document.getElementById('mydate').innerText = `Date: ${datetime_array[0]}`;

}

function displayResultsWeather(weather){
    document.getElementById('temperature').innerText = `Temperature: ${Math.round(weather.main.temp)}°c`;
    document.getElementById('current_location').innerText = `Location: ${weather.name}`;
    document.getElementById('weather_status').innerText = `Weather: ${weather.weather[0].main}`;
}