import LFormItemStaticRadio from '@/components/business/StaticRadio';
import { useRequest } from 'ahooks';
import { message } from 'antd';
import { LFormItemNumber, LModalFormProps } from 'lighting-design';
import {
  LForm,
  LFormItemInput,
  LFormItemRadio,
  LFormItemTextArea,
  LModalForm,
} from 'lighting-design';
import { FC, useContext } from 'react';
import { useEffect } from 'react';
import { DicContext } from '../..';
import { apiCreateValue } from '../../service';
import { SysPropValueType } from '../../type';

interface ValueModalProps extends LModalFormProps {
  data: any;
  onChange: () => void;
  open: boolean;
}
const ValueModal: FC<ValueModalProps> = ({ data, onChange, open, ...restProps }) => {
  const [form] = LForm.useForm();
  const { record } = useContext(DicContext);
  const { runAsync: runCreateValue } = useRequest<API.HttpResult, SysPropValueType[]>(
    apiCreateValue,
    {
      manual: true,
      onSuccess(result) {
        if (result.success) {
          onChange(); // 响应成功后，刷新表格
          message.success('操作成功');
        }
      },
    },
  );

  useEffect(() => {
    if (open && data) {
      form.setFieldsValue(data);
    }
  }, [open]);

  return (
    <LModalForm
      isDraggable
      isEnterSubmit={false}
      open={open}
      form={form}
      labelCol={{ span: 5 }}
      wrapperCol={{ span: 18 }}
      title={`${data ? '修改' : '新增'}属性值`}
      onFinish={async (values) => {
        const { success } = await runCreateValue({
          ...record,
          ...data,
          ...values,
        } as SysPropValueType);
        return success;
      }}
      modalProps={{
        afterClose: () => form.resetFields(),
        wrapClassName: 'modal_wrap_render',
      }}
      initialValues={{
        state: 1,
      }}
      {...restProps}
    >
      <LFormItemInput name="valueName" required label="属性值名称" />
      <LFormItemInput name="valueCode" required label="属性值" />
      <LFormItemNumber
        name="sortId"
        required
        label="显示排序"
        min={0}
        numberProps={{ precision: 0 }}
      />
      <LFormItemStaticRadio label="状态" name="state" propCode="status" />
      <LFormItemTextArea label="属性值描述" name="valueDesc" />
    </LModalForm>
  );
};

export default ValueModal;
