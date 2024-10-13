import React from 'react'
import { Avatar, Button, Typography } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { EmployeeDto } from '../../../data/dto/EmployeeDto'
import EmployeeCardActions from './EmployeeCardActions'
import { avatarDefaultURL, DateToFormatTextHuman, DateToShortTextFormat } from '../../../data/utils'

import './EmployeeCard.scss'

const { Text } = Typography

type EmployeeCardProps = {
  employee: EmployeeDto,
  onClick: Function,
  onDelete: Function,
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({ employee, onClick, onDelete }) => {

  const handleClick = (e: any) => {
    if (onClick && typeof(onClick) === 'function') {
      onClick(employee, e)
    }
  }

  const handleDelete = () => {
    onDelete(employee)
  }

  return (
    <div className="employee-card">
      <div className="employee-card-left">
        <Avatar size={80} src={employee.pictureURL ?? avatarDefaultURL} icon={<UserOutlined />} />
      </div>
      <div className="employee-card-center">
        <div>
          <Text strong>{employee.firstname} {employee.lastname}</Text>
        </div>
        <div>
          <Text type="secondary">Hire Date</Text>
          <br />
          <Text>
            { DateToShortTextFormat(employee.hiredAt) } ({ DateToFormatTextHuman(employee.hiredAt) })
          </Text>
        </div>
      </div>
      <div className="employee-card-right">
        <EmployeeCardActions onDelete={handleDelete}  />
        <Button type="primary" size="small" onClick={handleClick}>
          View Details
        </Button>
      </div>
    </div>
  )
}

export default EmployeeCard
