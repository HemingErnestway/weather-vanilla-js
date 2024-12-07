const API_KEY = "0b30690443314924aa9212118240512";
const BASE_URL = "http://api.weatherapi.com/v1";

export async function getCurrentWeather(location) {
  const url = `${BASE_URL}/current.json?lang=ru&key=${API_KEY}&q=${location}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return {
      location: {
        name: data.location.name,
        country: data.location.country,
      },
      upd_time: data.current.last_updated,
      temp: data.current.temp_c,
      feels_like: data.current.feelslike_c,
      condition: {
        text: data.current.condition.text,
        icon: data.current.condition.icon,
      },
      wind: (data.current.wind_kph * 1000 / 60 / 60).toFixed(1),
      pressure: Math.floor(data.current.pressure_in * 25.4),
      humidity: data.current.humidity,
    };
  } catch (e) {
    console.error(e);
  }
}
