import AuthButton from '@/components/common/AuthButton';
import AuthTable from '@/components/common/AuthTable';
import { EditOutlined, NodeIndexOutlined } from '@ant-design/icons';
import type { FormInstance } from '@ant-design/pro-components';
import { Badge, Space, Tag } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import type { LTableInstance } from 'lighting-design';
import type { FC } from 'react';
import { useRef, useState } from 'react';
import { apiQueryPageUrlGroup } from '../service';
import type { SysUrlGroupType } from '../type';
import UrlGroupDrawer from './S-UrlGroupDrawer';
import UrlGroupModel from './S-UrlGroupModel';

const UrlGroup: FC = () => {
  const formRef = useRef<FormInstance>();
  const tableRef = useRef<LTableInstance>();
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [editableRecord, setEditablRecord] = useState<SysUrlGroupType>();

  const columns: ColumnsType<SysUrlGroupType> = [
    {
      title: 'URL组名',
      dataIndex: 'groupName',
      align: 'center',
    },
    {
      title: '组说明',
      dataIndex: 'groupDesc',
      align: 'center',
    },
    {
      title: '状态',
      dataIndex: 'state',
      align: 'center',
      render: (state) => {
        return state === 1 ? <Badge status="success" text="启用" /> : <Badge text="禁用" />;
      },
    },
    {
      key: 'actions',
      title: '操作',
      align: 'center',
      fixed: 'right',
      width: 200,
      render: (_, record) => {
        return (
          <Space className="action_bar">
            <AuthButton
              type="link"
              icon={<EditOutlined />}
              auth="sys:url:group:update"
              onClick={() => {
                setEditablRecord({ ...record });
                setOpen(true);
              }}
            >
              修改
            </AuthButton>
            <AuthButton
              auth="sys:url:group:connect:list"
              type="link"
              icon={<NodeIndexOutlined />}
              onClick={async () => {
                setEditablRecord({ ...record });
                setVisible(true);
              }}
            >
              关联URl
            </AuthButton>
          </Space>
        );
      },
    },
  ];
  return (
    <>
      <AuthTable
        rowKey="groupId"
        auth="sys:url:group:list"
        scroll={{ x: 1200 }}
        tableRef={tableRef}
        formRef={formRef}
        columns={columns}
        pagination={false}
        bordered
        showToolbar={false}
        size="small"
        table={{
          request: apiQueryPageUrlGroup,
        }}
      />
      <UrlGroupModel
        open={open}
        onOpenChange={setOpen}
        data={editableRecord}
        onChange={() => {
          tableRef.current?.onReload();
        }}
      />
      <UrlGroupDrawer
        open={visible}
        onOpenChange={setVisible}
        record={editableRecord}
        onReload={() => {
          tableRef.current?.onReload();
        }}
      />
    </>
  );
};

export default UrlGroup;
