import { BASE_URL } from '../src/constants';

export default {
  dev: {
    //开发环境
    '/aiys': {
      target: BASE_URL,
      changeOrigin: true,
    },
  },
};
