import { PRODUCT_EP_STATUS } from "../../constants";

export interface Product {
    id: string;
    name: string;
    price: number;
    colour: string;
    img: string;
    selectionCount?: number;
}

export interface ProductsState {
    items: Product[];
    status: string;
    error: null | string;
}

export const initialState: ProductsState = {
    items: [],
    status: PRODUCT_EP_STATUS.IDLE,
    error: null,
};
