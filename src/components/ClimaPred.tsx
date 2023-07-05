import React, { useState } from "react";
import Formulario from "./Formulario";
import Card from "./Card";
interface ClimaData {
  // Define las propiedades del objeto de clima aquí
  // por ejemplo:
  main: {
    temp: number;
    temp_max: number;
    temp_min: number;
    feels_like: number;
    humidity: number;
  };
  wind: {
    speed: number;
    gust: number;
    deg: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  descripcion: string;
  name: string;
  // ...
}

interface ForecastData {
  main: {
    temp: number;
    temp_max: number;
    temp_min: number;
    feels_like: number;
    humidity: number;
  };
  wind: {
    speed: number;
    gust: number;
    deg: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  descripcion: string;
  name: string;
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
      main: string;
      description: string;
      icon: string;
    }[];
  }[];
}
const PanelClima = () => {
  let urlClima =
    "https://api.openweathermap.org/data/2.5/weather?appid=db70c3185e331fb1fabf07d3f457fba1&lang=es";
  let ciudadUrl = "&q=";
  let urlForecast =
    "https://api.openweathermap.org/data/2.5/forecast?appid=db70c3185e331fb1fabf07d3f457fba1&lang=es";

  const [clima, setClima] = useState<ClimaData[]>([]);
  const [forecast, setForecast] = useState<ForecastData[]>([]);
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState(false);
  const [location, setLocation] = useState("");

  const getLocation = async (locatn: string) => {
    setLoading(true);
    setLocation(locatn);

    urlClima = urlClima + ciudadUrl + locatn;
    await fetch(urlClima)
      .then((res) => {
        if (!res.ok) throw { res };
        return res.json();
      })
      .then((data: ClimaData) => {
        console.log(data);
        setClima([data]);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setInfo(false);
      });
    urlForecast = urlForecast + ciudadUrl + locatn;
    await fetch(urlForecast)
      .then((res) => {
        if (!res.ok) throw { res };
        return res.json();
      })
      .then((data: ForecastData) => {
        console.log(data);
        setForecast([data]);
        setLoading(false);
        setInfo(true);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setInfo(false);
      });
  };
  return (
    <React.Fragment>
      <Formulario
        city={location}
        setCity={setLocation}
        newLocation={getLocation}
      />
      <Card
        infoData={info}
        loadingData={loading}
        clima={clima}
        forecast={forecast}
      />
    </React.Fragment>
  );
};

export default PanelClima;
