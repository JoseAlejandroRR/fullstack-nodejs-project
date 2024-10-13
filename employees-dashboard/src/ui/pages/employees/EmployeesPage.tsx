import React from 'react'
import { Button, Typography } from 'antd'

const { Title } = Typography

const EmployeesPage: React.FC = () => {
  return (
    <>
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Title level={2}>Employees</Title>
        <Button type="primary">
          Add New
        </Button>
      </div>
      
    </>
  );
};

export default EmployeesPage
