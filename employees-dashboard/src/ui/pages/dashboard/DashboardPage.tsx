import React from 'react'
import { Typography } from 'antd'

const { Title } = Typography

const DashboardPage: React.FC = () => {
  return (
    <>
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Title level={2}>Dashboard</Title>

      </div>
      <div style={{ background: '#fff', padding: 24, minHeight: 360 }}>
        <p>In progress...</p>
      </div>
    </>
  )
}

export default DashboardPage
