import LFormItemStaticRadio from '@/components/business/StaticRadio';
import { useRequest } from 'ahooks';
import {
  LForm,
  LFormItemInput,
  LModalForm,
  LFormItemTextArea,
  LModalFormProps,
} from 'lighting-design';
import type { FC } from 'react';
import { useEffect } from 'react';
import { apiCreateGroup } from '../service';
import { SysUrlGroupType } from '../type';

interface BasicModalProps extends LModalFormProps {
  data: any;
  onChange: () => void;
  open: boolean;
}
const UrlGroupModel: FC<BasicModalProps> = ({ data, onChange, open, ...restProps }) => {
  const [form] = LForm.useForm();

  const { runAsync } = useRequest<API.HttpResult, SysUrlGroupType[]>(apiCreateGroup, {
    manual: true,
    onSuccess: (result) => {
      if (result.success) {
        onChange();
      }
    },
  });

  useEffect(() => {
    if (open && data) {
      form.setFieldsValue(data);
    }
  }, [open]);

  return (
    <LModalForm
      open={open}
      form={form}
      width={700}
      labelCol={{ span: 7 }}
      wrapperCol={{ span: 14 }}
      title={data ? '修改信息' : '新建角色'}
      onFinish={async (values) => {
        const { success } = await runAsync({ ...data, ...values } as SysUrlGroupType);
        return success;
      }}
      modalProps={{
        afterClose: () => form.resetFields(),
        wrapClassName: 'modal_wrap_render',
      }}
      initialValues={{ state: 1 }}
      {...restProps}
    >
      <LFormItemInput name="groupName" required label="URL组名" />
      <LFormItemStaticRadio label="权限状态" required name="state" disabled propCode="status" />
      <LFormItemTextArea name="groupDesc" label="URL组备注" />
    </LModalForm>
  );
};

export default UrlGroupModel;
