import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../../api/axiosClient';

export const fetchTotal = createAsyncThunk('statistics/fetchTotal', async () => {
  const response = await axiosClient.get(`/statistics/get-total`);
  return response;
});
export const fetchStatisticStore = createAsyncThunk('statistics/get-statistics-store', async () => {
  const response = await axiosClient.get(`/statistics/get-statistics-store`);
  return response;
});
export const fetchRevenueStore = createAsyncThunk(
  'statistics/get-revenue-statistics-store',
  async ({ option, dateStr }) => {
    const response = await axiosClient.get(`/statistics/get-revenue-statistics-store`);
    return response;
  }
);
export const fetchRevenue = createAsyncThunk('statistics/getStaticRevenue', async ({ option, dateStr }) => {
  const response = await axiosClient.get(
    `/statistics/get-static-revenue?option=${option}&dateStr=${dateStr.getTime()}`
  );
  console.log(response);

  return response;
});

export const statisticsSlice = createSlice({
  name: 'statistics',
  initialState: {
    total: {},
    revenue: {},
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTotal.fulfilled, (state, action) => {
        state.total = action.payload;
      })
      .addCase(fetchRevenue.fulfilled, (state, action) => {
        state.revenue = action.payload;
      })
      .addCase(fetchRevenueStore.fulfilled, (state, action) => {
        state.revenue = action.payload;
      })
      .addCase(fetchStatisticStore.fulfilled, (state, action) => {
        state.total = action.payload;
      });
  },
});

export const selectStatistics = (state) => state.statistics;
export default statisticsSlice.reducer;
