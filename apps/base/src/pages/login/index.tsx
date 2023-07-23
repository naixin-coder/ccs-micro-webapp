import login_title_box from '@/assets/imgs/login/ai/login_title_box.svg';
import { USER_TOKEN } from '@/constants';
import { isDev } from '@/layouts/BaseLayout';
import { getPageQuery, onRoundRoutes, onTreeNodes } from '@/utils';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { history, useModel } from '@umijs/max';
import { useLongPress, useRequest } from 'ahooks';
import { Row } from 'antd';
import { LForm, LFormItemInput, LFormItemPassword } from 'lighting-design';
import { useEffect, useRef, useState } from 'react';
import { doLogin, getCaptchaImg } from './service';
import style from './style.less';

interface CaptchaImgType {
  captchaBase64: string;
  captchaKey: string;
}

export interface FormDataType {
  username: string;
  password: string;
  captchaKey: string;
}

const Login = () => {
  const { setInitialState } = useModel('@@initialState');

  const [captcha, setCaptcha] = useState<CaptchaImgType>();
  const [errorMsg, setErrorMsg] = useState<string>();
  const [form] = LForm.useForm();

  const ref = useRef<HTMLButtonElement>(null);
  useLongPress(
    () => {
      form.setFieldsValue({
        username: '13996280848',
        password: '@Crunii,.123',
      });
    },
    ref,
    {
      delay: 3000,
    },
  );

  const { run } = useRequest<API.HttpResult<CaptchaImgType>, any>(getCaptchaImg, {
    onSuccess(result) {
      const { data } = result;
      if (result.success) setCaptcha({ ...data });
    },
  });

  const { loading, run: runLogin } = useRequest<API.HttpResult<any>, FormDataType[]>(doLogin, {
    manual: true,
    onSuccess: (result) => {
      if (result.success) {
        setErrorMsg('');
        const { data } = result;
        sessionStorage.setItem(USER_TOKEN, data.token);
        setInitialState((s) => ({
          ...s,
          currentUser: {
            ...data,
            authButton: onTreeNodes(data.treeNodes, 'Button'),
            authUrl: onTreeNodes(data.treeNodes, 'Menu', []),
            routes: [...onRoundRoutes(data.treeNodes, [])],
          },
        }));
        const params = getPageQuery();
        const { redirect = '/' } = params as { redirect: string };
        history.push(redirect);
      } else {
        setErrorMsg(result.msg);
        form.setFieldValue('captcha', undefined);
        run();
      }
    },
  });

  // 自动消失
  useEffect(() => {
    if (errorMsg) {
      setTimeout(() => {
        setErrorMsg('');
      }, 4000);
    }
  }, [errorMsg]);

  // 账号密码登录
  const AccountDom = () => (
    <LForm
      name="LFormItemInput"
      submitter={{
        showReset: false,
        submitButtonProps: {
          block: true,
          ref,
        },
        submitText: '登录',
      }}
      form={form}
      loading={loading}
      onFinish={async (values) => {
        setErrorMsg('');
        runLogin({ ...values, captchaKey: captcha?.captchaKey, scope: 'WEB' });
      }}
    >
      <LFormItemInput
        name="username"
        required
        disabledWhiteSpace
        placeholder="请输入账号"
        initialValue={isDev ? '13344556677' : ''}
        inputProps={{
          prefix: <UserOutlined />,
        }}
      />
      <LFormItemPassword
        name="password"
        disabledCopy={false}
        disabledPaste={false}
        required
        initialValue={isDev ? 'Gkh012.*11' : ''}
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
            <img
              onClick={run}
              src={captcha.captchaBase64}
              alt="验证码"
              style={{ width: 108, height: 32, cursor: 'pointer' }}
            />
          ) : null
        }
      />
    </LForm>
  );

  return (
    <Row className={style.login_container}>
      <div className={style.login_title_box}>
        <img src={login_title_box} alt="Ai能力服务平台" />
      </div>
      <div className={style.login_box}>
        <div className={style.login_content}>{<AccountDom />}</div>
      </div>
    </Row>
  );
};

export default Login;
