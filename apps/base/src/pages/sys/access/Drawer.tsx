import LFormItemAutoUpload from '@/components/common/AutoUpload';
import { useRequest } from 'ahooks';
import { message } from 'antd';
import {
  LDrawerForm,
  LForm,
  LFormItemInput,
  LFormItemNumber,
  LFormItemRadio,
  LFormItemTextArea,
} from 'lighting-design';
import { FC, useEffect, useState } from 'react';
import { apiCreate, apiUpdate } from './service';

interface Props {
  open: boolean;
  onOpenChange: any;
  record: any;
  isEdit: boolean;
  onChange: any;
}

const Drawer: FC<Props> = ({ open, onOpenChange, record, isEdit, onChange }) => {
  const [form1] = LForm.useForm();
  const [webCarousel, setWebCarousel] = useState<API.UploadFile>();

  /**新建 */
  const { runAsync: runCreate } = useRequest<API.HttpResult, any[]>(apiCreate, {
    manual: true,
  });

  /**修改 */
  const { runAsync: runUpdate } = useRequest<API.HttpResult, any[]>(apiUpdate, {
    manual: true,
  });

  useEffect(() => {
    if (open && record && isEdit) {
      form1.setFieldsValue({
        ...record,
        logoUrl: [
          {
            url: record.logoUrl,
            name: '',
          },
        ],
      });
    }
  }, [record]);
  const onFinish = async (values: any) => {
    if (!record) {
      const fileObj = {
        ...values,
        logoUrl: webCarousel?.fileKey,
        sort: Number(values.sort),
      };
      const res = await runCreate({ ...fileObj });
      if (res.success) {
        message.success('新建成功');
        onChange();
        return true;
      }
    } else {
      const res = await runUpdate({ ...values, logoUrl: record.logoUrl, appId: record.appId });
      if (res.success) {
        message.success('修改成功');
        onChange();
        return true;
      }
    }
  };
  return (
    <div>
      <LDrawerForm
        open={open}
        onOpenChange={onOpenChange}
        drawerProps={{ height: '100vh' }}
        form={form1}
        layout="vertical"
        title={record ? '修改接入' : '新建接入'}
        placement="right"
        onFinish={onFinish}
        initialValues={{
          state: 1,
        }}
      >
        <LFormItemInput name="appCode" required label="app编码" />
        <LFormItemInput name="systemName" required label="系统名称" />
        <LFormItemInput name="sponsor" required label="主管单位" />
        <LFormItemAutoUpload
          required
          onDoneChange={({ response }) => {
            if (response?.success) {
              setWebCarousel(response.data);
            } else {
              message.error(response?.msg);
            }
          }}
          name="logoUrl"
          label="功能图标"
          uploadType="avatar"
        />
        <LFormItemInput name="appName" required label="功能名称" />
        <LFormItemInput name="appUrl" required label="地址" />
        <LFormItemNumber
          name="sort"
          tooltip="根据序号升序排列"
          required
          label="排序"
          min={1}
          numberProps={{ precision: 0 }}
        />
        <LFormItemInput name="publicKey" label="公钥（非必填）" />
        <LFormItemInput name="privateKey" label="私钥（非必填）" />
        <LFormItemRadio
          label="是否16进制"
          name="mustHex"
          required
          options={[
            { label: '是', value: 1 },
            { label: '否', value: 0 },
          ]}
        />
        <LFormItemRadio
          label="是否强制认证"
          name="mustAuth"
          required
          options={[
            { label: '是', value: 1 },
            { label: '否', value: 0 },
          ]}
        />
        <LFormItemRadio
          label="状态"
          name="state"
          required
          options={[
            { label: '启用', value: 1 },
            { label: '禁用', value: 0 },
          ]}
        />
        <LFormItemTextArea name="notes" required label="备注" />
      </LDrawerForm>
    </div>
  );
};

export default Drawer;
