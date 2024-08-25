import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setWeatherData, setLoading } from "../features/weatherSlice";
import { fetchWeatherData } from "../services/weatherService";
import { cityToLocalityMap } from "../services/cityToLocalityMap";

const Search: React.FC = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const dispatch = useDispatch();

  const handleSearch = async () => {
    dispatch(setLoading(true));
    try {
      const data = await fetchWeatherData(query);
      dispatch(setWeatherData(data));
      setTimeout(() => {
        const weatherInfoElement = document.getElementById("weather-info");
        if (weatherInfoElement) {
          weatherInfoElement.scrollIntoView({ behavior: "smooth" });
          setQuery("");
        } else {
          console.error('Element with id "weather-info" not found.');
        }
      }, 500);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.toLowerCase();
    setQuery(input);

    if (input.length > 0) {
      const matches = Object.keys(cityToLocalityMap).filter((city) =>
        city.toLowerCase().startsWith(input)
      );
      setSuggestions(matches);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    setSuggestions([]);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Weather Search</h2>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Enter city name"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <ul className="border border-gray-300 rounded-lg mt-2">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion}
              onClick={() => handleSuggestionClick(suggestion)}
              className="cursor-pointer px-4 py-2 hover:bg-gray-200"
            >
              {suggestion}
            </li>
          ))}
        </ul>
        <button
          onClick={handleSearch}
          className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default Search;
