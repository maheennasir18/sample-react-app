import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Products from '../../products/products';

const mockStore = configureStore([]);

describe('Products component', () => {
    let store: any;
    beforeEach(() => {
        const initialState = {
            products: {
                items: [
                    { id: 1, name: 'Product 1', price: 10, selectionCount: 1, img: 'product1.jpg', colour: 'Red' },
                    { id: 2, name: 'Product 2', price: 20, selectionCount: 2, img: 'product2.jpg', colour: 'Black' },
                ],
                status: 'success',
                error: null,
            },
        };
        store = mockStore(initialState);
    });

    it('renders the Products component correctly', () => {
        render(
            <Provider store={store}>
                <Products />
            </Provider>
        );
        expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });
});