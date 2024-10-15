
import { useState } from 'react'
import { Layout, Menu, Button, theme, Tooltip } from 'antd'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  HomeOutlined,
  UsergroupAddOutlined,
  LogoutOutlined
} from '@ant-design/icons'
import { Outlet, useNavigate } from 'react-router-dom'
import useAuth from '../../../data/hooks/useAuth'
import { isAuthActive } from '../../../data/utils'

const { Header, Sider, Content } = Layout

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const { userLogout } = useAuth()
  const {
    token: { colorBgContainer },
  } = theme.useToken()

  const navigate = useNavigate()

  const goTo = (url: string) => {
    navigate(url)
  }

  const handleLogout = () => {
    userLogout()
    navigate('/login')
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed} breakpoint="lg"
        onBreakpoint={(broken) => {
          setCollapsed(broken)
        }}>
        <div className="demo-logo-vertical" style={{ height: '32px', margin: '16px', background: 'rgba(255,255,255,.2)' }}>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <HomeOutlined />,
              label: 'Dashboard',
              onClick: () => goTo('/')
            },
            {
              key: '2',
              icon: <UsergroupAddOutlined />,
              label: 'Employees',
              onClick: () => goTo('/employees')
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 16px' }}>
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
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {
                isAuthActive() && (
                  <Tooltip title="Logout">
                  <Button onClick={handleLogout} type="link" icon={<LogoutOutlined />}></Button>
                </Tooltip>
                )
              }
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}
