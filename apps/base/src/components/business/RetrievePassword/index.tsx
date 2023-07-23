import { UserOutlined } from '@ant-design/icons';
import { useModel } from '@umijs/max';
import { useRequest } from 'ahooks';
import { Form, Input, message, Modal, Progress, Tooltip, Typography } from 'antd';
import {
  LForm,
  LFormItemCaptcha,
  LFormItemInput,
  LModalFormProps,
  LStepsForm,
  LStepsFormActionRef,
} from 'lighting-design';
import { FC, useRef, useState } from 'react';
import { apiModifyPwd, apiRetrievePwd, apiSendSmsCode, getCaptchaImg } from './service';

import {
  level,
  REG_CHINESE,
  REG_LOWERCASE,
  REG_NUMBER,
  REG_SYMBOL,
  REG_UPPERCASE,
  STATUS_TEXT,
} from './utils';
interface PasswordModalProps extends LModalFormProps {
  open: boolean;
  close: () => void;
}

interface CaptchaImgType {
  captchaBase64: string;
  captchaKey: string;
}
const RetrievePassword: FC<PasswordModalProps> = ({ open, close }) => {
  const [form] = LForm.useForm();
  const [captcha, setCaptcha] = useState<CaptchaImgType>();
  const [errorMsg, setErrorMsg] = useState<string>();
  const [verify, setVerify] = useState<boolean[]>([false, false, false]);

  const [visible, setVisible] = useState<boolean>(false);
  const [steps, setSteps] = useState<number>(0);
  const [secretKey, setSecretKey] = useState<string>('');
  const [validateStatus, setValidateStatus] = useState<'success' | 'warning' | 'error' | ''>('');
  const { run } = useRequest<API.HttpResult<CaptchaImgType>, any>(getCaptchaImg, {
    onSuccess(result) {
      const { data } = result;
      if (result.success) setCaptcha({ ...data });
    },
  });

  const { runAsync: runRetrievePwd } = useRequest<API.HttpResult, any>(apiRetrievePwd, {
    manual: true,
  });
  const { runAsync: runModifyPwd } = useRequest<API.HttpResult, any>(apiModifyPwd, {
    manual: true,
  });
  const actionRef = useRef<LStepsFormActionRef>();
  // 获取手机验证码
  const { run: runSendSmsCode } = useRequest<API.HttpResult, any>(apiSendSmsCode, {
    manual: true,
  });
  const { Text } = Typography;
  const TextStyle = { marginBottom: 4, display: 'block' };
  const TooltipStyle = {
    width: 400,
    minHeight: 100,
    padding: 16,
    color: '#000',
    fontSize: 13,
  };
  const { initialState } = useModel('@@initialState');
  if (!initialState) return null;
  const { currentUser } = initialState as any;
  const WordPopover = () => {
    return (
      <div style={{ width: '100%' }}>
        <Text style={TextStyle} type="secondary" strong={!verify[0]} delete={verify[0]}>
          1、请勿包含用户名、空格、中文字符。
        </Text>
        <Text style={TextStyle} type="secondary" strong={!verify[1]} delete={verify[1]}>
          2、密码长度必须大于8位数小于16位数。
        </Text>
        <Text style={TextStyle} type="secondary" strong={!verify[2]} delete={verify[2]}>
          3、数字、小写字母、大写字母、特殊字符，至少包含三种。
        </Text>
        {steps !== 0 && (
          <>
            <Progress
              percent={steps * 20}
              steps={5}
              strokeLinecap="butt"
              showInfo={false}
              strokeColor={['red', 'red', 'orange', 'orange', '#52c41a']}
              style={{ marginRight: 10 }}
            />
            {STATUS_TEXT[steps]}
            <br />
          </>
        )}
      </div>
    );
  };

  const pwdChange = (value: string) => {
    if (value) {
      const key = level(value);
      switch (key) {
        case STATUS_TEXT[1]:
          setValidateStatus('error');
          setSteps(1);
          break;
        case STATUS_TEXT[2]:
          setValidateStatus('error');
          setSteps(2);
          break;
        case STATUS_TEXT[3]:
          setValidateStatus('warning');
          setSteps(3);
          break;
        case STATUS_TEXT[4]:
          setValidateStatus('success');
          setSteps(4);
          break;
        case STATUS_TEXT[5]:
          setValidateStatus('success');
          setSteps(5);
          break;
      }
    } else {
      setSteps(0);
      setVerify([false, false, false]);
    }
  };

  /**
   * 校验密码是否符合条件
   * @param password 密码
   * @param username 用户名
   */
  const checkPasswordRule = (password: string, username: string) => {
    const newVerify = [...verify];
    if (!password) {
      setValidateStatus('error');
      return '请输入新密码!';
    }

    if (password.indexOf(username) !== -1 || password.match(REG_CHINESE) || /\s/g.test(password)) {
      newVerify[0] = false;
      setVerify(newVerify);
      return '请勿包含用户名、空格、中文字符';
    } else {
      newVerify[0] = true;
    }
    if (password === '' || password.length < 8 || password.length > 16) {
      newVerify[1] = false;
      setVerify(newVerify);
      return '密码长度应大于8位数小于16位数';
    } else {
      newVerify[1] = true;
    }

    let i: number = 0;
    if (password.match(REG_NUMBER)) i++;
    if (password.match(REG_LOWERCASE)) i++;
    if (password.match(REG_UPPERCASE)) i++;
    if (password.match(REG_SYMBOL)) i++;
    if (i < 3) {
      newVerify[2] = false;
      setVerify(newVerify);
      return '数字、小写字母、大写字母、特殊字符，至少包含三种';
    } else {
      newVerify[2] = true;
    }
    setVerify(newVerify);
    return true;
  };

  return (
    <div>
      <LStepsForm
        actionRef={actionRef}
        stepsFormRender={(stepsDom, formDom, submitterDom) => {
          return (
            <Modal
              title="找回密码"
              open={open}
              footer={submitterDom}
              width={600}
              onCancel={() => {
                close();
                actionRef.current?.reset();
              }}
            >
              {stepsDom}
              {formDom}
            </Modal>
          );
        }}
      >
        <LStepsForm.StepForm
          form={form}
          title="账号验证"
          onFinish={async (values: any) => {
            const res = await runRetrievePwd({ ...values, captchaKey: captcha?.captchaKey });
            const { data, success } = res;
            if (success) {
              setSecretKey(data);
              message.success('验证成功');
              return true;
            } else {
              return false;
            }
          }}
        >
          <LFormItemInput
            name="username"
            required
            disabledWhiteSpace
            placeholder="请输入用户名"
            inputProps={{
              prefix: <UserOutlined />,
            }}
          />

          <LFormItemInput
            name="phoneNum"
            required
            type="phone"
            disabledWhiteSpace
            placeholder="请输入手机号"
            rules={[
              {
                required: true,
                message: '手机号格式错误!',
                pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/,
                min: 11,
              },
            ]}
          />
          <LFormItemCaptcha
            type="inline"
            name="shortMsgCode"
            required
            second={90}
            onGetCaptcha={async () => {
              await form.validateFields(['phoneNum']);

              const phone = form.getFieldValue('phoneNum');
              runSendSmsCode({ mobile: phone });
              message.success('获取验证码成功！验证码为：1234');
            }}
            placeholder="请输入验证码"
            cacheKey="LOGIN_FROM"
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
        </LStepsForm.StepForm>
        <LStepsForm.StepForm
          title="修改密码"
          submitter={{
            showPrev: false,
            onSubmit: async () => {
              const { newPwd } = actionRef.current?.formInstanceList[1].getFieldsValue();
              const res = await runModifyPwd({ newPwd, secretKey });
              if (res.success) {
                actionRef.current?.reset();
                message.success('修改密码成功');
                close();
              }
            },
          }}
        >
          <div>
            <Tooltip
              placement="topLeft"
              color="#fff"
              trigger="focus"
              align={{ offset: [110, -5] }}
              overlayInnerStyle={TooltipStyle}
              getTooltipContainer={(dom) => dom}
              title={<WordPopover />}
            >
              <Form.Item
                name="newPwd"
                label="新密码"
                required
                hasFeedback
                validateStatus={validateStatus}
                tooltip="密码应由8-16位数字、字母、符号组成。请不要使用易被猜的密码。"
                rules={[
                  {
                    validator: (_, value: string) => {
                      pwdChange(value);
                      const check = checkPasswordRule(value, currentUser?.workerName || '');
                      if (typeof check === 'string') {
                        return Promise.reject(new Error(check));
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <Input.Password maxLength={16} placeholder="请输入新密码" allowClear />
              </Form.Item>
            </Tooltip>
            <Form.Item
              label="确认密码"
              name="confirm"
              dependencies={['newPwd']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: '请输入确认密码!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('newPwd') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('两次密码输入不一致'));
                  },
                }),
              ]}
            >
              <Input.Password
                autoComplete="new-password"
                allowClear
                type="password"
                placeholder="输入确认密码"
              />
            </Form.Item>
          </div>
        </LStepsForm.StepForm>
      </LStepsForm>
    </div>
  );
};

export default RetrievePassword;
