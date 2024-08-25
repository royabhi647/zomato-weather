import axios from 'axios';
import { cityToLocalityMap } from './cityToLocalityMap';

const API_KEY = '3a36ff109c513e6215a9fe858e5eecf0';
const BASE_URL = 'https://www.weatherunion.com/gw/weather/external/v0/get_locality_weather_data';

export const fetchWeatherData = async (cityName: string) => {
   try {
      const lowercaseCityName = cityName.toLowerCase();
      const localityId = cityToLocalityMap[lowercaseCityName];

      if (!localityId) {
         throw new Error(`Locality ID not found for city: ${cityName}`);
      }

      const response = await axios.request({
         method: 'GET',
         url: BASE_URL,
         params: { locality_id: localityId },
         headers: { 'X-Zomato-Api-Key': API_KEY },
      });
      return response.data;
   } catch (error) {
      if (axios.isAxiosError(error)) {
         console.error('Axios error:', error.message);
      } else {
         console.error('Unexpected error:', error);
      }
      throw error;
   }
};
