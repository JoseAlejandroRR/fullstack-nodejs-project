import React from 'react'
import { Table, Tag, Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons'
import { EmployeeAssignmentDto } from '../../../data/dto/EmployeeAssignment'
import { DateToShortTextFormat, DateToTextRelative } from '../../../data/utils'

type EmployeeAssignmentHistoryProps = {
  assignments: EmployeeAssignmentDto[],
}

const EmployeeAssignmentHistory: React.FC<EmployeeAssignmentHistoryProps> = ({
  assignments
}) => {

  const dataSource = assignments.map((assignment: EmployeeAssignmentDto) => ({
    ...assignment,
    key: assignment.id,
  }))

  const columns = [
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
      render: (_: any, item: EmployeeAssignmentDto) => <>
        { item.department?.name }
        {
          item.isActive && (
            <Tag color="gray" style={{ marginLeft: 10 }}>Current</Tag>
          )
        }
      </>
    },
    {
      title: 'Start',
      dataIndex: 'startDate',
      key: 'start',
      render: (startDate: Date) => <>
        <Tooltip title={DateToTextRelative(startDate)}>
          {DateToShortTextFormat(startDate)} <InfoCircleOutlined />
        </Tooltip>
        </>
    },
    {
      title: 'End',
      dataIndex: 'endDate',
      key: 'end',
      render: (endDate: Date) => <>
      {
        endDate && (
        <Tooltip title={DateToTextRelative(endDate)}>
          {DateToShortTextFormat(endDate)} <InfoCircleOutlined />
        </Tooltip>
      )}
    </>
    },
    {
      title: 'Updated At',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (updatedAt: Date) => <>{ DateToShortTextFormat(updatedAt) }</>
    },
  ]

  return (
    <Table dataSource={dataSource} columns={columns} style={{ width: '100%' }}
      pagination={{ pageSize: 20 }}  />
  )
}

export default EmployeeAssignmentHistory
