import React, { useEffect, useState } from 'react'
import { Avatar, Button, Col, notification, Popconfirm, Row, Skeleton, Space, Tag, Tooltip, Typography } from 'antd'
import { UserOutlined, LeftOutlined, EditOutlined } from '@ant-design/icons'
import useEmployees from '../../../data/hooks/useEmployees'
import { useNavigate, useParams } from 'react-router-dom'
import { avatarDefaultURL, DateToFormatTextHuman, DateToShortTextFormat } from '../../../data/utils'
import EmployeeStatus from '../../../data/dto/EmployeeStatus'
import DepartmentUpdateForm from '../../components/employee-form/DepartmentUpdateForm'
import useDepartments from '../../../data/hooks/useDepartments'

import './EmployeeDetailsPage.scss'

const { Title, Text } = Typography

export const EmployeeDetailsLoading: React.FC = () => <><Skeleton /><Skeleton /></>

const EmployeeDetailsPage: React.FC = () => {
  const { employeeId } = useParams()
  const { employee, getEmployeeById, updateEmployee } = useEmployees()
  const { departments, getAllDepartments } = useDepartments()
  const [ showForm, setShowForm ] = useState<boolean>(false)
  const navigate = useNavigate()
  const updateEmployeeAction = employee?.status === EmployeeStatus.ACTIVE ? 'Deactivate' : 'Activate'

  useEffect(() => {
    getEmployeeById(String(employeeId))
    getAllDepartments()
  }, [employeeId])

  const updateEmployeeStatus = async () => {
    let status = employee!.status === EmployeeStatus.ACTIVE ? EmployeeStatus.INACTIVE : EmployeeStatus.ACTIVE
    try {
      const data = await updateEmployee(employee!.id, { status })
      if (data) {
        getEmployeeById(employee!.id)
      }
    } catch (err) {
      console.log('[updateEmployeeStatus]: Error', err)
    }
  }

  const handleDepartmentSelected = async (departmentId: string) => {
    try {
      const data = await updateEmployee(employee!.id, { departmentId })
      if (data) {
        getEmployeeById(employee!.id)
        notification.success({ message: 'Department updated', placement: 'bottomRight' })
        setShowForm(false)
      }
    } catch (err) {
      console.log('[handleDepartmentSelected]: Error', err)
    }
  }

  const handleBack = () => {
    navigate('/employees')
  }

  if (!employee) return <EmployeeDetailsLoading />

  return (
    <div className="employee-details-page">
      <Space>
        <Tooltip title="Return to Employees">
          <Button icon={<LeftOutlined />} onClick={handleBack}></Button>
        </Tooltip>
      </Space>
      <Row style={{ gap:20 }}>
        <Col flex={1}>
        <div className="employee-profile-box">
        <Avatar icon={<UserOutlined />} src={employee.pictureURL ?? avatarDefaultURL} />
        {
           employee.status === EmployeeStatus.ACTIVE ? (
             <></>
           ) : (
            <Tag>Inactive</Tag>
           )
        }
      </div>
        </Col>
        <Col flex={1}>
          <div style={{ textAlign:'left', marginLeft: '24px' }}>
            <Title level={2} style={{ margin: 0 }}>{employee.firstname} {employee.lastname}</Title>
            <Title level={5}>Employee ID: <Text type="secondary">{ employee.id}</Text></Title>
            <Title level={5}>Department: <Text type="secondary" >{ employee.department?.name} <EditOutlined onClick={() => setShowForm(!showForm)} /> </Text></Title>
            { showForm && (
              <DepartmentUpdateForm departments={departments} departmentId={employee.departmentId} onSelected={handleDepartmentSelected} />
            )}
            <Title level={5}>Telephone: <Text type="secondary">{ employee.phone}</Text></Title>
            <Title level={5}>Address: <Text type="secondary">{ employee.address}</Text></Title>
          </div>
        </Col>
        <Col flex={1}>
          <div style={{ textAlign:'right', marginLeft: '24px' }}>
            <Space direction="vertical">
              <Title level={4} style={{ margin: 0 }}>Hire Date</Title>
              <Text>{ DateToShortTextFormat(employee.hiredAt) }</Text>
              <Text>{ DateToFormatTextHuman(employee.hiredAt) }</Text>
              <Popconfirm title={`Confirm to ${updateEmployeeAction}`} placement="leftBottom"
                onConfirm={updateEmployeeStatus}
              >
              {
                employee.status === EmployeeStatus.ACTIVE ? (
                  <Button type="primary" className="btn-red">Deactivate</Button>
                ) : (
                  <Button type="primary">Activate</Button>
                )
              }
              </Popconfirm>
            </Space>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default EmployeeDetailsPage
