import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../../api/axiosClient';
export const fetchStores = createAsyncThunk(
  'stores/fetchStores',
  async ({ currentPage, pageSize, searchText, orderBy }) => {
    console.log({ currentPage, pageSize, searchText, orderBy });

    console.log(
      `/stores/pagination?skip=${
        currentPage * pageSize
      }&limit=${pageSize}&orderBy=${orderBy}&name%7B%7Bsearch%7D%7D=${searchText}`
    );

    const response = await axiosClient.get(
      `/stores/pagination?skip=${
        currentPage * pageSize
      }&limit=${pageSize}&orderBy=${orderBy}&name%7B%7Bsearch%7D%7D=${searchText}`
    );
    console.log(response);
    return response;
  }
);

export const deleteStore = createAsyncThunk('stores/deleteStore', async (id) => {
  await axiosClient.delete(`/stores/${id}`);
  return id;
});

export const getTotalStatisticStore = createAsyncThunk('stores/getTotalStatisticStore', async (id) => {
  const response = await axiosClient.get(`/statistics/get-total-statistic-store`);
  return response;
});

export const getMyProductStore = createAsyncThunk('stores/getTotalProductInStore', async () => {
  const response = await axiosClient.get(`/stores/total-product-store`);
  return response;
});

export const getOrderByStore = createAsyncThunk('stores/getOrderByStore', async (id) => {
  const response = await axiosClient.get(`/stores/getOrderByStore`);
  return response;
});

export const getProductsByStore = createAsyncThunk(
  'stores/getProductsByStore',
  async ({ currentPage, pageSize, searchText, orderBy, otherCondition }) => {
    const response = await axiosClient.get(
      `/stores/getProductsByMyStore?skip=${currentPage * pageSize}&limit=${pageSize}&orderBy=${orderBy}${
        otherCondition ? otherCondition : ''
      }&name%7B%7Bsearch%7D%7D=${searchText}`
    );

    return response;
  }
);

export const getOrdersByMyStore = createAsyncThunk(
  'stores/getOrdersByMyStore',
  async ({ currentPage, pageSize, searchText, orderBy, otherCondition }) => {
    const response = await axiosClient.get(
      `/stores/getOrdersByMyStore?skip=${currentPage * pageSize}&limit=${pageSize}&orderBy=${orderBy}${
        otherCondition ? otherCondition : ''
      }&code%7B%7Bsearch%7D%7D=${searchText}`
    );
    return response;
  }
);

export const updateStore = createAsyncThunk('stores/updateStore', async (store) => {
  const response = await axiosClient.patch(`/stores/${store.Id}`, store, {
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  return response;
});

export const storesSlice = createSlice({
  name: 'stores',
  initialState: {
    total: {},
    totalProduct: 0,
    data: [],
    pagination: 0,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductsByStore.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data.data;
        state.pagination = action.payload.data.pagination;
      })
      .addCase(getOrdersByMyStore.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data.data;
        state.pagination = action.payload.data.pagination;
      })
      .addCase(fetchStores.pending, (state, action) => {
        state.total = action.payload.data;
      })
      .addCase(getTotalStatisticStore.fulfilled, (state, action) => {
        state.total = action.payload.data;
      })
      .addCase(fetchStores.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data.data;
        state.pagination = action.payload.data.pagination;
      })
      .addCase(fetchStores.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteStore.fulfilled, (state, action) => {
        state.data = state.data.filter((store) => store.Id !== action.payload.data);
      })
      .addCase(updateStore.fulfilled, (state, action) => {
        const index = state.data.findIndex((store) => store.Id === action.payload.data.Id);
        state.data[index] = action.payload.data;
      })
      .addCase(getMyProductStore.fulfilled, (state, action) => {
        state.totalProduct = action.payload.data;
      });
  },
});

export const selectStores = (state) => state.stores;

export default storesSlice.reducer;
