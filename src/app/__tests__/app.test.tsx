import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../app';

// Mock ReduxProviders component
jest.mock('../../store/provider', () => ({
  ReduxProviders: ({ children }) => <div>{children}</div>
}));

// Mock Products component
jest.mock('../../features/products/products', () => () => <div data-testid="products">Products Component</div>);

describe('App Component', () => {
  it('renders App component correctly', () => {
    render(<App />);
    const productsComponent = screen.getByTestId('products');
    expect(productsComponent).toBeInTheDocument();
    expect(productsComponent).toHaveTextContent('Products Component');
  });
});
