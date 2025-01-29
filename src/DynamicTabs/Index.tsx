import { useEffect, useState } from 'react';
// store
import { useDStore } from './store';
// api
import { getAllProduct } from './api';
// component
import Table from '../components/Table/Index';
import Tabs from '../components/tabs';
import { Spinner } from 'react-bootstrap';
// style
import './style.css';
import Forms from '../components/Forms';

const DynamicTabs = () => {
    const [loading, setLoading] = useState(false);
    const setProducts = useDStore((state) => state.setProducts);
    const products = useDStore((state) => state.products);
    const tabLists = useDStore((state) => state.tabLists);
    const isAnyActiveTabs = tabLists.some((tab) => tab.activeTab === true);

    const columns = [
        { key: 'id', headerName: 'ID' },
        { key: 'title', headerName: 'Name' },
        { key: 'description', headerName: 'Description' },
        { key: 'category', headerName: 'Category' },
        { key: 'Action', headerName: 'Action' }
    ];

    useEffect(() => {
        if (!products.length) {
            setLoading(true);
            getAllProduct()
                .then((data) => setProducts(data))
                .catch(console.error)
                .finally(() => setLoading(false));
        }
    }, []);

    return (
        <div className='container'>
            {
                loading && <div className='spin-container'>
                    <Spinner />
                </div>
            }
            <p className='title'>Dynamic Tabs</p>
            <Tabs />
            <Table columns={columns} data={products} />
            {isAnyActiveTabs && <Forms />}
        </div>
    );
};

export default DynamicTabs;
