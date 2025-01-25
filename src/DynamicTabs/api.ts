import { ProductTypes } from './types';

export const getAllProduct = (): Promise<ProductTypes[]> => {
    return fetch('https://fakestoreapi.com/products', { method: 'GET' }).then((res) => res.json());
}

