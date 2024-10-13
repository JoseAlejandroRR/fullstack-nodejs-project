import React, { useEffect } from 'react'
import { Button, List, Typography } from 'antd'
import useEmployees from '../../../data/hooks/useEmployees'
import EmployeeCard from '../../components/employee-card/EmployeeCard'
import { PlusOutlined } from '@ant-design/icons'

import './EmployeesPage.scss'

const { Title } = Typography

const EmployeesPage: React.FC = () => {
  const { employees, getAllEmployees } = useEmployees()

  useEffect(() => {
    getAllEmployees()
  }, [])

  return (
    <div className="employees-page">
      <div className="employees-page-header">
        <Title level={2}>Employees</Title>
        <Button type="primary" icon={<PlusOutlined />}>
          New Employee
        </Button>
      </div>
      <div className="employees-page-content">
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 1,
            md: 1,
            lg: 2,
            xl: 2,
            xxl: 3,
          }}
          dataSource={employees}
          renderItem={(item) => (
            <List.Item>
              <EmployeeCard employee={item} />
            </List.Item>
          )}
          />
      </div>
    </div>
  )
}

export default EmployeesPage
