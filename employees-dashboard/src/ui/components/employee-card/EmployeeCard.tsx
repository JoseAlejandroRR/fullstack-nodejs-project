import React from 'react'
import { Avatar, Button, Tag, Typography } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { EmployeeDto } from '../../../data/dto/EmployeeDto'
import EmployeeCardActions from './EmployeeCardActions'
import { avatarDefaultURL, DateToFormatTextHuman, DateToShortTextFormat } from '../../../data/utils'
import EmployeeStatus from '../../../data/dto/EmployeeStatus'

import './EmployeeCard.scss'

const { Text } = Typography

type EmployeeCardProps = {
  employee: EmployeeDto,
  onClick: Function,
  onEdit: Function,
  onDelete: Function,
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({
    employee, onClick, onEdit, onDelete
  }) => {

  const handleClick = (e: any) => {
    if (onClick && typeof(onClick) === 'function') {
      onClick(employee, e)
    }
  }

  const handleEdit = () => {
    onEdit(employee)
  }

  const handleDelete = () => {
    onDelete(employee)
  }

  return (
    <div className="employee-card">
      <div className="employee-card-left">
        <Avatar size={80} src={employee.pictureURL ?? avatarDefaultURL} icon={<UserOutlined />} />
        {
          employee.status === EmployeeStatus.INACTIVE && (
            <Tag color="magenta">Inactive</Tag>
        )}
      </div>
      <div className="employee-card-center">
        <div>
          <Text strong>
            {employee.firstname} {employee.lastname}
            { employee?.department?.name && (
              <Text type="secondary" className="department-name">
                ({employee.department.name})
              </Text>
            )} </Text>
        </div>
        <div>
          <Text >Hire Date</Text>
          <br />
          <Text type="secondary">
            { DateToShortTextFormat(employee.hiredAt) } ({ DateToFormatTextHuman(employee.hiredAt) })
          </Text>
        </div>
      </div>
      <div className="employee-card-right">
        <EmployeeCardActions onEdit={handleEdit} onDelete={handleDelete}  />
        <Button type="primary" size="small" onClick={handleClick}>
          View Details
        </Button>
      </div>
    </div>
  )
}

export default EmployeeCard
