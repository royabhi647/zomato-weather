import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WeatherState {
   data: any;
   loading: boolean;
}

const initialState: WeatherState = {
   data: null,
   loading: false,
};

const weatherSlice = createSlice({
   name: 'weather',
   initialState,
   reducers: {
      setWeatherData: (state, action: PayloadAction<any>) => {
         state.data = action.payload;
      },
      setLoading: (state, action: PayloadAction<boolean>) => {
         state.loading = action.payload;
      },
   },
});

export const { setWeatherData, setLoading } = weatherSlice.actions;
export default weatherSlice.reducer;
