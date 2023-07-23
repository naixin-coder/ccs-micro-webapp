import AuthButton from '@/components/common/AuthButton';
import AuthTable from '@/components/common/AuthTable';
import PageCard from '@/components/common/PageCard';
import PopSwitchState from '@/components/common/PopSwitchState';
import { EditOutlined, MenuUnfoldOutlined, PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { useRequest } from 'ahooks';
import { FormInstance, message, Space, Tag } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import type { LTableInstance } from 'lighting-design';
import { LFormItemInput } from 'lighting-design';
import type { FC } from 'react';
import { useRef, useState } from 'react';
import BasicModel from './component/S-BasicModel';
import MenuModel from './component/S-MenuModel';
import { apiQueryPageRole, apiSaveRole } from './service';
import { SysRoleType } from './type';

interface RoleProps {}
const Role: FC<RoleProps> = () => {
  const formRef = useRef<FormInstance>();
  const tableRef = useRef<LTableInstance>();
  const [open, setOpen] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [editableRecord, setEditablRecord] = useState<Record<string, any>>();
  const [menuRecord, setMenuRecord] = useState<Record<string, any>>();
  const [isApp, setIsApp] = useState<boolean>(false);
  const { runAsync: runSaveRole } = useRequest<API.HttpResult, SysRoleType[]>(apiSaveRole, {
    manual: true,
    onSuccess(result) {
      if (result.success) {
        tableRef.current?.onSearch();
        message.success('操作成功');
      }
    },
  });

  const columns: ColumnsType<SysRoleType> = [
    {
      title: '角色名称',
      dataIndex: 'roleName',
      align: 'center',
      render: (value) => <Tag>{value}</Tag>,
    },
    {
      title: '角色描述',
      dataIndex: 'roleDesc',
      align: 'center',
    },
    {
      title: '状态',
      dataIndex: 'state',
      align: 'center',
      render: (state, record) => {
        return (
          <PopSwitchState
            disabled={record.roleId === 9999}
            checked={state === 1}
            valueName={record.roleName}
            editAuth="sys:role:update"
            onConfirm={async () => {
              runSaveRole({ ...record, state: state === 1 ? 0 : 1 });
            }}
          />
        );
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      align: 'center',
    },
    {
      key: 'actions',
      title: '操作',
      width: 280,
      fixed: 'right',
      align: 'center',
      render: (_, record) => {
        return (
          <Space className="action_bar">
            <AuthButton
              icon={<EditOutlined />}
              auth="sys:role:update"
              type="link"
              onClick={() => {
                setEditablRecord({ ...record });
                setOpen(true);
              }}
            >
              修改
            </AuthButton>
            <AuthButton
              type="link"
              auth="sys:role:menu:tree"
              onClick={() => {
                setMenuRecord({ ...record });
                setVisible(true);
              }}
            >
              <Space size={4}>
                <MenuUnfoldOutlined />
                菜单权限
              </Space>
            </AuthButton>
            <AuthButton
              type="link"
              auth="sys:role:App:tree"
              onClick={() => {
                setMenuRecord({ ...record });
                setIsApp(true);
                setVisible(true);
              }}
            >
              <Space size={4}>
                <MenuUnfoldOutlined />
                APP权限
              </Space>
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
          isSort
          auth="sys:role:list"
          toolbarLeft={
            <>
              <AuthButton
                auth="sys:role:create"
                type="primary"
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
          formItems={[<LFormItemInput key="0" name="roleName" label="角色名称" />]}
          tableRef={tableRef}
          formRef={formRef}
          columns={columns}
          table={{
            rowKey: 'roleId',
            request: apiQueryPageRole,
          }}
        />
        <BasicModel
          open={open}
          onOpenChange={setOpen}
          data={editableRecord}
          onChange={() => {
            tableRef.current?.onReload();
          }}
        />
        <MenuModel
          open={visible}
          isApp={isApp}
          setIsApp={setIsApp}
          onOpenChange={setVisible}
          roleData={menuRecord}
          onChange={() => {
            tableRef.current?.onReload();
          }}
        />
      </PageCard>
    </PageContainer>
  );
};

export default Role;
