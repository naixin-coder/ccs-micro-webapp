import { Avatar, FormInstance, Tag } from 'antd';
import { Space } from 'antd';
import type { FC } from 'react';
import { useRef, useState } from 'react';
import type { ColumnsType } from 'antd/lib/table';
import { LTableInstance } from 'lighting-design';
import { LFormItemInput } from 'lighting-design';
import { PageContainer, useToken } from '@ant-design/pro-components';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { apiQueryWorker, apiSaveUser } from './service';
import AuthButton from '@/components/common/AuthButton';
import AuthTable from '@/components/common/AuthTable';
import PopSwitchState from '@/components/common/PopSwitchState';
import { SysUserType } from './type';
import { useRequest } from 'ahooks';
import BasicModal from './Modal';
import LFormItemStaticSelect from '@/components/business/StaticSelect';
import PageCard from '@/components/common/PageCard';

const formItems = [
  // <LFormItemInput key="0" name="loginCode" label="账号" />,
  <LFormItemInput key="1" name="workerName" label="用户名" />,
  <LFormItemInput key="2" name="mobile" label="手机号码" />,
  <LFormItemStaticSelect key="3" name="state" label="状态" propCode="status" />,
];

const User: FC = () => {
  const formRef = useRef<FormInstance>();
  const tableRef = useRef<LTableInstance>();
  const { token } = useToken();
  const [open, setOpen] = useState(false);
  const [editableRecord, setEditablRecord] = useState<Record<string, any>>();
  const { runAsync } = useRequest<API.HttpResult, any[]>(apiSaveUser, {
    manual: true,
    onSuccess(result) {
      if (result.success) {
        tableRef.current?.onSearch();
      }
    },
  });

  const columns: ColumnsType<SysUserType> = [
    {
      title: '头像',
      dataIndex: 'workerName',
      align: 'center',
      render: (value) => {
        return <Avatar style={{ backgroundColor: token.colorPrimary }}>{value[0]}</Avatar>;
      },
    },
    {
      title: '用户名',
      dataIndex: 'workerName',
      align: 'center',
    },
    // {
    //   title: '账号',
    //   dataIndex: 'loginCode',
    //   align: 'center',
    // },
    { title: '所属组织', dataIndex: 'orgName', align: 'center' },
    {
      title: '手机号',
      dataIndex: 'mobile',
      align: 'center',
    },
    {
      title: '来源',
      dataIndex: 'source',
      align: 'center',
      render: (value: SysUserType['source'], record) => {
        if (value === '1') return <Tag color="blue">{record.sourceTrans}</Tag>;
        return <Tag color="green">{record.sourceTrans}</Tag>;
      },
    },
    {
      title: '关联角色',
      dataIndex: 'roles',
      align: 'center',
      width: 200,
      render: (value: SysUserType['roles']) => {
        return value.map((item) => {
          return (
            <Tag style={{ marginBottom: 2 }} key={item.roleId}>
              {item.roleName}
            </Tag>
          );
        });
      },
    },
    {
      title: '状态',
      dataIndex: 'state',
      key: 'state',
      align: 'center',
      render: (state, record) => {
        return (
          <PopSwitchState
            checked={state === 1}
            valueName={record.workerName}
            editAuth="sys:user:update"
            onConfirm={async () => {
              runAsync({
                ...record,
                roleIds: record.roles.map((item) => item.roleId),
                state: state === 1 ? 0 : 1,
              });
            }}
          />
        );
      },
    },
    {
      key: 'actions',
      title: '操作',
      align: 'center',
      fixed: 'right',
      width: 150,
      render: (_, record) => {
        return (
          <Space className="action_bar">
            <AuthButton
              type="link"
              auth="sys:user:update"
              icon={<EditOutlined />}
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

  return (
    <PageContainer>
      <PageCard>
        <AuthTable
          auth="sys:user:list"
          rowKey="loginId"
          scroll={{ x: 1200 }}
          toolbarLeft={
            <>
              <AuthButton
                type="primary"
                auth="sys:user:create"
                onClick={() => {
                  setEditablRecord(undefined);
                  setOpen(true);
                }}
                icon={<PlusOutlined />}
              >
                新增
              </AuthButton>
            </>
          }
          size="small"
          formItems={formItems}
          tableRef={tableRef}
          formRef={formRef}
          columns={columns}
          table={{
            request: apiQueryWorker,
          }}
        />
      </PageCard>
      <BasicModal
        open={open}
        onOpenChange={setOpen}
        data={editableRecord}
        onChange={() => {
          tableRef.current?.onReload();
        }}
      />
    </PageContainer>
  );
};

export default User;
