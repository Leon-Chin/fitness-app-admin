import React, { Suspense, useEffect, useState } from 'react';
import "./index.less"
import { DatabaseOutlined, PieChartOutlined, FileTextOutlined, SolutionOutlined } from '@ant-design/icons';
import { Layout, Menu, theme, Avatar, Popover, Button } from 'antd';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useIntl } from 'react-intl';
import MyLayoutHeader from './header';
import { useDispatch, useSelector } from 'react-redux';
import { setCollapsed } from '@/store/account.store'


const { Content, Sider } = Layout;
const getItem = (label, key, icon, children) => {
  return { key, icon, children, label }
}

const Dashboard = () => {
  const { formatMessage } = useIntl()
  const mySidebarOptions = [
    getItem(formatMessage({ id: 'app.dashboard.menu.statistic' }), '/statistic', <PieChartOutlined />),
    getItem(formatMessage({ id: 'app.dashboard.menu.report' }), '/report', <FileTextOutlined />),
    getItem(formatMessage({ id: 'app.dashboard.menu.manage' }), '/manage', <DatabaseOutlined />, [
      getItem(formatMessage({ id: 'app.dashboard.menu.manageTutorial' }), '/manage/tutorial'),
    ]),
    getItem(formatMessage({ id: 'app.dashboard.menu.feedback' }), '/feedback', <SolutionOutlined />),
  ]
  const { pathname } = useLocation()
  const collapsed = useSelector(state => state.account.collapsed)
  const dispatch = useDispatch()
  const { token: { colorBgContainer } } = theme.useToken()
  const navigateTo = useNavigate()
  const menuClick = (e) => navigateTo(e.key)
  useEffect(() => {
    pathname === '/' && navigateTo('/statistic')
  }, [pathname])
  return (
    <Layout className="layout-page" style={{ minHeight: '100vh' }}>
      <MyLayoutHeader />
      <Layout hasSider>
        <Sider style={{ background: colorBgContainer }} collapsible collapsed={collapsed} onCollapse={(value) => dispatch(setCollapsed(value))}>
          <Menu defaultSelectedKeys={['/statistic']} selectedKeys={[pathname]} mode="inline" items={mySidebarOptions} onClick={menuClick} />
        </Sider>
        <Content className='layout-page-content'>
          <Suspense fallback={null}>
            <Outlet />
          </Suspense>
        </Content>
      </Layout>
    </Layout >
  )
}
export default Dashboard;
