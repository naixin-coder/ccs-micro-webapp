import { request } from '@umijs/max';
import qs from 'querystring';

/**
 * 获取文件名称
 * @param {RequestOptionsInit} options
 * @param {Response} response
 * @return {*}
 */
function getFileName(options: any, response: any) {
  let fileName = '文件.txt';
  const disposition = response.headers['content-disposition'];
  if (options.fileName) {
    if (disposition) {
      const arr = disposition.split('; ');
      const nameArr = window
        .decodeURIComponent(arr[arr.length - 1].split('=')[1])
        .replace(/'|"/g, '')
        .split('.');
      const suffix = nameArr[nameArr.length - 1];
      fileName = `${options.fileName}.${suffix}`;
    }
  } else if (options?.fileName) {
    if (disposition) {
      const arr = disposition.split('; ');
      const nameArr = window
        .decodeURIComponent(arr[arr.length - 1].split('=')[1])
        .replace(/'|"/g, '')
        .split('.');
      const suffix = nameArr[nameArr.length - 1];
      fileName = `${options.fileName}.${suffix}`;
    }
  } else if (disposition) {
    const arr = disposition.split('; ');
    fileName = window.decodeURIComponent(arr[arr.length - 1].split('=')[1]).replace(/'|"/g, '');
  }
  return fileName;
}

/**
 * get请求
 * @param url
 * @param data
 * @param params
 */
function post(url: string, data?: any, params?: any) {
  const newUrl = params ? `${url}?${qs.stringify(params)}` : url;
  return request(newUrl, {
    data,
    method: 'POST',
  });
}
/**
 * post请求
 * @param url
 * @param params
 */
function get(url: string, params?: any) {
  return request(url, { params });
}

/**
 * 下载文件请求
 * @param url
 * @param options
 * @returns
 */
async function download(url: string, options: any) {
  const response = await request(url, {
    method: options?.method ?? 'GET',
    responseType: 'blob',
    getResponse: true,
    ...options,
  });

  if (response.status === 200) {
    const blob: Blob = new Blob([response.data]);
    const fileName: string = getFileName(options, response);
    const selfURL = window[window.webkitURL ? 'webkitURL' : 'URL'];
    const aElement: HTMLAnchorElement = document.createElement('a');
    aElement.download = fileName;
    aElement.style.display = 'none';
    aElement.target = '_blank';
    aElement.href = selfURL.createObjectURL(blob);
    document.body.appendChild(aElement);
    aElement.click();
    selfURL.revokeObjectURL(aElement.href);
    document.body.removeChild(aElement);
  }
  return response;
}

export { post, get, download };
