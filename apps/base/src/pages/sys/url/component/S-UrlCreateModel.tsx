import LFormItemStaticRadio from '@/components/business/StaticRadio';
import { useRequest } from 'ahooks';
import { Col, Row } from 'antd';
import {
  LForm,
  LFormItemInput,
  LFormItemSegmented,
  LFormItemSelect,
  LFormItemTextArea,
  LModalForm,
  LModalFormProps,
} from 'lighting-design';
import type { FC } from 'react';
import { useEffect } from 'react';
import { apiCreateUrl } from '../service';
import { SysUrlType } from '../type';

interface BasicModalProps extends LModalFormProps {
  data: any;
  onChange: () => void;
  open: boolean;
}
const UrlCreateModel: FC<BasicModalProps> = ({ data, onChange, open, ...restProps }) => {
  const [form] = LForm.useForm();

  const { runAsync } = useRequest<API.HttpResult, SysUrlType[]>(apiCreateUrl, {
    manual: true,
    onSuccess: (result) => {
      if (result.success) {
        onChange(); // 响应成功后，刷新表格
      }
    },
  });

  useEffect(() => {
    if (open && data) {
      form.setFieldsValue({
        ...data,
        requestType: `${data.requestType}`,
      });
    }
  }, [open]);

  return (
    <LModalForm
      isDraggable
      open={open}
      form={form}
      width={800}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 16 }}
      title={data ? '修改信息' : '新建URL'}
      onFinish={async (values) => {
        const { success } = await runAsync({ ...data, ...values } as SysUrlType);
        return success;
      }}
      modalProps={{
        afterClose: () => form.resetFields(),
        wrapClassName: 'modal_wrap_render',
      }}
      initialValues={{ state: 1, urlType: 1, requestType: 0 }}
      {...restProps}
    >
      <Row>
        <Col span={12}>
          <LFormItemInput
            name="urlName"
            required
            label="URL名称"
            tooltip="路由名称 - URL功能名"
            placeholder="例：菜单管理-新增菜单"
            rules={[
              { required: true, message: '请输入URL名称' },
              { message: 'URL名称格式错误', pattern: RegExp(/-/) },
            ]}
          />
        </Col>
        <Col span={12}>
          <LFormItemSelect
            name="urlType"
            required
            label="URL类型"
            options={[
              {
                label: '普通url',
                value: 1,
              },
            ]}
          />
        </Col>
        {/* <Col span={12}>
          <LFormItemSelect
            name="logFlag"
            required
            label="记录日志"
            initialValue={0}
            options={[
              {
                label: '是',
                value: 1,
              },
              {
                label: '否',
                value: 0,
              },
            ]}
          />
        </Col> */}
        <Col span={12}>
          <LFormItemStaticRadio label="权限状态" required name="state" propCode="status" />
        </Col>
        <Col span={12}>
          <LFormItemSegmented
            name="requestType"
            label="接口方法"
            required
            options={[
              {
                label: 'get',
                value: '0',
              },
              {
                label: 'post',
                value: '1',
              },
              {
                label: 'put',
                value: '2',
              },
              {
                label: 'patch',
                value: '3',
              },
              {
                label: 'delete',
                value: '4',
              },
            ]}
          />
        </Col>
        <Col span={24}>
          <LFormItemInput
            labelCol={{ span: 3 }}
            wrapperCol={{ span: 20 }}
            required
            name="urlPath"
            label="URL地址"
          />
        </Col>
        <Col span={24}>
          <LFormItemTextArea
            labelCol={{ span: 3 }}
            wrapperCol={{ span: 20 }}
            name="urlDesc"
            label="URL说明"
          />
        </Col>
      </Row>
    </LModalForm>
  );
};

export default UrlCreateModel;
