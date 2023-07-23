import AuthButton from '@/components/common/AuthButton';
import AuthTable from '@/components/common/AuthTable';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import type { FormInstance } from '@ant-design/pro-components';
import { Badge, Space, Tag, Typography } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import type { LTableInstance } from 'lighting-design';
import { LFormItemInput } from 'lighting-design';
import type { FC } from 'react';
import { useRef, useState } from 'react';
import { apiQueryPageUrl } from '../service';
import type { SysUrlType } from '../type';
import UrlCreateModel from './S-UrlCreateModel';
const { Paragraph } = Typography;

const UrlCreate: FC = () => {
  const formRef = useRef<FormInstance>();
  const tableRef = useRef<LTableInstance>();
  const [open, setOpen] = useState(false);
  const [editableRecord, setEditablRecord] = useState<SysUrlType>();

  const columns: ColumnsType<SysUrlType> = [
    {
      title: 'URL名',
      dataIndex: 'urlName',
    },
    {
      title: 'URL地址',
      dataIndex: 'urlPath',
      render(value) {
        return (
          <Paragraph copyable style={{ marginBottom: 0 }}>
            {value}
          </Paragraph>
        );
      },
    },
    {
      title: 'URL类型',
      dataIndex: 'requestType',
      align: 'center',
      render(val: number) {
        return val === 0 ? <Tag color="success">GET</Tag> : <Tag color="orange">POST</Tag>;
      },
    },
    {
      title: '状态',
      dataIndex: 'state',
      align: 'center',
      render: (state) => {
        return state === 1 ? <Badge status="success" text="启用" /> : <Badge text="禁用" />;
      },
    },
    // {
    //   align: 'center',
    //   title: '日志记录',
    //   dataIndex: 'logFlag',
    //   render(val: number) {
    //     return val === 1 ? '是' : '否';
    //   },
    // },
    {
      title: 'URL说明',
      dataIndex: 'urlDesc',
      width: 200,
    },
    {
      key: 'actions',
      title: '操作',
      align: 'center',
      fixed: 'right',
      render: (_, record) => {
        return (
          <Space className="action_bar">
            <AuthButton
              type="link"
              icon={<EditOutlined />}
              auth="sys:url:update"
              onClick={() => {
                setEditablRecord({ ...record });
                setOpen(true);
              }}
            >
              修改
            </AuthButton>
          </Space>
        );
      },
    },
  ];

  const formItems = [
    <LFormItemInput key="1" name="urlName" label="URL名称" />,
    <LFormItemInput key="2" name="urlPath" label="URL地址" />,
  ];

  return (
    <>
      <AuthTable
        rowKey="urlId"
        auth="sys:url:list"
        scroll={{ x: 1200 }}
        tableRef={tableRef}
        formRef={formRef}
        columns={columns}
        formItems={formItems}
        size="small"
        toolbarLeft={
          <>
            <AuthButton
              auth="sys:url:create"
              type="primary"
              onClick={() => {
                setEditablRecord(undefined);
                setOpen(true);
              }}
              icon={<PlusOutlined />}
            >
              新增URL
            </AuthButton>
          </>
        }
        table={{
          request: apiQueryPageUrl,
        }}
      />
      <UrlCreateModel
        open={open}
        onOpenChange={setOpen}
        data={editableRecord}
        onChange={() => {
          tableRef.current?.onReload();
        }}
      />
    </>
  );
};

export default UrlCreate;
