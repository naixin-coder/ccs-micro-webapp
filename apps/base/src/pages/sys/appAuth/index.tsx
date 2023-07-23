import AuthButton from '@/components/common/AuthButton';
import AuthTable from '@/components/common/AuthTable';
import PageCard from '@/components/common/PageCard';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { useRequest } from 'ahooks';
import { Badge, FormInstance, Space, Tag } from 'antd';
import type { ColumnsType } from 'antd/lib/table/interface';
import type { LTableInstance, UseShowInstance } from 'lighting-design';
import { FC, useRef, useState } from 'react';
import ButtonModel from './component/S-ButtonModel';
import MenuModel from './component/S-MenuModel';
import { apicAppControllerQuery } from './service';
import type { AppAuthMenuType } from './type';

export const updateMenuTreeData = (
  list: AppAuthMenuType[],
  key: React.Key,
  children: AppAuthMenuType[],
): AppAuthMenuType[] =>
  list.map((node) => {
    if (node.btnId === key) {
      return {
        ...node,
        children,
      };
    }
    if (node.children) {
      return {
        ...node,
        children: updateMenuTreeData(node.children, key, children),
      };
    }
    return node;
  });

const Menu: FC = () => {
  const formRef = useRef<FormInstance>();
  const tableRef = useRef<LTableInstance>();
  const [loadings, setLoadings] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState<AppAuthMenuType[]>([]);
  const [expandedRowKeys, setExpandedRowKeys] = useState<React.Key[]>([]);
  const buttonRef = useRef<UseShowInstance>();
  const menuRef = useRef<UseShowInstance>();

  const columns: ColumnsType<AppAuthMenuType> = [
    {
      title: '菜单名称',
      dataIndex: 'name',
      render: (_, record) => {
        if (record.type === 1) {
          // return <Tag color="blue">{record.name}</Tag>;
          return <span>{record.name}</span>;
        }
        return <Tag color="cyan">{record.name}</Tag>;
      },
    },
    {
      title: '序号',
      align: 'center',
      dataIndex: 'sort',
    },
    {
      title: '按钮编码',
      align: 'center',
      dataIndex: 'code',
      render(code) {
        if (!code) return;
        return <Tag color="default">{code}</Tag>;
      },
    },

    {
      title: '描述',
      align: 'center',
      dataIndex: 'describe',
    },
    {
      title: '创建时间',
      align: 'center',
      dataIndex: 'createTime',
    },
    {
      title: '状态',
      align: 'center',
      dataIndex: 'state',
      render: (state) => {
        return state === 1 ? <Badge status="success" text="启用" /> : <Badge text="禁用" />;
      },
    },
    {
      key: 'actions',
      title: '操作',
      align: 'center',
      fixed: 'right',
      width: 180,
      render: (_, record) => {
        return (
          <Space className="action_bar">
            {record.type === 1 ? (
              <AuthButton
                type="link"
                onClick={() => {
                  buttonRef.current?.onShow({
                    parentId: record.btnId,
                    type: 2,
                  });
                }}
              >
                新增按钮
              </AuthButton>
            ) : (
              <AuthButton
                type="link"
                style={{ color: 'orange' }}
                onClick={() => {
                  buttonRef.current?.onShow({
                    // ...record,
                    parentId: record.parentId,
                    sort: record.sort,
                    describe: record.describe,
                    name: `${record.name} - 复制`,
                    code: undefined,
                    type: 2,
                  });
                }}
              >
                复制
              </AuthButton>
            )}

            <AuthButton
              type="link"
              icon={<EditOutlined />}
              onClick={() => {
                if (record.type === 1) {
                  menuRef.current?.onShow({ ...record });
                } else {
                  buttonRef.current?.onShow({ ...record });
                }
              }}
            >
              修改
            </AuthButton>
          </Space>
        );
      },
    },
  ];

  const { run: RunMenu, loading } = useRequest<API.HttpResult, any>(apicAppControllerQuery, {
    manual: true,
    onSuccess: (result, params) => {
      const { data } = result;
      if (result.success) {
        data.forEach((d: AppAuthMenuType) => {
          if (!d.leaf) {
            d.children = [];
          }
          d.title = d.name;
          d.key = d.code;
        });
        setDataSource((origin) => {
          const list = updateMenuTreeData(origin, params[0].id, data);
          return list;
        });
      }
    },
  });

  return (
    <PageContainer>
      <PageCard>
        <AuthTable
          rowKey="btnId"
          toolbarLeft={
            <>
              <AuthButton
                type="primary"
                auth="sys:static:property:create"
                onClick={() => {
                  menuRef.current?.onShow({});
                }}
                icon={<PlusOutlined />}
              >
                新增
              </AuthButton>
            </>
          }
          loading={loading || loadings}
          scroll={{ x: 1200 }}
          tableRef={tableRef}
          formRef={formRef}
          columns={columns}
          pagination={false}
          dataSource={dataSource}
          request={async () => {
            setLoadings(true);
            const result = await apicAppControllerQuery({});
            const { data, success } = result;
            if (success) {
              data.forEach((d: AppAuthMenuType) => {
                if (!d.leaf) {
                  d.children = [];
                }
                d.title = d.name;
                d.key = d.code;
              });
              setExpandedRowKeys([]);
              setDataSource(data);
              result.data = data;
            }
            setLoadings(false);
            return result;
          }}
          expandedRowKeys={expandedRowKeys}
          expandable={{
            onExpand(expanded, record: AppAuthMenuType) {
              if (expanded && record.children.length === 0) {
                RunMenu({ id: record.btnId });
              }
            },
            onExpandedRowsChange(expandedKeys) {
              setExpandedRowKeys(expandedKeys as string[]);
            },
          }}
        />
        <ButtonModel
          proRef={buttonRef}
          tableRef={tableRef}
          onSuccess={(parentId) => {
            if (parentId === '-1') {
              tableRef.current?.onSearch();
            } else {
              RunMenu({ id: parentId });
            }
          }}
        />
        <MenuModel
          proRef={menuRef}
          tableRef={tableRef}
          onSuccess={() => {
            tableRef.current?.onSearch();
          }}
        />
      </PageCard>
    </PageContainer>
  );
};

export default Menu;
