import LFormItemStaticRadio from '@/components/business/StaticRadio';
import { useRequest } from 'ahooks';
import { Col, Row } from 'antd';
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
import { FC, MutableRefObject, useEffect, useState } from 'react';
import { apiSaveAppCreate } from '../service';

interface ButtonModelProps extends LModalFormProps {
  proRef: UseShowInstanceRef;
  tableRef?: MutableRefObject<LTableInstance | undefined>;
  onSuccess: (parentId: string) => void;
}

const ButtonModel: FC<ButtonModelProps> = ({ proRef, tableRef, onSuccess, ...restProps }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [form] = LForm.useForm();

  const { parentData: record } = useShow(proRef, {
    onShow: () => setOpen(!open),
  });
  const { runAsync } = useRequest<API.HttpResult, any>(apiSaveAppCreate, {
    manual: true,
    onSuccess(result) {
      if (result.success) {
        onSuccess(record?.parentId || '-1');
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
      title={record?.btnId ? '修改信息' : '新增按钮'}
      onFinish={async (values) => {
        const { success } = await runAsync({ ...record, ...values });
        return success;
      }}
      modalProps={{
        afterClose: () => form.resetFields(),
        wrapClassName: 'modal_wrap_render',
      }}
      initialValues={{
        state: 1,
      }}
      layout="vertical"
      onOpenChange={setOpen}
      {...restProps}
    >
      <Row>
        <Col span={10}>
          <LFormItemInput name="name" required label="按钮名称" />
        </Col>
        <Col span={10} offset={2}>
          <LFormItemInput
            name="code"
            label="按钮标识"
            rules={[
              { required: true, message: '请输入按钮标识' },
              { message: '按钮标识格式错误', pattern: RegExp(/:/) },
            ]}
          />
        </Col>
        <Col span={10}>
          <LFormItemNumber
            name="sort"
            required
            label="显示排序"
            min={0}
            numberProps={{ precision: 0 }}
          />
        </Col>
        <Col span={10} offset={2}>
          <LFormItemStaticRadio label="按钮状态" required name="state" propCode="status" />
        </Col>
        <Col span={24}>
          <LFormItemTextArea name="describe" label="按钮描述" />
        </Col>
      </Row>
    </LModalForm>
  );
};

export default ButtonModel;
