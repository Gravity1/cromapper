import ReactWeather, { useOpenWeather } from "react-open-weather";
import React, { useState } from "react";

function Weather() {
  console.log("Weather starting");
  const customStyles = {
    fontFamily: "Helvetica, sans-serif",
    gradientStart: "#8BC34A",
    gradientMid: "#8BC34A",
    gradientEnd: "#827717",
    locationFontColor: "#FFF",
    todayTempFontColor: "#FFF",
    todayDateFontColor: "#5C5C5C",
    todayRangeFontColor: "#5C5C5C",
    todayDescFontColor: "#5C5C5C",
    todayInfoFontColor: "#5C5C5C",
    todayIconColor: "#FFF",
    forecastBackgroundColor: "#FFF",
    forecastSeparatorColor: "#DDD",
    forecastDateColor: "#777",
    forecastDescColor: "#777",
    forecastRangeColor: "#777",
    forecastIconColor: "#827717",
  };

  const WeatherDiv = () => {
    console.log("Weather div spooling up");
    const [location, setLocation] = useState("Nyandarua");
    const { data, isLoading, errorMessage } = useOpenWeather({
      key: "761419d7cb3c8d29a63734d7cde99000",
      lat: "-0.288",
      lon: "36.449",
      lang: "en",
      unit: "metric", // values are (metric, standard, imperial)
    });

    return (
      <ReactWeather
        theme={customStyles}
        isLoading={isLoading}
        errorMessage={errorMessage}
        data={data}
        lang="en"
        locationLabel={location}
        unitsLabels={{ temperature: "C", windSpeed: "Km/h" }}
        showForecast="true"
      />
    );
  };

  return (
    <div className="App">
      <WeatherDiv />
    </div>
  );
}

export default Weather;
