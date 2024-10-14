import React, { useEffect, useState } from 'react'
import { Button, Drawer, List, notification, Skeleton, Typography } from 'antd'
import useEmployees from '../../../data/hooks/useEmployees'
import EmployeeCard from '../../components/employee-card/EmployeeCard'
import { PlusOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { EmployeeDto } from '../../../data/dto/EmployeeDto'
import EmployeeForm from '../../components/employee-form/EmployeeForm'

import './EmployeesPage.scss'

const { Title } = Typography

const EmployeesPageLoading = () => <><Skeleton /><Skeleton /><Skeleton /></>

const EmployeesPage: React.FC = () => {
  const { employees, getAllEmployees, deleteEmployee, loading } = useEmployees()
  const [ showForm, setShowForm ] = useState<boolean>(false)
  const [ hasChanges, setHasChanges ] = useState<boolean>(false)
  const [ currentEmployee, setCurrentEmployee ] = useState<EmployeeDto | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    getAllEmployees()
  }, [])

  const handleNewEmployee = () => {
    setHasChanges(false)
    setShowForm(true)
    setCurrentEmployee(null)
  }

  const handleCloseForm = () => {
    setShowForm(false)
    if (hasChanges) {
      getAllEmployees()
    }
  }

  const handleViewEmployee = (employee: EmployeeDto) => {
    navigate(`/employees/${employee.id}`)
  }

  const handleEditEmploye = async (employee: EmployeeDto) => {
    setHasChanges(false)
    setCurrentEmployee(employee)
    setShowForm(true)
  }

  const handleDataChanged = async () => {
    setHasChanges(true)
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
        <Button type="primary" icon={<PlusOutlined />} onClick={handleNewEmployee}>
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
                onEdit={handleEditEmploye}
                onDelete={handleDeleteEmploye}
              />
            </List.Item>
          )}
          />
      </div>
      <Drawer title="Employee Form" onClose={handleCloseForm} open={showForm}>
        <EmployeeForm employee={currentEmployee ?? null} onDataChange={handleDataChanged} />
      </Drawer>
    </div>
  )
}

export default EmployeesPage
