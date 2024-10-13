import React from 'react'
import { Dropdown, Popconfirm, Space, Typography } from 'antd'
import { MoreOutlined, CloseOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'

const { Text } = Typography

type MenuAction = {
  onDelete: Function
}

const EmployeeCardActions: React.FC<MenuAction> = ({ onDelete }) => {

  const handleDelete = () => {
    onDelete()
  }

  const items: MenuProps['items'] = [
    {
      icon: <>
        <Popconfirm title={`Confirm to Delete`} onConfirm={handleDelete}>
          <CloseOutlined />
          <Text style={{ paddingLeft: '10px' }}>Delete</Text>
        </Popconfirm>
      </>,
      key: '0',
    },
  ]

  return (
    <Dropdown className="menu-actions" menu={{ items }} trigger={['click']} >
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          <MoreOutlined />
        </Space>
      </a>
    </Dropdown>
  )
}

export default EmployeeCardActions
