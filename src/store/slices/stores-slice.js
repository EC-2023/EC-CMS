import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../../api/axiosClient';
export const fetchStores = createAsyncThunk(
  'stores/fetchStores',
  async ({ currentPage, pageSize, searchText, orderBy }) => {
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

export const getMyProductStore = createAsyncThunk('stores/getTotalProductInStore', async () => {
  const response = await axiosClient.get(`/stores/total-product-store`);
  return response;
});

export const getOrderByStore = createAsyncThunk('stores/getOrderByStore', async (id) => {
  const response = await axiosClient.get(`/stores/getOrderByStore`);
  return response;
});

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
    totalProduct: 0,
    data: [],
    pagination: 0,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStores.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStores.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchStores.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteStore.fulfilled, (state, action) => {
        state.data = state.data.filter((store) => store.Id !== action.payload);
      })
      .addCase(updateStore.fulfilled, (state, action) => {
        const index = state.data.findIndex((store) => store.Id === action.payload.Id);
        state.data[index] = action.payload;
      })
      .addCase(getMyProductStore.fulfilled, (state, action) => {
        state.totalProduct = action.payload;
      });
  },
});

export const selectStores = (state) => state.stores;

export default storesSlice.reducer;
