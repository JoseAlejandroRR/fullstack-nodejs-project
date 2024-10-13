import React, { useEffect } from 'react'
import { Button, List, message, notification, Skeleton, Typography } from 'antd'
import useEmployees from '../../../data/hooks/useEmployees'
import EmployeeCard from '../../components/employee-card/EmployeeCard'
import { PlusOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { EmployeeDto } from '../../../data/dto/EmployeeDto'

import './EmployeesPage.scss'

const { Title } = Typography

const EmployeesPageLoading = () => <><Skeleton /><Skeleton /><Skeleton /></>

const EmployeesPage: React.FC = () => {
  const { employees, getAllEmployees, deleteEmployee, loading } = useEmployees()
  const navigate = useNavigate()

  useEffect(() => {
    getAllEmployees()
  }, [])

  const handleViewEmployee = (employee: EmployeeDto) => {
    navigate(`/employees/${employee.id}`)
  }

  const handleDeleteEmploye = async (employee: EmployeeDto) => {
    try {
      await deleteEmployee(employee.id)
      notification.success({ message: 'Employee deleted', placement: 'bottomRight'})
    } catch (err) {
      notification.error({ message: 'Employee can´t be deleted', placement: 'bottomRight'})
    }
  }

  if (loading) return <EmployeesPageLoading />

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
              <EmployeeCard employee={item}
                onClick={handleViewEmployee}
                onDelete={handleDeleteEmploye}
              />
            </List.Item>
          )}
          />
      </div>
    </div>
  )
}

export default EmployeesPage
