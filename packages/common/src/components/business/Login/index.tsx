import { USER_TOKEN } from '@/constants';
import { getPageQuery, onRoundRoutes, onTreeNodes } from '../../../utils/utils';
import { history, useModel } from '@umijs/max';
import { useRequest } from 'ahooks';
import { CaptchaImgType, Login } from './Login';
import { apiGetCaptchaImg, apiLogin } from '../../../services/login';

export interface FormDataType {
  username: string;
  password: string;
  captchaKey: string;
}

export const LoginPage = () => {
  const { setInitialState } = useModel('@@initialState');
  const {
    run: runGetCaptchaImg,
    data: captcha,
    mutate,
    loading: captchaLoading,
  } = useRequest<CaptchaImgType, any>(apiGetCaptchaImg, {
    // 这里需要将 API.HttpResult<CaptchaImgType>突变成CaptchaImgType，这里只能通过any来兼容
    onSuccess({ data }: any) {
      mutate(data);
    },
  });
  const { run: runLogin, loading } = useRequest(apiLogin, {
    manual: true,
    onSuccess(result) {
      if (result.success) {
        const { data } = result;
        sessionStorage.setItem(USER_TOKEN, data.token);
        setInitialState((s: any) => ({
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
        // form.setFieldValue('captcha', undefined);
        runGetCaptchaImg();
      }
    },
  });

  const handleLogin = async (value: FormDataType) => {
    await runLogin({ ...value, captchaKey: captcha?.captchaKey as string });
  };
  return (
    <Login
      onLogin={handleLogin}
      updateCaptcha={runGetCaptchaImg}
      captchaLoading={captchaLoading}
      captcha={captcha}
      loading={loading}
    />
  );
};
// export const Login = () => <div>123</div>;
