"use client";
import { Alert, Button, Form, Input, Tag } from 'antd';
import { ArrowRightOutlined, SafetyOutlined } from '@ant-design/icons';
import { useTemplate } from '../theme/ThemeProvider.jsx';
import { Brand } from '../components/shell/Sidebar.jsx';
export default function Login({
  onLogin, busy, error
}) {
  const {
    config
  } = useTemplate();
  return <main className="login-page">
      <section className="login-brand">
        <Brand />
        <div>
          <Tag>OPERATIONS, CONNECTED</Tag>
          <h1>{config.brand.tagline}</h1>
          <p>One workspace for your inventory, finances, and team.</p>
          <div className="login-feature">
            <SafetyOutlined />
            <span>
              Designed to adapt.
              <br />
              Built to become yours.
            </span>
          </div>
        </div>
        <span>Configurable workspace starter</span>
      </section>
      <section className="login-form">
        <div>
          <span className="eyebrow">WELCOME TO {config.brand.name.toUpperCase()}</span>
          <h2>Good to have you here.</h2>
          <p className="muted">Sign in to your admin workspace.</p>
          {error && <Alert className="mb-4" type="error" showIcon message={error} />}
          <Form layout="vertical" onFinish={onLogin} disabled={busy}>
            <Form.Item label="Email" name="email" rules={[{
            required: true,
            type: 'email'
          }]}>
              <Input autoComplete="username" size="large" />
            </Form.Item>
            <Form.Item label="Password" name="password" rules={[{
            required: true,
            min: 8
          }]}>
              <Input.Password autoComplete="current-password" size="large" />
            </Form.Item>
            <Button block size="large" type="primary" htmlType="submit" loading={busy}>
              Sign in <ArrowRightOutlined />
            </Button>
          </Form>
          <p className="login-disclaimer">
            Use the account provided by your administrator.
          </p>
        </div>
      </section>
    </main>;
}

