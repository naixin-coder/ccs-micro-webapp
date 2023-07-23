import { post, download, get } from '@/services/http';

// 上传文件
export const apiFileUpload = (param: { file: any }) =>
  post('/service-obs/auth/FileController/fileUpload', param);

// 下载文件
export const apiFileDownload = (params: { fileRecordId: string; fileName: string }[]) =>
  download('/service-obs/auth/FileController/download', {
    method: 'GET',
    params,
  });

// 打包下载
export const apiDownloadZip = (data: any) =>
  download('/service-obs/auth/ZipFileController/downloadZip', {
    method: 'POST',
    data,
    fileName: data.fileName,
  });

// 静态值属性值分页
export const apiQueryPageValue = (param: API.PageQuery) =>
  post('/service-sysmgr/auth/PropertyController/pageValue', param);

// 模糊查询组织
export const apiPagefindOrg = (params: { orgName: string }) =>
  post(`/service-league/LeagueController/auth/pageLeague`, params);

// 公共接口-查询组织树
export const apiPublicOrgChildren = (params: { orgName: string }) =>
  get(`/service-league/LeagueController/auth/getPublicOrgChildren`, params);
