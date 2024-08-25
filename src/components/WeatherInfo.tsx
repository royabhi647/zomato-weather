import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const WeatherInfo: React.FC = () => {
  const weatherData = useSelector((state: RootState) => state.weather.data);
  const loading = useSelector((state: RootState) => state.weather.loading);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-xl font-semibold text-blue-500">Loading...</p>
      </div>
    );
  }

  if (!weatherData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-xl font-semibold text-gray-600">
          No weather data available
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Weather Information
      </h2>
      <div className="space-y-4">
        <p className="text-lg text-gray-700">
          <span className="font-semibold">Temperature:</span>{" "}
          {weatherData?.locality_weather_data?.temperature}°C
        </p>
        <p className="text-lg text-gray-700">
          <span className="font-semibold">Humidity:</span>{" "}
          {weatherData?.locality_weather_data?.humidity}%
        </p>
        <p className="text-lg text-gray-700">
          <span className="font-semibold">Wind Speed:</span>{" "}
          {weatherData?.locality_weather_data?.wind_speed} km/h
        </p>
        <p className="text-lg text-gray-700">
          <span className="font-semibold">Wind Direction:</span>{" "}
          {weatherData?.locality_weather_data?.wind_direction}°
        </p>
        <p className="text-lg text-gray-700">
          <span className="font-semibold">Rain Intensity:</span>{" "}
          {weatherData?.locality_weather_data?.rain_intensity} mm/h
        </p>
        <p className="text-lg text-gray-700">
          <span className="font-semibold">Rain Accumulation:</span>{" "}
          {weatherData?.locality_weather_data?.rain_accumulation} mm
        </p>
      </div>
    </div>
  );
};

export default WeatherInfo;
