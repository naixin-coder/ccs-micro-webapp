export const BASE_URL = 'https://skdc.rongzhidata.com:10010' as const; //

export const USER_TOKEN = `USER_TOKEN`;

/** 登录页路由 */
export const LOGIN_PATH = '/login';
/** 首页路由 */
export const HOME_PATH = '/';
/** 404路由 */
export const NOT_PATH = '/404';
/** 配置不需要权限的路由 */
export const NOT_ACCESS = ['*', '/', '/login'];
/** 权限Name */
export const ACCESS_NAME = 'access';
/** RSA Key */
export const ENCRYPT_KEY =
  'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDNITp//CLrnCVMQwwVJa69/bQ569g6El9HTtNseBE6nnS6J9mmpiLYIvgEOvRpGd1+hdGV+RQnvGSm6/EkziYDTdzeN9mwj8XK/mPeKoWA/uETyvRDoxxbUqi+Et/JH9Y10TFL3YYAaoDyIgWucbFLgMCJAvvY2f5DEYiB/1YPlwIDAQAB';
