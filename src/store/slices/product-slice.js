const { createSlice } = require('@reduxjs/toolkit');

const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: [],
  },
  reducers: {
    setProducts(state, action) {
      state.products = action.payload.data;
    },
  },
});

export const { setProducts } = productSlice.actions;
export default productSlice.reducer;
