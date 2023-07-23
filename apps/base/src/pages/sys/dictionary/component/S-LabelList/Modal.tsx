import LFormItemStaticRadio from '@/components/business/StaticRadio';
import { useRequest } from 'ahooks';
import { message } from 'antd';
import {
  LForm,
  LFormItemInput,
  LFormItemTextArea,
  LModalForm,
  LModalFormProps,
} from 'lighting-design';
import type { FC } from 'react';
import { useEffect } from 'react';
import { apiCreate } from '../../service';
import { SysPropType } from '../../type';

interface BasicModalProps extends LModalFormProps {
  data: any;
  onChange: () => void;
  open: boolean;
}
const LabelModal: FC<BasicModalProps> = ({ data, onChange, open, ...restProps }) => {
  const [form] = LForm.useForm();

  const { runAsync: runCreate } = useRequest<API.HttpResult, SysPropType[]>(apiCreate, {
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
      title={`${data ? '修改' : '新增'}静态值`}
      onFinish={async (values) => {
        const { success } = await runCreate({ ...data, ...values } as SysPropType);
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
      <LFormItemInput
        name="propName"
        required
        label="属性名称"
        tooltip="路由名称 - 属性名称"
        placeholder="例：用户管理-用户来源"
        rules={[
          { required: true, message: '请输入属性名称' },
          { message: '属性名称格式错误', pattern: RegExp(/-/) },
        ]}
      />
      <LFormItemInput name="propCode" required label="属性编码" />
      <LFormItemStaticRadio label="状态" name="state" propCode="status" />
      <LFormItemTextArea label="备注" disabledWhiteSpace={false} name="propDesc" />
    </LModalForm>
  );
};

export default LabelModal;
