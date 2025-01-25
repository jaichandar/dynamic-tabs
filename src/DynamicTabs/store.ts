import { create } from 'zustand';
import { ProductTypes } from './types';

export type productsTypesWithActiveTab = {
    activeTab?: boolean;
} & ProductTypes;

type useDynamicStore = {
    products: ProductTypes[];
    tabLists: productsTypesWithActiveTab[];
    setProducts: (val: ProductTypes[]) => void;
    setTabLists: (val: productsTypesWithActiveTab) => void;
    onTabClose: (id: number) => void;
    setDeactiveAllTabs: VoidFunction;
    setActiveTab: (id: number) => void;
}

const checkAlreadyExistOrAdd = (products: productsTypesWithActiveTab[], product: ProductTypes): productsTypesWithActiveTab[] => {
    const isProductAlreadyExist = products.filter((val) => val.id === product.id);
    if (isProductAlreadyExist.length) {
        return products.map((prod) => {
            if (prod.id === product.id) {
                return {
                    ...prod,
                    activeTab: true,   
                }
            } else return prod;
        })
    } else {
        return [...products, { ...product, activeTab: true }];
    }
}

export const useDStore = create<useDynamicStore>((set) => ({
    products: [],
    tabLists: [],
    setProducts: (products) => set((state) => ({ ...state, products: products })),
    setTabLists: (product) => set((state) => ({
        ...state,
        tabLists: checkAlreadyExistOrAdd(state.tabLists, product),
    })),
    onTabClose: (id) => set((state) => ({
        ...state,
        tabLists: state.tabLists.filter((val) => val.id !== id),
    })),
    setDeactiveAllTabs: () => set((state) => ({
        ...state, 
        tabLists: state.tabLists.map((val) => ({ ...val, activeTab: false })),
    })),
    setActiveTab: (id) => set((state) => ({
        ...state, 
        tabLists: state.tabLists.map((val) => {
            if (val.id === id) {
                return {
                    ...val, 
                    activeTab: true
                }
            } else {
                return {
                    ...val,
                    activeTab: false,
                }
            }
        })
    }))
}))