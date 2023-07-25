import { BASE_URL } from '../src/constants';

export default {
  dev: {
    //开发环境
    '/area': {
      target: BASE_URL,
      changeOrigin: true,
    },
  },
};
