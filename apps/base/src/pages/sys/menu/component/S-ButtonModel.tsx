import LFormItemStaticRadio from '@/components/business/StaticRadio';
import { useRequest } from 'ahooks';
import { Col, Row } from 'antd';
import {
  LFormItemRadio,
  LFormItemTextArea,
  LDrawerForm,
  LForm,
  LFormItem,
  LTrigger,
  LFormItemInput,
  useShow,
  LModalFormProps,
  LTableInstance,
  UseShowInstanceRef,
  LFormItemNumber,
} from 'lighting-design';
import type { FC, MutableRefObject } from 'react';
import { useEffect, useState } from 'react';
import { apiSaveMenu } from '../service';
import UrlSelect from './S-UrlSelect';

interface ButtonModelProps extends LModalFormProps {
  proRef: UseShowInstanceRef;
  tableRef?: MutableRefObject<LTableInstance | undefined>;
  onSuccess: (parentMenuCode: string) => void;
}

const ButtonModel: FC<ButtonModelProps> = ({ proRef, tableRef, onSuccess, ...restProps }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [form] = LForm.useForm();

  const { parentData: record } = useShow(proRef, {
    onShow: () => setOpen(!open),
  });

  const { runAsync } = useRequest<API.HttpResult, any>(apiSaveMenu, {
    manual: true,
    onSuccess(result) {
      if (result.success) {
        onSuccess(record?.parentMenuCode || '1');
      }
    },
  });

  useEffect(() => {
    if (record) {
      form.setFieldsValue({
        ...record,
        urlPath: {
          label: record.urlName,
          value: record.buttonUrlId,
        },
      });
    }
  }, [record]);

  return (
    <LDrawerForm
      open={open}
      form={form}
      width={700}
      title={record ? '修改信息' : '新建菜单'}
      onFinish={async (values) => {
        if (values.urlPath?.value) {
          values.buttonUrlId = values.urlPath.value;
        }
        const { success } = await runAsync({ ...record, ...values });
        return success;
      }}
      drawerProps={{
        afterOpenChange: () => form.resetFields(),
      }}
      onOpenChange={setOpen}
      layout="vertical"
      initialValues={{ state: 1 }}
      {...restProps}
    >
      <Row>
        <Col span={10}>
          <LFormItemInput
            name="menuName"
            required
            tooltip="菜单位置显示的说明信息"
            label="按钮名称"
          />
        </Col>
        <Col span={12} offset={2}>
          <LFormItemNumber
            name="sortId"
            tooltip="根据序号升序排列"
            required
            label="显示排序"
            min={0}
            numberProps={{ precision: 0 }}
          />
        </Col>
        <Col span={12}>
          <LFormItemRadio
            label="菜单类型"
            name="menuType"
            required
            options={[
              {
                label: '目录',
                value: 0,
                disabled: true,
              },
              {
                label: '菜单',
                value: 1,
                disabled: true,
              },
              {
                label: '按钮 / URL',
                value: 2,
              },
            ]}
          />
        </Col>
        <Col span={12}>
          <LFormItemStaticRadio label="按钮状态" required name="state" propCode="status" />
        </Col>
      </Row>

      <LFormItemInput name="menuUrl" tooltip="前端权限控制按钮是否显示" label="按钮标识" />
      <LFormItem
        tooltip="配置所需要使用到的URL权限，否则在设置用户角色时，接口将无权访问。"
        name="urlPath"
        label="路由地址"
        style={{ width: '100%' }}
      >
        <LTrigger dropdownWidth={600} style={{ width: '100%' }} placeholder="请选择路由地址">
          <UrlSelect />
        </LTrigger>
      </LFormItem>
      <LFormItemTextArea name="menuDesc" label="按钮描述" />
    </LDrawerForm>
  );
};

export default ButtonModel;
