import { useDStore } from '../../DynamicTabs/store';
import { productsTypesWithActiveTab } from '../../DynamicTabs/store';
import './index.css';

const Forms = () => {
    const tabsLists = useDStore((state) => state.tabLists);
    const products = useDStore((state) => state.products);
    const onChange = useDStore((state) => state.onInputChanges);
    const activeTab = tabsLists.find((val) => val.activeTab) as productsTypesWithActiveTab;
    const unchangedVersion = products.find((prod) => prod.id === activeTab.id);
    const isDirty = JSON.stringify(unchangedVersion) !== JSON.stringify(activeTab);

    return (
        <div className='d-flex'>
            <div className='col-4 image-section'>
                <div className='image-wrapper'> 
                    <img src={activeTab?.image} className='image' />
                </div>
            </div>
            <div className='col-8 form-section d-flex'>
                <div className='col-12 form-container'>
                    <div className='input-wrapper'>
                        <label className='label'>Title</label>
                        <input 
                            className='input'
                            value={activeTab.title}
                            name='title'
                            onChange={(e) => onChange('title', e.target.value, activeTab)}
                        />
                    </div>
                    <div className='input-wrapper'>
                        <label className='label'>Description</label>
                        <input 
                            className='input'
                            value={activeTab.description}
                            name='description'
                            onChange={(e) => onChange('description', e.target.value, activeTab)}
                        />
                    </div>
                    <div className='input-wrapper'>
                        <label className='label'>Price</label>
                        <input 
                            className='input'
                            value={activeTab.price}
                            disabled
                        />
                    </div>
                    <div className='btn-wrapper'>
                        <button className='button'>
                            {
                                isDirty ? 'Submit' : 'Update'
                            }
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Forms;