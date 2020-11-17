import axios from "axios";

export function getWeather(city) {
  const token = process.env.REACT_APP_TOKEN;

  return axios
    .get(
      `http://api.openweathermap.org/data/2.5/forecast?id=${city}&units=metric&APPID=${token}`
    )
    .then((res) => {
      const weather = res.data.list;
      let weatherArray = [];
      weather.map((item) => {
        const { dt_txt, main, wind } = item;
        const dateTime = dt_txt.split(" ");
        const date = dateTime[0];

        let weatherDate = weatherArray.find((el) => el.date === date);
        if (!weatherDate) {
          weatherArray.push({
            date,
            minTemp: main.temp,
            maxTemp: main.temp,
            icon: item.weather[0].icon,
            wind: wind.speed,
          });
        } else {
          if (main.temp > weatherDate.maxTemp) {
            weatherDate.maxTemp = main.temp;
          }
          if (main.temp < weatherDate.minTemp) {
            weatherDate.minTemp = main.temp;
          }
          if (wind.speed > weatherDate.wind) {
            weatherDate.wind = wind.speed;
          }
        }

        return weatherDate;
      });

      return weatherArray;
    });
}
