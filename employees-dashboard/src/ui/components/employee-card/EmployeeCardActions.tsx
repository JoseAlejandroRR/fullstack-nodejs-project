import React from 'react'
import { MoreOutlined, CloseOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Dropdown, Space } from 'antd'

const items: MenuProps['items'] = [
  {
    label: 'Delete',
    icon: <CloseOutlined />,
    key: '0',
  },
]

const EmployeeCardActions: React.FC = () => (
  <Dropdown className="menu-actions" menu={{ items }} trigger={['click']} >
    <a onClick={(e) => e.preventDefault()}>
      <Space>
        <MoreOutlined />
      </Space>
    </a>
  </Dropdown>
)

export default EmployeeCardActions
