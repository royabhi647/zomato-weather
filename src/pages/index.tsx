import React from "react";
import Search from "../components/Search";
import WeatherInfo from "../components/WeatherInfo";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Weather App
        </h1>
        <div className="space-y-6">
          <Search />
          <WeatherInfo />
        </div>
      </div>
    </div>
  );
};

export default Home;
