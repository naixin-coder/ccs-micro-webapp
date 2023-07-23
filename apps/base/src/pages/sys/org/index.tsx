import { Space, FormInstance, message, Popconfirm } from 'antd';
import type { FC } from 'react';
import { useRef, useState, useEffect } from 'react';
import type { LTableInstance } from 'lighting-design';
import BasicModal from './Modal';
import type { ColumnsType } from 'antd/lib/table/interface';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { apiQueryOrgs, apiSaveOrg } from './service';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import type { SysOrgType } from './type';
import AuthButton from '@/components/common/AuthButton';
import PopSwitchState from '@/components/common/PopSwitchState';
import AuthTable from '@/components/common/AuthTable';
import { useRequest } from 'ahooks';
import PageCard from '@/components/common/PageCard';

export const updateTreeData = (
  list: SysOrgType[],
  key: React.Key,
  children: SysOrgType[],
): SysOrgType[] =>
  list.map((node) => {
    if (node.orgId === key)
      return {
        ...node,
        children,
      };

    if (node.children) {
      return {
        ...node,
        children: updateTreeData(node.children, key, children),
      };
    }

    return node;
  });

interface UserProps {}
const User: FC<UserProps> = () => {
  const formRef = useRef<FormInstance>();
  const tableRef = useRef<LTableInstance>();
  const [open, setOpen] = useState(false);
  const [treeList, setTreeList] = useState<SysOrgType[]>([]);
  const [parentOrgId, setparentOrgId] = useState(0);
  const [editableRecord, setEditablRecord] = useState<Record<string, any>>();

  const { runAsync } = useRequest<API.HttpResult, any>(apiSaveOrg, {
    manual: true,
    onSuccess(result) {
      if (result.success) {
        tableRef.current?.onSearch();
      }
    },
  });

  // // 删除
  // const { runAsync: runDelete } = useRequest<API.HttpResult, any[]>(apideleteLabel, {
  //   manual: true,
  // });

  const columns: ColumnsType<any> = [
    {
      title: '组织名称',
      align: 'center',
      dataIndex: 'orgName',
    },
    {
      title: '组织编码',
      align: 'center',
      dataIndex: 'orgCode',
    },
    {
      align: 'center',
      title: '组织说明',
      dataIndex: 'orgDesc',
      ellipsis: true,
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
            editAuth="sys:org:update"
            valueName={record.orgName}
            onConfirm={async () => {
              await runAsync({ ...record, state: state === 1 ? 0 : 1 });
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
              auth="sys:org:create"
              onClick={() => {
                setEditablRecord({ parentOrgId: record.orgId, state: 1 });
                setOpen(true);
              }}
            >
              新增下级
            </AuthButton>
            <AuthButton
              type="link"
              auth="sys:org:update"
              icon={<EditOutlined />}
              onClick={() => {
                setEditablRecord({ ...record });
                setOpen(true);
              }}
            >
              修改
            </AuthButton>
            {/* <Popconfirm
              placement="topRight"
              title="确认删除当前组织?"
              onConfirm={async () => {
                // const { success } = await runDelete({ labelIdList: [record.labelId] });
                // if (success) {
                //   message.success('操作成功');
                //   tableRef.current?.onReload();
                // }
              }}
              okText="确定"
              cancelText="取消"
            >
              <AuthButton type="link" danger icon={<DeleteOutlined />}>
                删除
              </AuthButton>
            </Popconfirm> */}
          </Space>
        );
      },
    },
  ];

  useEffect(() => {
    tableRef.current?.onReload();
  }, [parentOrgId]);

  return (
    <PageContainer>
      <PageCard>
        <AuthTable
          rowKey="orgId"
          auth="sys:org:list"
          scroll={{ x: 1200 }}
          toolbarLeft={
            <>
              <AuthButton
                auth="sys:org:create"
                type="primary"
                onClick={() => {
                  setEditablRecord(undefined);
                  setOpen(true);
                }}
              >
                新增
              </AuthButton>
            </>
          }
          tableRef={tableRef}
          formRef={formRef}
          columns={columns}
          pagination={false}
          request={async () => {
            const result = await apiQueryOrgs({
              query: { parentOrgId },
            });
            const { data, success } = result;
            data.forEach((e: { leaf: any; children: never[] }) => {
              if (!e.leaf) e.children = [];
            });
            let newList: SysOrgType[] = [];
            parentOrgId === 0 ? (newList = [...data]) : (newList = [...treeList]);
            const list = updateTreeData(newList, parentOrgId, data);
            setTreeList(list);
            return {
              total: 0,
              success,
              data: list,
            };
          }}
          onExpand={(onExpand, record) => {
            if (onExpand) setparentOrgId(record.orgId);
          }}
        />
        <BasicModal
          open={open}
          onOpenChange={setOpen}
          data={editableRecord}
          onChange={() => {
            tableRef.current?.onSearch();
          }}
        />
      </PageCard>
    </PageContainer>
  );
};

export default User;
