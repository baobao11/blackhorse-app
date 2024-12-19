import './index.scss'
import { Card, Form, Input, Button } from 'antd'
import logo from '@/assets/logo.png'
import { useDispatch } from 'react-redux'
import { fetchLogin } from '@/store/modules/user'
const Login = () => {
  const dispatch = useDispatch()
  const onFinish = (values) => {
    console.log('Success:', values)
    // 触发异步action fetchLogin
    dispatch(fetchLogin(values))
  }
  return (
    <div className="login">
      <Card className="login-container">
        <img className="login-logo" src={logo} alt="" />
        {/* 登录表单 */}
        <Form onFinish={onFinish}>
          <Form.Item
            name="mobile"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}>
            <Input size="large" placeholder="请输入手机号" />
          </Form.Item>
          {/* 246810 */}
          <Form.Item 
            name="code"
            rules={[
              {
                required: true,
                message: 'Please input your code!',
              },
            ]}>
            <Input size="large" placeholder="请输入验证码"  />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Login
