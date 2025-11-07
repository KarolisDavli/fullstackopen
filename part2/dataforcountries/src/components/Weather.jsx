import axios from "axios";
import {useEffect, useState} from "react";

const key = import.meta.env.VITE_WEATHER_KEY;
const baseUrl = `http://api.weatherapi.com/v1/forecast.json?key=${key}&q=`;

const Weather = ({capital}) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    axios.get(`${baseUrl}${capital}`).then((response) => {
      setWeather(response);
    });
  }, [capital]);

  if (!weather) return <p>Weather loading...</p>;

  console.log("weet", weather);

  const currentTemp = weather.data.current.temp_c;
  const weatherIcon = weather.data.current.condition.icon;
  const windKph = weather.data.current.wind_kph;
  const windMps = windKph / 3.6;

  return (
    <>
      <h1>Weather in {capital}</h1>
      <div>{`Temperature ${currentTemp} Celcius`}</div>
      <img src={weatherIcon} alt={weather.data.current.condition.text} />
      <div>{`Wind ${windMps.toFixed(2)} m/s`}</div>
    </>
  );
};

export default Weather;
