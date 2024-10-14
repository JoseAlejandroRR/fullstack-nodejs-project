import React, { useEffect, useState } from 'react'
import { Button, Form, Select } from 'antd'
import type { FormProps } from 'antd'
import { DepartmentDto } from '../../../data/dto/DepartmentDto'

type DepartmentUpdateFormProps = {
  departments: DepartmentDto[]
  departmentId: string
  onSelected: Function
}

type FieldType = {
  departmentId: string
}

const DepartmentUpdateForm: React.FC<DepartmentUpdateFormProps> = ({
  departments, departmentId, onSelected
}) => {
  const [ showBtn, setShowBtn ] = useState<boolean>(false)
  const [ form ] = Form.useForm()

  useEffect(() => {
    if (!departmentId || departments) null

    form.setFieldsValue({
      departmentId
    })
  }, [departments, departmentId])

  const handleSelect = (id: string) => {
    if (id === departmentId) {
      setShowBtn(false)
      return
    }

    setShowBtn(true)
  }

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    onSelected && onSelected(values.departmentId)
  }

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <>
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
        name="departmentId"
        rules={[{ required: true, message: 'Please choose Department!' }]}
      >
        <Select onSelect={handleSelect}>
          {
            departments && departments.map((item, index) => (
              <Select.Option key={index} value={ item.id }>{ item.name }</Select.Option>
            ))
          }
        </Select>
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
        <Button type="primary" htmlType="submit" disabled={!showBtn}>
          Update
        </Button>
      </Form.Item>
    </Form>
    </>
  )
}

export default DepartmentUpdateForm
