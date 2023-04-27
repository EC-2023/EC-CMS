import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../../api/axiosClient';
import { axiosHeadersToObject } from '../../utils/axiosHeadersToObject';

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
    `/statistics/get-static-revenue?option=${option}&date=${dateStr.getTime()}`
  );
  return response;
});

export const getStaticProductStore = createAsyncThunk(
  'statistics/get-statistic-product-store',
  async ({ option, dateStr }) => {
    console.log(dateStr.getTime());
    const response = await axiosClient.get(
      `/statistics/get-statistic-product-store?option=${option}&date=${dateStr.getTime()}`
    );
    return response;
  }
);

export const getStaticOrderStore = createAsyncThunk(
  'statistics/get-statistic-order-store',
  async ({ option, dateStr }) => {
    const response = await axiosClient.get(
      `/statistics/get-statistic-order-store?option=${option}&date=${dateStr.getTime()}`
    );
    console.log(response);
    return response;
  }
);

export const getStaticRevenueStore = createAsyncThunk(
  'statistics/get-statistic-revenue-store',
  async ({ option, dateStr }) => {
    const response = await axiosClient.get(
      `/statistics/get-statistic-revenue-store?option=${option}&date=${dateStr.getTime()}`
    );
    return response;
  }
);

export const getStaticProduct = createAsyncThunk(
  'statistics/getStaticProduct',
  async ({ option, dateStr }) => {
    const response = await axiosClient.get(
      `/statistics/get-static-product?option=${option}&date=${dateStr.getTime()}`
    );
    return response;
  }
);
export const statisticsSlice = createSlice({
  name: 'statistics',
  initialState: {
    data: [],
    total: {},
    revenue: {},
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStaticOrderStore.fulfilled, (state, action) => {
        state.data = action.payload.data;
      })
      .addCase(getStaticRevenueStore.fulfilled, (state, action) => {
        state.data = action.payload.data;
      })
      .addCase(getStaticProductStore.fulfilled, (state, action) => {
        state.data = action.payload.data;
      })
      .addCase(getStaticProduct.fulfilled, (state, action) => {
        state.data = action.payload.data;
      })
      .addCase(fetchTotal.fulfilled, (state, action) => {
        const headersObject = axiosHeadersToObject(action.payload.headers); // Convert the headers
        state.headers = headersObject['content-type'];
        state.total = action.payload.data;
      })
      .addCase(fetchRevenue.fulfilled, (state, action) => {
        state.revenue = action.payload.data;
      })
      .addCase(fetchRevenueStore.fulfilled, (state, action) => {
        state.revenue = action.payload.data;
      })
      .addCase(fetchStatisticStore.fulfilled, (state, action) => {
        state.total = action.payload.data;
      });
  },
});

export const selectStatistics = (state) => state.statistics;
export default statisticsSlice.reducer;
