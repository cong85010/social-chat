import { Button, Checkbox, Divider, Form, Input } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
function Login() {
 const navigate = useNavigate();

 const onFinish = (values) => {
  alert('Login success!!');
  console.log('Success:', values);
  navigate('/messenger');
 };

 const onFinishFailed = (errorInfo) => {
  alert('Fail!!');
  console.log('Failed:', errorInfo);
 };

 return (
  <>
   <Divider orientation="center">Login form</Divider>
   <Form
    name="basic"
    labelCol={{
     span: 8,
    }}
    wrapperCol={{
     span: 8,
    }}
    initialValues={{
     remember: true,
    }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
   >
    <Form.Item
     label="Username"
     name="username"
     rules={[
      {
       required: true,
       message: 'Please input your username!',
      },
     ]}
    >
     <Input />
    </Form.Item>

    <Form.Item
     label="Password"
     name="password"
     rules={[
      {
       required: true,
       message: 'Please input your password!',
      },
     ]}
    >
     <Input.Password />
    </Form.Item>

    <Form.Item
     name="remember"
     valuePropName="checked"
     wrapperCol={{
      offset: 8,
      span: 8,
     }}
    >
     <Checkbox>Remember me</Checkbox>
    </Form.Item>

    <Form.Item
     wrapperCol={{
      offset: 8,
      span: 8,
     }}
    >
     <Button type="primary" htmlType="submit">
      Submit
     </Button>
    </Form.Item>
   </Form>
  </>
 );
}

export default Login;
