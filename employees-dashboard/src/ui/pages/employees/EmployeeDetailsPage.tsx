import React, { useEffect } from 'react'
import { Avatar, Button, Col, Popconfirm, Row, Skeleton, Space, Tag, Tooltip, Typography } from 'antd'
import { UserOutlined, LeftOutlined } from '@ant-design/icons'
import useEmployees from '../../../data/hooks/useEmployees'
import { useNavigate, useParams } from 'react-router-dom'
import { avatarDefaultURL, DateToFormatTextHuman, DateToShortTextFormat } from '../../../data/utils'
import EmployeeStatus from '../../../data/dto/EmployeeStatus'

import './EmployeeDetailsPage.scss'

const { Title, Text } = Typography

export const EmployeeDetailsLoading: React.FC = () => <><Skeleton /><Skeleton /></>

const EmployeeDetailsPage: React.FC = () => {
  const { employeeId } = useParams()
  const { employee, getEmployeeById, updateEmployee } = useEmployees()
  const navigate = useNavigate()
  const updateEmployeeAction = employee?.status === EmployeeStatus.ACTIVE ? 'Deactivate' : 'Activate'

  useEffect(() => {
    getEmployeeById(String(employeeId))
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
            <Title level={5}>Department: <Text type="secondary">{ employee.department?.name}</Text></Title>
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
