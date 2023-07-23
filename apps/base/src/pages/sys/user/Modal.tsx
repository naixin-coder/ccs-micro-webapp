import OrgSelectTree from '@/components/business/OrgSelectTree';
import LFormItemStaticRadio from '@/components/business/StaticRadio';
import UserSelectTable from '@/components/business/UserSelectTable';
import OrgTreeDrawer from '@/components/common/OrgTreeDrawer';
import { useRequest } from 'ahooks';
import { Row, Col, message, Tag } from 'antd';
import {
  LFormItem,
  LFormItemDatePicker,
  LFormItemSelect,
  LModalFormProps,
  LTrigger,
  UseShowInstance,
} from 'lighting-design';
import { LForm, LFormItemInput, LModalForm } from 'lighting-design';
import { FC, useRef, useState } from 'react';
import { useEffect } from 'react';
import { apiSaveUser } from './service';

interface BasicModalProps extends LModalFormProps {
  data: any;
  onChange: () => void;
  open: boolean;
}
const BasicModal: FC<BasicModalProps> = ({ data, onChange, open, onOpenChange, ...restProps }) => {
  const [form] = LForm.useForm();
  const [options, setOptions] = useState<{ label: string; value: string }[]>([]);
  const orgRef = useRef<UseShowInstance>();
  const { runAsync: runSaveUser } = useRequest<API.HttpResult, any[]>(apiSaveUser, {
    manual: true,
    onSuccess(data) {
      if (data.success) {
        message.success('操作成功！');
        onChange();
      }
    },
  });

  useEffect(() => {
    if (open && data) {
      if (data.roles) {
        const label: string[] = [];
        const value: string[] = [];
        data.roles.forEach((item: { roleId: string; roleName: string }) => {
          value.push(item.roleId);
          label.push(item.roleName);
        });
        setOptions([
          {
            label: data.orgName,
            value: data.orgId,
          },
        ]);
        form.setFieldsValue({
          ...data,
          role: { label, value },
          orgId: data.orgId,
        });
      } else {
        form.setFieldsValue({
          ...data,
        });
      }
    }
  }, [open]);

  return (
    <LModalForm
      open={open}
      onOpenChange={onOpenChange}
      form={form}
      width={960}
      isDraggable
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 14 }}
      title={data ? '修改信息' : '新建用户'}
      onFinish={async (values) => {
        const roleIds: string[] = values.role?.value || [];
        const { success } = await runSaveUser({
          ...data,
          ...values,
          roleIds,
        });
        return success;
      }}
      modalProps={{
        afterClose: () => {
          form.resetFields();
          orgRef.current?.onHide();
        },
        wrapClassName: 'ia_modal_render',
      }}
      initialValues={{ state: 1 }}
      {...restProps}
    >
      <Row>
        <Col span={12}>
          <LFormItemInput name="workerName" required label="用户名" />
        </Col>
        <Col span={12}>
          <LFormItemInput name="loginCode" required label="账号" />
        </Col>
        <Col span={12}>
          <LFormItemInput name="mobile" required type="phone" label="手机号" />
        </Col>
        <Col span={12}>
          <LFormItemSelect
            key="4"
            name="orgId"
            required
            label="用户组织"
            options={options}
            selectProps={{
              open: false,
              showArrow: false,
              onClick: () => {
                const orgId = form.getFieldValue('orgId');
                orgRef.current?.onShow({ value: orgId });
              },
              onClear() {
                setOptions([]);
              },
            }}
          />
        </Col>
        <Col span={12}>
          <LFormItemInput label="邮箱" name="email" type="email" required />
        </Col>
        <Col span={12}>
          <LFormItemDatePicker label="出生日期" name="birthday" disabledDateAfter={0} />
        </Col>
        <Col span={12}>
          <LFormItemSelect
            label="性别"
            name="sex"
            required
            options={[
              {
                label: '男',
                value: 1,
              },
              {
                label: '女',
                value: 0,
              },
            ]}
          />
        </Col>
        <Col span={12}>
          <LFormItemStaticRadio label="状态" required name="state" propCode="status" />
        </Col>
        <Col span={24}>
          <LFormItem
            name="role"
            labelCol={{ span: 3 }}
            wrapperCol={{ span: 19 }}
            label="所属角色"
            placeholder="请选择所属角色，可多选"
          >
            <LTrigger
              allowClear
              mode="tag"
              placement="bottomLeft"
              style={{ width: '100%' }}
              tagRender={(props) => <Tag>{props.value}</Tag>}
              selectProps={{
                filterOption: false,
                onInputKeyDown: (e) => e.stopPropagation(),
              }}
            >
              <UserSelectTable />
            </LTrigger>
          </LFormItem>
        </Col>
      </Row>
      <OrgTreeDrawer
        proRef={orgRef}
        onChange={(options) => {
          setOptions([options]);
          form.setFieldValue('orgId', options.value);
          form.validateFields(['orgId']);
        }}
      />
    </LModalForm>
  );
};

export default BasicModal;
