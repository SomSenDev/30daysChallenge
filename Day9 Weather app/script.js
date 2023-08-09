

async function fetchWeather(city) {
    try {
        const apiKey = "41ea4c8919ae5c80a43f381d96fbcecc"; // Replace with your API key
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        const data = await response.json();

        const temperature = (data.main.temp).toFixed(1);

        const location = data.name + ", " + data.sys.country;

        const iconCode = data.weather[0].icon;

        const weatherStatus = data.weather[0].description;

        document.querySelector('.temperature').innerHTML = temperature + "°C";
        document.querySelector('.location').innerHTML = location;
        document.querySelector('.weather-icon').src = "http://openweathermap.org/img/w/" + iconCode + ".png";
        document.querySelector('.weather-status').innerHTML = weatherStatus;

    } catch (error) {
        alert("City not found!");
    }
}

//forcast weather
async function fetchForcast(city) {
    try {
        const apiKey = "41ea4c8919ae5c80a43f381d96fbcecc"; // Replace with your API key
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`);
        const data = await response.json();
        const forcastList = data.list;
        const forecastBox = document.querySelector('.forecast-box');
        forecastBox.innerHTML = "";
        forcastList.forEach((item, index) => {
            if (index % 8 == 0) {
                const date = new Date(item.dt_txt);
                const day = date.getDay();
                const dayName = getDayName(day);
                const temperature = (item.main.temp).toFixed(1);
                const iconCode = item.weather[0].icon;
                const weatherStatus = item.weather[0].description;
                forecastBox.innerHTML += `
                <div class="forecast">
                    <div class="day">${dayName}</div>
                    <div class="temperature">${temperature}°C</div>
                    <div class="icon">
                        <img src="http://openweathermap.org/img/w/${iconCode}.png" alt="">
                    </div>
                    <div class="weather-status">${weatherStatus}</div>
                </div>
                `;
            }
        });
    }catch (error) {
        alert("City not found!");
        console.log(error);
    }

}

function getDayName(day) {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return daysOfWeek[day];
  }






const btn = document.querySelector('.btn');

btn.addEventListener('click', () => {
    const input = document.querySelector('.search-bar');
    if(input.value != ''){
        fetchWeather(input.value);
        fetchForcast(input.value);
    }
});
