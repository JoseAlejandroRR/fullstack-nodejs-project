import React, { useEffect } from 'react'
import { Button, Col, Divider, Form, Input, notification, Row, Typography } from 'antd'
import type { FormProps } from 'antd'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../../data/hooks/useAuth'

import './LoginPage.scss'

const { Title } = Typography

type FieldType = {
  email: string
  password: string
}

const LoginPage: React.FC = () => {
  const [ form ] = Form.useForm()
  const { auth, error, userLogin } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (auth.token) {
      navigate('/')
    }
  }, [auth])

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {

    try {
      userLogin(values.email, values.password)
    } catch(err) {
      notification.error({ message: 'Something bad happened', placement: 'bottomRight' })
    }
  }
  
  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <div className="login-page">
      <Row>
        <Col span={8} offset={8} xl={{ span: 6, offset: 9 }} >
          <Form
            name="employee-form"
            form={form}
            layout="vertical"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Title level={2}>Login</Title>
            <Form.Item<FieldType>
              name="email"
              rules={[
                { required: true, message: 'Please input your Email' },
                { type: 'email', message: 'The input is not valid E-mail'},
              ]}
            >
              <Input type="email" placeholder="name@domain.com" />
            </Form.Item>

            <Form.Item<FieldType>
              name="password"
              rules={[{ required: true, message: 'Please input Password' }]}
            >
              <Input type="password" placeholder="password" />
            </Form.Item>
            <Divider />
            {
              error !== null && (
                <Title level={4} className="error-auth">Invalid Credentials</Title>
              )
            }
            <Form.Item >
              <Button type="primary" htmlType="submit" block>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
         
    </div>
  )
}

export default LoginPage
