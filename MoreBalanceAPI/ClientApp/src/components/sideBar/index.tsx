import { useState } from "react"
import styles from "./styles.module.css"
import { Button, Menu } from "antd";
import {
    BarChartOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    TagsOutlined,
    TeamOutlined,
    TransactionOutlined,
} from '@ant-design/icons';
import type { MenuProps } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

interface Iprops {
    collapsed: boolean,
    toogleCollapse: () => void;
}
export const SideBar = (props: Iprops) => {
    const location = useLocation();
    const navigate = useNavigate();
    type menuItem = Required<MenuProps>['items'][number];
    const items: menuItem[] = [
        { key: '/', icon: <TeamOutlined />, label: 'Pessoas', onClick: () => { navigate('/') } },
        { key: '/categorys', icon: <TagsOutlined />, label: 'Categoria', onClick: () => { navigate('/categorys') } },
        { key: '/transactions', icon: <TransactionOutlined />, label: 'Transações', onClick: () => { navigate('/transactions') } },
        { key: '/ConsolidatedAccounts', icon: <BarChartOutlined />, label: 'Consolidado de Contas', onClick: () => { navigate('/ConsolidatedAccounts') } }
    ]
    return (
        <div style={{ width: props.collapsed ? 80 : 256, transition: 'width 0.1s' }} className={styles.containerMain}>
            <Button type="primary" onClick={props.toogleCollapse} className={styles.buttonCollapse} block>
                {props.collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </Button>

            <Menu
                selectedKeys={[location.pathname]}
                mode="inline"
                theme="dark"
                inlineCollapsed={props.collapsed}
                items={items} />

        </div>
    )
}