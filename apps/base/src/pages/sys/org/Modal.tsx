import LFormItemStaticRadio from '@/components/business/StaticRadio';
import { useRequest } from 'ahooks';
import { Row, Col, message } from 'antd';
import {
  LFormItemRadio,
  LFormItemTextArea,
  LForm,
  LFormItemInput,
  LModalForm,
  LModalFormProps,
  LFormItemNumber,
} from 'lighting-design';
import type { FC } from 'react';
import { useEffect } from 'react';
import { apiSaveOrg, apiValidateOrg } from './service';
import type { SysOrgType, SysOrgTypePartial } from './type';

interface BasicModalProps extends LModalFormProps {
  data: any;
  onChange: () => void;
  open: boolean;
}

const onFormat = (nodes: any[]): SysOrgType[] => {
  nodes.forEach((res) => {
    res.key = res.orgId;
    res.title = res.orgName;
    if (res.children) {
      onFormat(res.children);
    }
  });
  return nodes;
};

const BasicModal: FC<BasicModalProps> = ({ data, onChange, open, onOpenChange, ...restProps }) => {
  const [form] = LForm.useForm();

  // 组织保存
  const { runAsync } = useRequest<API.HttpResult, any>(apiSaveOrg, { manual: true });

  // 组织编码校验
  const { runAsync: runValdate } = useRequest<API.HttpResult, any>(apiValidateOrg, {
    manual: true,
  });

  // 提交
  const onSubmit = async (values: SysOrgTypePartial) => {
    if (values.orgCode !== data?.orgCode) {
      const result = await runValdate({ orgCode: values.orgCode });
      if (result.success && result.data) {
        message.error('组织编码已存在、请修改');
        return true;
      }
    }
    const result = await runAsync({ ...data, ...values });
    if (result.success) {
      message.success('操作成功');
      onChange();
      return result.success;
    }
  };

  useEffect(() => {
    if (open && data) {
      form.setFieldsValue({
        ...data,
        orgId: {
          label: data.orgName,
          value: data.orgId,
        },
      });
    }
  }, [open]);

  return (
    <LModalForm
      open={open}
      onOpenChange={onOpenChange}
      form={form}
      width={800}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 16 }}
      title={data ? '修改信息' : '新建组织'}
      onFinish={onSubmit}
      modalProps={{
        afterClose: () => form.resetFields(),
        wrapClassName: 'modal_wrap_render',
      }}
      initialValues={{
        state: 1,
      }}
      {...restProps}
    >
      <Row>
        <Col span={12}>
          <LFormItemNumber
            name="sortId"
            required
            label="序号"
            min={0}
            numberProps={{ precision: 0 }}
          />
        </Col>
        <Col span={12}>
          <LFormItemInput name="orgCode" required label="组织编码" />
        </Col>
        <Col span={12}>
          <LFormItemInput name="orgName" required label="组织名称" />
        </Col>
        <Col span={12}>
          <LFormItemStaticRadio label="状态" required name="state" propCode="status" />
        </Col>
        <Col span={24}>
          <LFormItemTextArea
            labelCol={{ span: 3 }}
            wrapperCol={{ span: 20 }}
            name="orgDesc"
            label="组织描述"
          />
        </Col>
      </Row>
    </LModalForm>
  );
};

export default BasicModal;
