import React, { useEffect } from 'react'
import type { FormProps } from 'antd'
import { Button, DatePicker, Divider, Form, Input, notification, Select } from 'antd'
import { CreateEmployeeDto } from '../../../data/dto/CreateEmployeeDto'
import useEmployees from '../../../data/hooks/useEmployees'
import { EmployeeDto } from '../../../data/dto/EmployeeDto'
import useDepartments from '../../../data/hooks/useDepartments'
import dayjs, { Dayjs } from 'dayjs'

type FieldType = CreateEmployeeDto

type EmployeeFormProps = {
  employee: EmployeeDto | null
  onDataChange: Function
}

const initialValues = {
  firstname: '',
  lastname: '',
  phone: '',
  address: '',
  hiredAt: dayjs(),
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({ employee, onDataChange }) => {
  const { createEmployee, updateEmployee } = useEmployees()
  const { departments, getAllDepartments } = useDepartments()
  const [ form ] = Form.useForm()

  useEffect(() => {
    getAllDepartments()
  }, [])

  useEffect(() => {
    if (!employee) {
      form.setFieldsValue(initialValues)
      return
    }
    console.log(employee.departmentId)
    form.setFieldsValue({
      firstname: employee.firstname,
      lastname: employee.lastname,
      phone: employee.phone,
      address: employee.address,
      hiredAt: dayjs(employee.hiredAt),
      departmentId: employee.departmentId,
    })
  }, [employee])

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {

    try {
      let res = null
      if (!employee) {
        res = await createEmployee(values)
        notification.success({ message: 'Employee created', placement: 'bottomRight' })
      } else { 
        res = await updateEmployee(employee.id, values)
        notification.success({ message: 'Employee updated', placement: 'bottomRight' })
      }
      onDataChange(res)
    } catch(err) {
      notification.error({ message: 'Something bad happened', placement: 'bottomRight' })
    }
  }
  
  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  const dateFilter = (current: Dayjs | null) => !!current && current > dayjs().endOf('day')

  return (
    <Form
      name="employee-form"
      form={form}
      layout="vertical"
      initialValues={{ remember: false }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        label="Firstname"
        name="firstname"
        rules={[{ required: true, message: 'Firstname is missing' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Lastname"
        name="lastname"
        rules={[{ required: true, message: 'Lastname is missing' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Hire Date"
        name="hiredAt"
        rules={[{ required: true, message: 'Hire Date is required' }]}
      >
        <DatePicker disabledDate={dateFilter} style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item<FieldType>
        label="Department"
        name="departmentId"
        rules={[{ required: true, message: 'Choose a Department' }]}
      >
        <Select>
          {
            departments && departments.map((item, index) => (
              <Select.Option key={index} value={ item.id }>{ item.name }</Select.Option>
            ))
          }
        </Select>
      </Form.Item>

      <Form.Item<FieldType>
        label="Telephone"
        name="phone"
        rules={[{ required: true, message: 'Telephone is missing' }]}
      >
        <Input placeholder="+1 555 555555" />
      </Form.Item>

      <Form.Item<FieldType>
        label="Address"
        name="address"
        rules={[{ required: true, message: 'Address is missing' }]}
      >
        <Input placeholder="132 Street, New York 12401, US" />
      </Form.Item>
      <Divider />
      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

export default EmployeeForm
