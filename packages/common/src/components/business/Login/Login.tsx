import React from 'react';
import { Row, Spin } from 'antd';
import { LForm, LFormItemInput, LFormItemPassword } from 'lighting-design';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import login_title_box from './ai/login_title_box.svg';
import style from './index.less';

const AccountDom: React.FC<ILogin> = ({
  captcha,
  onLogin,
  updateCaptcha,
  loading,
  captchaLoading,
}) => {
  const [form] = LForm.useForm();
  return (
    <>
      <LForm
        name="LFormItemInput"
        submitter={{
          showReset: false,
          submitButtonProps: {
            block: true,
          },
          submitText: '登录',
        }}
        form={form}
        loading={loading}
        onFinish={onLogin}
      >
        <LFormItemInput
          name="username"
          required
          disabledWhiteSpace
          placeholder="请输入账号"
          inputProps={{
            prefix: <UserOutlined />,
          }}
        />
        <LFormItemPassword
          name="password"
          disabledCopy={false}
          disabledPaste={false}
          required
          passwordProps={{
            prefix: <LockOutlined />,
          }}
        />
        <LFormItemInput
          name="captcha"
          placeholder="请输入验证码"
          required
          contentAfter={
            captcha?.captchaBase64 ? (
              <Spin spinning={!!captchaLoading}>
                <img
                  onClick={updateCaptcha}
                  src={captcha.captchaBase64}
                  alt="验证码"
                  style={{ width: 108, height: 32, cursor: 'pointer' }}
                />
              </Spin>
            ) : null
          }
        />
      </LForm>
    </>
  );
};

export interface CaptchaImgType {
  captchaBase64: string;
  captchaKey: string;
}

export interface ILogin {
  onLogin: (value: any) => Promise<void>;
  updateCaptcha: () => void;
  captcha?: CaptchaImgType;
  loading?: boolean;
  captchaLoading?: boolean;
}

export const Login: React.FC<ILogin> = (props) => {
  return (
    <Row className={style.login_container}>
      <div className={style.login_title_box}>
        <img src={login_title_box} alt="Ai能力服务平台" />
      </div>
      <div className={style.login_box}>
        <div className={style.login_content}>{<AccountDom {...props} />}</div>
      </div>
    </Row>
  );
};
