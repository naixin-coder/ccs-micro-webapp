import { LoginPage } from '@ccs/common';

export interface FormDataType {
  username: string;
  password: string;
  captchaKey: string;
}

const Login = () => {
  return <LoginPage />;
};
export default Login;
