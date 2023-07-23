import { post } from '@/services/http';
import { SysPropType, SysPropValueType } from './type';

// 属性分页
export const apiQueryPageProperty = (param: API.PageQuery) =>
  post('/service-sysmgr/auth/PropertyController/pageProperty', param);

// 创建属性
export const apiCreate = (param: SysPropType) => {
  if (param.propId) {
    return post('/service-sysmgr/auth/PropertyController/updateProperty', param);
  }
  return post('/service-sysmgr/auth/PropertyController/createProperty', param);
};

// 创建属性值
export const apiCreateValue = (param: SysPropValueType) => {
  if (param.valueId) {
    return post('/service-sysmgr/auth/PropertyController/updateValue', param);
  }
  return post('/service-sysmgr/auth/PropertyController/createValue', param);
};
