import LFormItemStaticRadio from '@/components/business/StaticRadio';
import { useRequest } from 'ahooks';
import {
  LForm,
  LFormItemInput,
  LFormItemNumber,
  LFormItemTextArea,
  LModalForm,
  LModalFormProps,
  LTableInstance,
  useShow,
  UseShowInstanceRef,
} from 'lighting-design';
import type { FC, MutableRefObject } from 'react';
import { useEffect, useState } from 'react';
import { apiSaveAppCreate } from '../service';

interface ButtonModelProps extends LModalFormProps {
  proRef: UseShowInstanceRef;
  tableRef?: MutableRefObject<LTableInstance | undefined>;
  onSuccess: (parentId: string) => void;
}

const MenuModel: FC<ButtonModelProps> = ({ proRef, tableRef, onSuccess, ...restProps }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [form] = LForm.useForm();
  const { parentData: record } = useShow(proRef, {
    onShow: () => setOpen(!open),
  });

  const { runAsync } = useRequest<API.HttpResult, any>(apiSaveAppCreate, {
    manual: true,
    onSuccess(result) {
      if (result.success) {
        onSuccess(record?.parentId);
      }
    },
  });

  useEffect(() => {
    if (record) {
      form.setFieldsValue({ ...record });
    }
  }, [record]);

  return (
    <LModalForm
      open={open}
      form={form}
      width={700}
      onOpenChange={setOpen}
      title={record?.btnId ? '修改信息' : '新建菜单'}
      onFinish={async (values) => {
        const { success } = await runAsync({ ...record, ...values, type: 1, code: '' });
        return success;
      }}
      labelCol={{ span: 5 }}
      wrapperCol={{ span: 17 }}
      modalProps={{
        afterClose: () => form.resetFields(),
        wrapClassName: 'modal_wrap_render',
      }}
      initialValues={{
        state: 1,
      }}
      {...restProps}
    >
      <LFormItemInput name="name" required label="菜单名称" />
      <LFormItemNumber
        name="sort"
        required
        label="显示排序"
        min={0}
        numberProps={{ precision: 0 }}
      />
      <LFormItemStaticRadio label="菜单状态" required name="state" propCode="status" />
      <LFormItemTextArea name="describe" label="菜单描述" />
    </LModalForm>
  );
};

export default MenuModel;
