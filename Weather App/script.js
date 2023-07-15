const apiKey = "e4a3a3f2977625f2534ab8e39994d7d0";

const weatherData = document.querySelector("#weatherData")

const cityInput = document.querySelector("#cityInput")

const form = document.querySelector("form")

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const cityValue = cityInput.value;
    getWeatherData(cityValue);
})

async function getWeatherData(cityValue){
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`)

        if(!response.ok){
            throw new Error("Network response is not ok!")
        }

        const data = await response.json();

        const temperature = Math.round(data.main.temp);
        const description = data.weather[0].description;
        const icon = data.weather[0].icon;
        const details = [
            `Fells like: ${Math.round(data.main.feels_like)}°C`,
            `Humidity: ${data.main.humidity}%`,
            `Wind Speed: ${data.wind.speed}m/s`
        ]


        weatherData.querySelector('.icon').innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">`

        weatherData.querySelector('.temperature').innerHTML = `${temperature}°C`;

        weatherData.querySelector('.description').textContent = description

        weatherData.querySelector('.details').innerHTML = details.map((detail) => ` <div> ${detail} </div> `).join("")


    } catch (error) {
        weatherData.querySelector('.icon').innerHTML = ""

        weatherData.querySelector('.temperature').innerHTML = "";

        weatherData.querySelector('.description').textContent = "Check Your Network or Please Come After Some Time!"

        weatherData.querySelector('.details').innerHTML = ""
    }
}