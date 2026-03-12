import { Outlet } from "react-router-dom";
import { SideBar } from '../../components/sideBar/index';
import styles from './styles.module.css'
import { useState } from "react";

export const DefaultLayout = () => {
    const [collapsed, setCollapsed] = useState(false);

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    }

    return (
        <div className={styles.containerMain}>
            <SideBar collapsed={collapsed} toogleCollapse={toggleCollapsed} />
            <main style={{ flex: 1, display: 'flex', alignItems: 'center', flexDirection: 'column', backgroundColor: '#252525' }}>
                <Outlet />
            </main>

        </div>
    )
}