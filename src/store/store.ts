/**
 * Configure and create the Redux store.
 * @author Maheen Nasir
 */
import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './products/products-slice';

export const store = configureStore({
    reducer: {
        products: productsReducer,
    },
});

/**
 * Type for the root state of the Redux store.
 * It represents the state structure based on the store's configuration.
 */
export type RootState = ReturnType<typeof store.getState>;

/**
 * Type for the Redux dispatch function.
 * It is inferred from the store's dispatch method.
 */
export type AppDispatch = typeof store.dispatch;
