import LFormItemStaticRadio from '@/components/business/StaticRadio';
import { useRequest } from 'ahooks';
import { message } from 'antd';
import type { LModalFormProps } from 'lighting-design';
import { LForm, LFormItemInput, LModalForm, LFormItemRadio } from 'lighting-design';
import type { FC } from 'react';
import { useEffect } from 'react';
import { apiSaveRole } from '../service';
import { SysRoleType } from '../type';

interface BasicModalProps extends LModalFormProps {
  data: any;
  onChange: () => void;
  open: boolean;
}
const BasicModel: FC<BasicModalProps> = ({ data, onChange, open, ...restProps }) => {
  const [form] = LForm.useForm();

  const { runAsync: runSaveRole } = useRequest<API.HttpResult, SysRoleType[]>(apiSaveRole, {
    manual: true,
    onSuccess(result) {
      if (result.success) {
        onChange(); // 响应成功后，刷新表格
        message.success('操作成功');
      }
    },
  });

  useEffect(() => {
    if (open && data) {
      form.setFieldsValue(data);
    } else {
      form.setFieldValue('state', 1);
    }
  }, [open]);

  return (
    <LModalForm
      open={open}
      form={form}
      width={700}
      labelCol={{ span: 7 }}
      wrapperCol={{ span: 14 }}
      forceRender
      title={data ? '修改信息' : '新建角色'}
      onFinish={async (values) => {
        const { success } = await runSaveRole({ ...data, ...values } as SysRoleType);
        return success;
      }}
      modalProps={{
        afterClose: () => form.resetFields(),
        wrapClassName: 'modal_wrap_render',
      }}
      {...restProps}
    >
      <LFormItemInput name="roleName" required label="角色名称" />
      <LFormItemInput name="roleDesc" label="角色描述" />
      <LFormItemStaticRadio
        label="状态"
        required
        name="state"
        propCode="status"
        radioProps={{ disabled: data?.roleId === 9999 }}
      />
    </LModalForm>
  );
};

export default BasicModel;
