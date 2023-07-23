import { ENCRYPT_KEY } from '@/constants';
import { NOTIFICATION_TYPES } from '@/constants/enum';
import { notification } from 'antd';
import { JSEncrypt } from 'jsencrypt';
import { throttle } from 'lodash-es';
import { parse } from 'querystring';

/**
 * string to HEX
 * @param {*} str
 */
function stringToHex(str: string) {
  if (str === '') return '';
  const hexCharCode = [];
  for (let i = 0; i < str.length; i += 1) {
    hexCharCode.push(str.charCodeAt(i).toString(16));
  }
  return hexCharCode.join('').toUpperCase();
}

/**
 * RSA加密
 * @param {String} value
 */
function RsaEncrypt(value: string) {
  const encrypt = new JSEncrypt();
  encrypt.setPublicKey(ENCRYPT_KEY);
  return encrypt.encrypt(value);
}

/**
 * 全局通知提醒框
 * @param {String} title
 * @param {String} des
 * @param {String} type
 */
const showNotification = throttle(
  (
    type: 'success' | 'info' | 'warning' | 'error',
    title = NOTIFICATION_TYPES[type],
    des = '...',
    duration = 2,
  ) => {
    notification[type]({
      message: title,
      description: des,
      duration,
    });
  },
  1000,
  { leading: true, trailing: false },
);

const getPageQuery = () => parse(window.location.href.split('?')[1]);

/**
 * 铺平按钮权限
 * @param authList
 * @param type  `Menu`,`Buttom`
 * @param newList
 * @returns
 */
const onTreeNodes = (authList: API.MenuType[], type: 'Menu' | 'Button', newList: string[] = []) => {
  authList.forEach((item) => {
    if (
      item.nodeData.menuUrl &&
      (type === 'Button' ? item.nodeData.menuType === 2 : item.nodeData.menuType !== 2)
    ) {
      newList.push(item.nodeData.menuUrl);
    }

    if (item.children) onTreeNodes(item.children, type, newList);
  });
  return new Set([...newList]);
};

/**
 * 铺平路由
 * @param menuList
 * @param newList
 * @returns
 */
const onRoundRoutes = (menuList: API.MenuType[], newList: API.MenuType['nodeData'][] = []) => {
  menuList.forEach((item) => {
    if (item.nodeData.menuType !== 2 && item.nodeData.menuUrl) {
      newList.push(item.nodeData);
    }
    if (item.children) {
      onRoundRoutes(item.children, newList);
    }
  });
  return new Set([...newList]);
};

/**
 *  模拟请求
 * @param time
 * @param data
 * @returns
 */

function awaitTime(
  data?: any,
  time = 2000,
): Promise<{
  data?: any;
  success: boolean;
  code: string;
}> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data, success: true, code: '200' });
    }, time);
  });
}

/**
 * 计算百分比
 * @param data 分子集合
 * @param total 总量
 */
const computePercent = (data: any[], total: number) => {
  if (!data.length || total === 0) {
    return '0';
  }
  if (data.length === 1) {
    return `${Math.round((data[0] / total) * 10000) / 100.0}`;
  }
  return data?.map((val) => {
    return `${Math.round((val / total) * 10000) / 100.0}`;
  });
};
/**
 * rem适配计算
 * @param res
 * @returns
 */
const fontSize = (res: any) => {
  const clientWidth =
    window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  if (!clientWidth) return;
  let fontSize = clientWidth / 1920; // 设计图宽度
  return res * fontSize;
};
export {
  showNotification,
  stringToHex,
  getPageQuery,
  awaitTime,
  onTreeNodes,
  onRoundRoutes,
  RsaEncrypt,
  computePercent,
  fontSize,
};
