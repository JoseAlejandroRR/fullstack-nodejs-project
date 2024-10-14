import React from 'react'
import { Button, Dropdown, Popconfirm, Space, Typography } from 'antd'
import { MoreOutlined, CloseOutlined, EditOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'

const { Text } = Typography

type MenuAction = {
  onEdit: Function,
  onDelete: Function
}

const EmployeeCardActions: React.FC<MenuAction> = ({ onEdit, onDelete }) => {

  const handleEdit = () => {
    onEdit()
  }

  const handleDelete = () => {
    onDelete()
  }

  const items: MenuProps['items'] = [
    {
      icon: <>
        <EditOutlined />
        <Text style={{ paddingLeft: '10px' }}>Edit</Text>
      </>,
      key: '0',
      onClick: handleEdit,
    },
    {
      icon: <>
        <Popconfirm title={`Confirm to Delete`} onConfirm={handleDelete}>
          <CloseOutlined />
          <Text style={{ paddingLeft: '10px' }}>Delete</Text>
        </Popconfirm>
      </>,
      key: '1',
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
