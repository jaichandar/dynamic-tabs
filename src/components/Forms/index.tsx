import { useDStore } from '../../DynamicTabs/store';
import './index.css';

const Forms = () => {
    const tabsLists = useDStore((state) => state.tabLists);
    const activeTab = tabsLists.find((val) => val.activeTab);

    return (
        <div className='d-flex'>
            <div className='col-4 image-section' style={{ border: '1px solid red' }}>
                <div className='image-wrapper'> 
                    <img src={activeTab?.image} className='image' />
                </div>
            </div>
            <div className='col-8 form-section d-flex' style={{ border: '1px solid blue' }}>
                <div className='col-6' style={{ border: '1px solid yellow' }}>
                    
                </div>
                <div className='col-6' style={{ border: '1px solid green' }}>

                </div>
            </div>
        </div>
    )
}

export default Forms;