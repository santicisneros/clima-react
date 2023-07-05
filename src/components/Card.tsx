import React from "react";
import Spinner from "./Spinner";

interface ClimaData {
  descripcion: string;
  name: string;
  wind: { speed: number; gust: number; deg: number };
  main: {
    temp: number;
    temp_max: number;
    temp_min: number;
    feels_like: number;
    humidity: number;
  };
  weather: {
    id: number;
    description: string;
    icon: string;
  }[];
}

interface ForecastData {
  list: {
    dt_txt: string;
    main: {
      temp: number;
      temp_max: number;
      temp_min: number;
      feels_like: number;
      humidity: number;
    };
    weather: {
      id: number;
      description: string;
      icon: string;
    }[];
  }[];
}

interface CardProps {
  loadingData: boolean;
  infoData: boolean;
  clima: ClimaData[];
  forecast: ForecastData[];
}

const Card: React.FC<CardProps> = ({
  loadingData,
  infoData,
  clima,
  forecast,
}) => {
  var today = new Date();
  var day = today.getDate();
  var month = today.getMonth() + 1;
  var year = today.getFullYear();
  var date = day + "/" + month + "/" + year;
  var url = "";
  var iconUrl = "";
  var icon3hs = "";
  var icon6hs = "";
  var icon9hs = "";
  var forecastDate3hs = "";
  var forecastDate6hs = "";
  var forecastDate9hs = "";
  if (loadingData) {
    return <Spinner />;
  }
  if (!clima.length) {
    // Si no se ha ingresado una ciudad válida, muestra el mensaje correspondiente
    return <h2 className="text-light">Ingrese una ciudad</h2>;
  }

  if (!infoData) {
    // Si se ha ingresado una ciudad pero no se encuentra la información, muestra el mensaje correspondiente
    return <h2 className="text-light">Ingrese una ciudad válida</h2>;
  }
  if (infoData) {
    url = "http://openweathermap.org/img/wn/";
    iconUrl = url + clima[0].weather[0].icon + ".png";
    icon3hs = url + forecast[0].list[0].weather[0].icon + ".png";
    icon6hs = url + forecast[0].list[1].weather[0].icon + ".png";
    icon9hs = url + forecast[0].list[2].weather[0].icon + ".png";
    forecastDate3hs =
      forecast[0].list[0].dt_txt.substring(8, 10) +
      "/" +
      forecast[0].list[0].dt_txt.substring(5, 7) +
      "/" +
      forecast[0].list[0].dt_txt.substring(0, 4) +
      " " +
      forecast[0].list[0].dt_txt.substring(11, 13);
    forecastDate6hs =
      forecast[0].list[1].dt_txt.substring(8, 10) +
      "/" +
      forecast[0].list[1].dt_txt.substring(5, 7) +
      "/" +
      forecast[0].list[1].dt_txt.substring(0, 4) +
      " " +
      forecast[0].list[1].dt_txt.substring(11, 13);
    forecastDate9hs =
      forecast[0].list[2].dt_txt.substring(8, 10) +
      "/" +
      forecast[0].list[2].dt_txt.substring(5, 7) +
      "/" +
      forecast[0].list[2].dt_txt.substring(0, 4) +
      " " +
      forecast[0].list[2].dt_txt.substring(11, 13);
  }
  return (
    <div className="mt-5">
      {infoData === true ? (
        <div className="container">
          <div className="text-light bg-dark card mb-3 mx-auto">
            <div className="row g-0">
              <div className="col-md-4">
                <h3 className="card-title">{clima[0].name}</h3>
                <p className="card-date">{date}</p>
                <h1 className="card-temp">
                  {(clima[0].main.temp - 273.15).toFixed(1)}°C
                </h1>
                <p className="card-descp">
                  <img src={iconUrl} alt="icon" />
                  {clima[0].weather[0].description}
                </p>
                <div className="image-container">
                  <img
                    src="https://images.pexels.com/photos/2129796/pexels-photo-2129796.png"
                    alt=".."
                    className="img-fluid rounded-start"
                  />
                </div>
              </div>
              <div className="col-md-8">
                <div className="card-body text-start mt-2">
                  <h5 className="card-text">
                    Tempeatura máxima:{" "}
                    {(clima[0].main.temp_max - 273.15).toFixed(1)}
                    °C
                  </h5>
                  <h5 className="card-text">
                    Tempeatura minima:{" "}
                    {(clima[0].main.temp_min - 273.15).toFixed(1)}
                    °C
                  </h5>
                  <h5 className="card-text">
                    Sensación terminca:{" "}
                    {(clima[0].main.feels_like - 273.15).toFixed(1)}
                    °C
                  </h5>
                  <h5 className="card-text">
                    Humedad: {clima[0].main.humidity}%{" "}
                  </h5>
                  <h5 className="card-text">
                    Viento: {clima[0].wind.speed}m/s{" "}
                  </h5>
                </div>
                <hr />
                <div className="row mt-4">
                  <div className="col">
                    <p>{forecastDate3hs}h</p>
                    <p className="description">
                      <img src={icon3hs} alt="icon" />
                      {forecast[0].list[0].weather[0].description}
                    </p>
                    <p className="temp">
                      {(forecast[0].list[0].main.temp - 273.15).toFixed(1)}°C
                    </p>
                  </div>
                  <div className="col">
                    <p>{forecastDate6hs}h</p>
                    <p className="description">
                      <img src={icon6hs} alt="icon" />
                      {forecast[0].list[1].weather[0].description}
                    </p>
                    <p className="temp">
                      {(forecast[0].list[1].main.temp - 273.15).toFixed(1)}°C
                    </p>
                  </div>
                  <div className="col">
                    <p>{forecastDate9hs}h</p>
                    <p className="description">
                      <img src={icon9hs} alt="icon" />
                      {forecast[0].list[2].weather[0].description}
                    </p>
                    <p className="temp">
                      {(forecast[0].list[2].main.temp - 273.15).toFixed(1)}°C
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Card;
