import { useDStore } from '../../DynamicTabs/store';
import { IoMdClose } from "react-icons/io";
import { FaHome } from "react-icons/fa";
import './style.css';

const Tabs = () => {
    const tabsList = useDStore((state) => state.tabLists);
    const setDeactiveAllTabs = useDStore((state) => state.setDeactiveAllTabs);

    if (!tabsList.length) return null;
    return (
        <div className='tabContainer'>
            <div className='home-container cursor' onClick={setDeactiveAllTabs}>
                <FaHome />
            </div>
            {
                tabsList.map((tab) => (
                    <Tab key={tab.id} name={tab.title} id={tab.id} activeTab={tab.activeTab} />
                ))
            }
        </div>
    )
}

type tabProps = {
    name: string;
    id: number;
    activeTab: boolean | undefined;
}

const Tab = (props: tabProps) => {
    const { name, id, activeTab } = props;
    const onTabClose = useDStore((state) => state.onTabClose);
    // const onTestClose = useDStore((state) => state.onTestingClose)
    const setActiveTabs = useDStore((state) => state.setActiveTab);

    const closeTabs = (e, id) => {
        e.stopPropagation();
        onTabClose(id)
    }

    return (
        <div key={id} className={activeTab ? 'tab activeTab cursor':`tab cursor`} onClick={() => setActiveTabs(id)}>
            <div className='tab-title'>
                <p className='mb-0'>{name}</p>
            </div>
            <div className='tab-btn cursor' onClick={(e) => closeTabs(e, id)}>
                <IoMdClose />
            </div>
        </div>
    )
}

export default Tabs