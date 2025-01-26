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
    onInputChanges: (key: 'title' | 'description',  value: string, product: productsTypesWithActiveTab) => void;
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

const handleInputsChanges = (key: 'title' | 'description', value: string, product: ProductTypes, tabLists: productsTypesWithActiveTab[]): productsTypesWithActiveTab[] => {
    return tabLists.map((val) => {
        if (val.id === product.id) {
            return {
                ...val, 
                [key]: value,
            }
        } else return val;
    })
}

const handleOnClose = (tabLists: productsTypesWithActiveTab[], id: number): productsTypesWithActiveTab[] => {
    let index = tabLists.findIndex((tab) => tab.id === id);
    let _tabLists = tabLists.filter((tab) => tab.id !== id);

    if (_tabLists.length === 0) {
        return _tabLists;  // No tabs left, return empty list
    } else if (index < _tabLists.length) {
        // If there's a next tab, activate it
        _tabLists[index] = {
            ..._tabLists[index],
            activeTab: true,
        };
    } else if (index - 1 >= 0) {
        // If no next tab, activate the previous tab
        _tabLists[index - 1] = {
            ..._tabLists[index - 1],
            activeTab: true,
        };
    }

    return _tabLists;
};


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
        tabLists: handleOnClose(state.tabLists, id),
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
    })),
    onInputChanges: (key, value, product) => set((state) => ({
        ...state, 
        tabLists: handleInputsChanges(key, value, product, state.tabLists),
    }))
}))