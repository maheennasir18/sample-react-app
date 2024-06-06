/**
 * React component for displaying a list of products with filtering options.
 * @module Products
 * @returns {JSX.Element} The rendered component.
 * @author Maheen Nasir
 */

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, incrementSelection, decrementSelection, removeSelection } from '../../store/products/products-slice';
import './products.css';
import { PRODUCT_EP_STATUS } from "../../constants";

const Products = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.items);
    const productsStatus = useSelector((state) => state.products.status);
    const [colorFilter, setColorFilter] = useState('');

    useEffect(() => {
        // Fetch products when component mounts or products status changes to idle
        if (productsStatus === PRODUCT_EP_STATUS.IDLE) dispatch(fetchProducts());
    }, [productsStatus, dispatch]);

    /**
     * Event handler for color filter change.
     * @param {object} e - The event object.
     */
    const handleColorFilterChange = (e) => {
        setColorFilter(e.target.value);
    };

    // Filter products based on color selection
    const filteredProducts = colorFilter
        ? products.filter((product) => product?.colour === colorFilter)
        : products;

    // Calculate total amount based on selected products and their quantities
    const totalAmount = filteredProducts.reduce((total, product) => {
        return total + (product.price * (product.selectionCount || 0));
    }, 0);

    return (
        <div className="products-container">
            {/* Display loading message if products are being fetched */}
            {productsStatus === PRODUCT_EP_STATUS.LOADING && <div>Loading...</div>}
            {/* Display products if loading is successful */}
            {productsStatus === PRODUCT_EP_STATUS.SUCCESS && (
                <>
                    <h2>Products</h2>
                    <div className="filter">
                        {/* Color filter dropdown */}
                        <label htmlFor="color-filter">Filter by color: </label>
                        <select className="color-filter" id="color-filter" value={colorFilter} onChange={handleColorFilterChange}>
                            <option value="">All</option>
                            <option value="Black">Black</option>
                            <option value="Stone">Stone</option>
                            <option value="Red">Red</option>
                        </select>
                    </div>
                    <div className="products-header">
                        <span>Item</span>
                        <span>Quantity</span>
                    </div>
                    {/* Display list of products */}
                    <div className="products-list">
                        {filteredProducts.map((product) => (
                            <div key={product.id} className="product-item">
                                <div className="product-info">
                                    <img src={product.img} alt={product.name} className="product-img" />
                                    <div>
                                        <h3>{product.name}</h3>
                                        <span className="product-price">Price: ${product.price}</span>
                                    </div>
                                </div>
                                <div className="product-quantity">
                                    <div className="quantity-controls">
                                        {/* Quantity control buttons */}
                                        <button onClick={() => dispatch(decrementSelection(product.id))}>-</button>
                                        <span>{product.selectionCount || 0}</span>
                                        <button onClick={() => dispatch(incrementSelection(product.id))}>+</button>
                                    </div>
                                    {/* Remove product button */}
                                    <button className="remove-btn" onClick={() => dispatch(removeSelection(product.id))}>Remove</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Display total amount */}
                    <div className="total-amount">
                        <h3>Total: ${totalAmount.toFixed(2)}</h3>
                    </div>
                </>
            )}
            {/* Display error message if loading fails */}
            {productsStatus === PRODUCT_EP_STATUS.FAIL && <div>Failed to load products</div>}
        </div>
    );
}

export default Products;
