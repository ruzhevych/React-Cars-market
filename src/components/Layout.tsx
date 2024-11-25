import React, { useState } from 'react';
import {
    CarFilled,
    HomeFilled,
    InfoCircleFilled,
    LikeOutlined,
    LoginOutlined,
    LogoutOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserAddOutlined
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAccountContext } from '../contexts/accounts.context';
import { accountService } from '../services/accounts.service';

const { Header, Sider, Content } = Layout;

const AppLayout: React.FC = () => {

    const { pathname } = useLocation();
    const { account, clear, isAuth } = useAccountContext();

    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const logout = () => {
        accountService.logout();
        clear();
    }

    return (
        <Layout className='AppLayout'>
            <Sider  trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical" />
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={[pathname]}
                    items={[
                        {
                            key: '/',
                            icon: <HomeFilled />,
                            label: <Link to="/">Home</Link>,
                        },
                        {
                            key: '/cars',
                            icon: <CarFilled/>,
                            label: <Link to="/cars">Cars</Link>,
                        },
                        {
                            key: '/favorite',
                            icon: <LikeOutlined/>,
                            label: <Link to="/favorite">Favorite</Link>,
                        },
                        {
                            key: '/about',
                            icon: <InfoCircleFilled />,
                            label: <Link to="/about">About</Link>,
                        },
                    ]}
                />
            </Sider>
            <Layout className='main'>
                <Header style={{ padding: 0, background: colorBgContainer, display: "flex", justifyContent: "space-between" }}>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                    <div>
                        {
                            isAuth() ?
                                <>
                                    <span style={{ padding: "10px" }}>Hello, {account?.email}</span>
                                    <Button
                                        type="text"
                                        icon={<LogoutOutlined />}
                                        onClick={logout}
                                        style={{
                                            fontSize: '16px',
                                            height: 64,
                                        }}>Logout</Button>
                                </>
                                :
                                <>
                                    <Link to='/login'>
                                        <Button
                                            type="text"
                                            icon={<LoginOutlined />}
                                            style={{
                                                fontSize: '16px',
                                                height: 64,
                                            }}>Login</Button>
                                    </Link>
                                    <Link to='/register'>
                                        <Button
                                            type="text"
                                            icon={<UserAddOutlined />}
                                            style={{
                                                fontSize: '16px',
                                                height: 64,
                                            }}>Register</Button>
                                    </Link>
                                </>
                        }
                    </div>
                </Header>
                <Content
                    className='Content'
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default AppLayout;