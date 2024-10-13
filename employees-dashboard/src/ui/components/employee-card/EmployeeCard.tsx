import React from 'react'
import { Avatar, Button, Typography } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { EmployeeDto } from '../../../data/dto/EmployeeDto'
import EmployeeCardActions from './EmployeeCardActions'
import { DateToFormatTextHuman, DateToShortTextFormat } from '../../../data/utils'

import './EmployeeCard.scss'

const { Text } = Typography

type EmployeeCardProps = {
  employee: EmployeeDto
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({ employee }) => {

  return (
    <div className="employee-card">
      <div className="employee-card-left">
        <Avatar size={80} src={employee.pictureURL} icon={<UserOutlined />} />
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
        <EmployeeCardActions />
        <Button type="primary" size="small">
          View Details
        </Button>
      </div>
    </div>
  )
}

export default EmployeeCard
