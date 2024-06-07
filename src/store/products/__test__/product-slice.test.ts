import productsReducer, {
    fetchProducts,
    incrementSelection,
    decrementSelection,
    removeSelection
} from '../products-slice';
import { Product, ProductsState } from '../Products-interface'
import { PRODUCT_EP_STATUS } from '../../../constants';

describe('products slice', () => {
    const initialState: ProductsState = {
        items: [],
        status: PRODUCT_EP_STATUS.IDLE,
        error: null,
    };

    it('should handle initial state', () => {
        expect(productsReducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });

    it('should handle incrementSelection', () => {
        const previousState: ProductsState = {
            items: [{ id: '1', name: 'Product 1', price: 100, colour: 'red', img: '', selectionCount: 0 }],
            status: PRODUCT_EP_STATUS.IDLE,
            error: null,
        };
        const nextState = productsReducer(previousState, incrementSelection('1'));
        expect(nextState.items[0].selectionCount).toEqual(1);
    });

    it('should handle decrementSelection', () => {
        const previousState: ProductsState = {
            items: [{ id: '1', name: 'Product 1', price: 100, colour: 'red', img: '', selectionCount: 1 }],
            status: PRODUCT_EP_STATUS.IDLE,
            error: null,
        };
        const nextState = productsReducer(previousState, decrementSelection('1'));
        expect(nextState.items[0].selectionCount).toEqual(0);
    });

    it('should handle removeSelection', () => {
        const previousState: ProductsState = {
            items: [{ id: '1', name: 'Product 1', price: 100, colour: 'red', img: '', selectionCount: 5 }],
            status: PRODUCT_EP_STATUS.IDLE,
            error: null,
        };
        const nextState = productsReducer(previousState, removeSelection('1'));
        expect(nextState.items[0].selectionCount).toEqual(0);
    });

    it('should handle fetchProducts pending', () => {
        const action = { type: fetchProducts.pending.type };
        const nextState = productsReducer(initialState, action);
        expect(nextState.status).toEqual(PRODUCT_EP_STATUS.LOADING);
    });

    it('should handle fetchProducts fulfilled', () => {
        const action = { type: fetchProducts.fulfilled.type, payload: [{ id: '1', name: 'Product 1', price: 100, colour: 'red', img: '' }] as Product[] };
        const nextState = productsReducer(initialState, action);
        expect(nextState.status).toEqual(PRODUCT_EP_STATUS.SUCCESS);
        expect(nextState.items).toEqual(action.payload);
    });

    it('should handle fetchProducts rejected', () => {
        const action = { type: fetchProducts.rejected.type, error: { message: 'Failed to fetch products' } };
        const nextState = productsReducer(initialState, action);
        expect(nextState.status).toEqual(PRODUCT_EP_STATUS.FAIL);
        expect(nextState.error).toEqual('Failed to fetch products');
    });
});
