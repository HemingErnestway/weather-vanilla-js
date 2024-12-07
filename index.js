import { getCurrentWeather } from "./weather.js";

async function WeatherCard(location) {
  const w = await getCurrentWeather(location);
  return (`
    <div class="weather-card">
      <div class="header">
        <h3 class="location">${w.location.name}, ${w.location.country} </h3>
        <p class="upd-time">${w.upd_time}</p>
      </div>
      <div class="main-info">
        <p class="temp">${w.temp}°</p>
        <img class="condition-icon" src=${w.condition.icon} alt="condition icon">
        <div>
          <p class="condition-text">${w.condition.text}</p>
          <p class="feels-like">Ощущается как ${w.feels_like}°</p>
        </div>
      </div>
      <div class="more-info">
        <p class="wind">Скорость ветра: <span class="value">${w.wind} м/с</span></p>
        <p class="pressure">Давление: <span class="value">${w.pressure} мм рт. ст.</span></p>
        <p class="humidity">Влажность: <span class="value">${w.humidity}%</span></p>
      </div>
    </div>
  `);
}

const $ = document.querySelector.bind(document);

const hotCities = ["Дубай", "Бангкок", "Канкун", "Рио-де-Жанейро", "Гонолулу"];
const russianCities = ["Москва", "Санкт-Петербург", "Новосибирск", "Екатеринбург", "Казань"];

async function render(location) {

  const hotCitiesWeather = await Promise.all(
    hotCities.map(async (city) => await WeatherCard(city))
  );

  const russianCitiesWeather = await Promise.all(
    russianCities.map(async (city) => await WeatherCard(city))
  );

  $("#app").innerHTML = (`
    <div class="wrapper">
      <div class="card-row">
        <div></div>
        <div>
          <h2>Погода</h2>
          <div class="search">
            <input id="search-input" type="text" placeholder="Санкт-Петербург, Россия" />
            <button id="search-button" type="submit">🔍</button>
          </div>
          ${await WeatherCard(location)} 
        </div>
      </div>
    </div>
    <div class="wrapper">
      <h2>Погода в жарких городах</h2>
      <div class="card-row">
        ${hotCitiesWeather.join("")}
      </div>
      <h2>Погода в городах России</h2>
      <div class="card-row">
        ${russianCitiesWeather.join("")}
      </div>
    </div>
  `);
}

await render("Санкт-Петербург");

$("#app").addEventListener("click", async (e) => {
  if (e.target.id === "search-button") {
    const value = $("#search-input").value;
    console.log(value);
    await render(value);
  }
});

