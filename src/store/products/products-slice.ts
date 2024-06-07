/**
 * Product's component slice
 * @author Maheen Nasir
 */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { GET_PRODUCTS_ENDPOINT, PRODUCT_EP_STATUS } from '../../constants';
import { Product, initialState } from "./Products-interface";

/**
 * Async thunk to fetch products from the server.
 * @type {AsyncThunk<*, void, {}>}
 */
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await fetch(GET_PRODUCTS_ENDPOINT);
  return response.json();
});

/**
 * Initial state for the products slice.
 * @type {{
 *   items: Array,
 *   status: string,
 *   error: null|string
 * }}
 */

/**
 * Slice for managing products state.
 * @type {Slice}
 */
const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    /**
     * Reducer to increment the selection count of a product.
     * @param {ProductsState} state - The current state.
     * @param {PayloadAction<string>} action - The action object containing the payload.
     */
    incrementSelection: (state, action: PayloadAction<string>) => {
      const product = state.items.find(item => item.id === action.payload);
      if (product) {
        product.selectionCount = (product.selectionCount || 0) + 1;
      }
    },
    /**
     * Reducer to decrement the selection count of a product.
     * @param {ProductsState} state - The current state.
     * @param {PayloadAction<string>} action - The action object containing the payload.
     */
    decrementSelection: (state, action: PayloadAction<string>) => {
      const product = state.items.find(item => item.id === action.payload);
      if (product && (product.selectionCount || 0) > 0) {
        product.selectionCount = (product.selectionCount || 0) - 1;
      }
    },
    /**
     * Reducer to remove the selection of a product.
     * @param {ProductsState} state - The current state.
     * @param {PayloadAction<string>} action - The action object containing the payload.
     */
    removeSelection: (state, action: PayloadAction<string>) => {
      const product = state.items.find(item => item.id === action.payload);
      if (product) {
        product.selectionCount = 0;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = PRODUCT_EP_STATUS.LOADING;
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.status = PRODUCT_EP_STATUS.SUCCESS;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = PRODUCT_EP_STATUS.FAIL;
        state.error = action.error.message || null;
      });
  }
});

/**
 * Export actions and reducer from products slice.
 */
export const { incrementSelection, decrementSelection, removeSelection } = productsSlice.actions;
export default productsSlice.reducer;
