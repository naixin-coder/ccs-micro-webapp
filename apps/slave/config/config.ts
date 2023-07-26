import GlobalConfig from '../src/global';
import { defineConfig } from '@umijs/max';
import proxy from './proxy';
import routes from './routes';
import { theme } from 'antd';

const { REACT_APP_ENV = 'dev' } = process.env;
const { defaultAlgorithm, defaultSeed } = theme;
const mapToken = defaultAlgorithm(defaultSeed);
export default defineConfig({
  hash: true,
  targets: {},
  routes,
  theme: {
    'root-entry-name': 'variable',
  },
  title: GlobalConfig.AppName,
  // base: GlobalConfig.Context,
  base: '/slave',
  outputPath: 'slave',
  // 路径
  publicPath: GlobalConfig.Context,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV as keyof typeof proxy],
  fastRefresh: true,
  dva: {},
  //============== 以下都是max的插件配置 ===============
  model: {},
  initialState: {},
  lessLoader: {
    modifyVars: {
      ...mapToken,
      // 注入全局定义variables
      hack: 'true; @import "@/styles/variables.less";',
    },
  },
  moment2dayjs: {
    preset: 'antd',
    plugins: ['duration'],
  },
  antd: {
    import: false,
  },
  request: {},
  access: {},
  headScripts: [
    {
      src: `/scripts/loading.js`,
      async: true,
    },
  ],
  //================ pro 插件配置 =================
  presets: ['umi-presets-pro'],
  // 开启后packages中的组件无法更新
  mfsu: false,
  // mfsu: {
  //   strategy: 'normal',
  // },
  requestRecord: {},
  //webpack配置

  //qiankun配置
  qiankun: {
    slave: {},
  },
});
