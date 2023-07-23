import { stringify } from 'querystring';
import { Effect, history, Reducer } from '@umijs/max';
import { HOME_PATH, LOGIN_PATH, NOT_PATH, USER_TOKEN } from '@/constants';
import { logout } from '@/pages/login/service';

export interface AuthModelState {}

interface AuthModelType {
  namespace: string;
  state: AuthModelState;
  effects: {
    logout: Effect;
  };
  reducers: {
    save: Reducer<AuthModelState>;
  };
}

const LoginModel: AuthModelType = {
  namespace: 'authModel',
  state: {},
  effects: {
    // 退出登录
    *logout({ payload }, { call }) {
      let redirect = window.location.pathname;
      const { hash } = window.location;
      if (hash && hash.startsWith('#')) redirect = hash.replace('#', '');
      if (
        !window.location.hash.includes(LOGIN_PATH) &&
        !window.location.pathname.includes(LOGIN_PATH)
      ) {
        history.replace({
          pathname: LOGIN_PATH,
          search: stringify({ redirect: redirect === NOT_PATH ? HOME_PATH : redirect }),
        });
        const response = yield call(logout, payload);
        if (response.success) {
          // 判断是否有缓存路由则删除
          sessionStorage.removeItem(USER_TOKEN);
        }
        return response;
      }
    },
  },
  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};

export default LoginModel;