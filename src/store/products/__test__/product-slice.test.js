import productsReducer, { fetchProducts, incrementSelection, decrementSelection, removeSelection } from '../products-slice'; // Adjust the import path if needed

describe('productsSlice', () => {
    describe('reducers', () => {
        it('should handle incrementSelection', () => {
            const state = {
                items: [{ id: 1, selectionCount: 0 }, { id: 2, selectionCount: 0 }],
            };
            const action = { payload: 1 };
            const newState = productsReducer(state, incrementSelection(action.payload));
            expect(newState.items[0].selectionCount).toBe(1);
        });

        it('should handle decrementSelection', () => {
            const state = {
                items: [{ id: 1, selectionCount: 2 }, { id: 2, selectionCount: 0 }],
            };
            const action = { payload: 1 };
            const newState = productsReducer(state, decrementSelection(action.payload));
            expect(newState.items[0].selectionCount).toBe(1);
        });

        it('should handle removeSelection', () => {
            const state = {
                items: [{ id: 1, selectionCount: 2 }, { id: 2, selectionCount: 0 }],
            };
            const action = { payload: 1 };
            const newState = productsReducer(state, removeSelection(action.payload));
            expect(newState.items[0].selectionCount).toBe(0);
        });
    });

    describe('initialState', () => {
        it('should match the initial state', () => {
            expect(productsReducer(undefined, {})).toEqual({
                items: [],
                status: 'idle',
                error: null,
            });
        });
    });
});
