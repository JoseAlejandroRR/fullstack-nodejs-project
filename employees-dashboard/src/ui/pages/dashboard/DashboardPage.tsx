import React, { useEffect } from 'react'
import { Typography } from 'antd'
import useAuth from '../../../data/hooks/useAuth'

const { Title } = Typography

const DashboardPage: React.FC = () => {
  const { auth } = useAuth()

  useEffect(() => {
    console.log(auth)
  }, [auth])

  return (
    <>
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Title level={2}>Dashboard</Title>
      </div>
    </>
  )
}

export default DashboardPage
