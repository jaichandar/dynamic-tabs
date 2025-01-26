// components
import { Table } from 'react-bootstrap';
// types
import { ProductTypes } from '../../DynamicTabs/types';
// store
import { useDStore } from '../../DynamicTabs/store';
// icons
import { FaRegEdit } from "react-icons/fa";
// style
import './style.css';

type TableProps = {
    columns: { key: string; headerName: string }[];
    data: ProductTypes[];
};

const _Table = (props: TableProps) => {
    const { columns, data } = props;
    const setTabsLists = useDStore((state) => state.setTabLists);
    const tabLists = useDStore((state) => state.tabLists);
    const noActiveTabs = tabLists.every((val) => !val.activeTab);

    const handleEdit = (val: ProductTypes) => {
        setTabsLists({ ...val, activeTab: true });
    }

    if (!noActiveTabs) {
        return null;
    } else
    return (
        <Table>
            <thead>
                {
                    columns.map((column) => (
                        <th>{column.headerName}</th>
                    ))
                }
            </thead>
            <tbody>
                {
                    data.map((val) => (
                        <tr>
                            <td>{val.id}</td>
                            <td>{val.title}</td>
                            <td>{val.description}</td>
                            <td>{val.category}</td>
                            <td className='actionCell'>
                                <div className='cursor' onClick={() => handleEdit(val)}><FaRegEdit /></div>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </Table>
    )
}

export default _Table;