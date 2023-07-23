import AuthButton from '@/components/common/AuthButton';
import AuthTable from '@/components/common/AuthTable';
import PageCard from '@/components/common/PageCard';
import { ArrowsAltOutlined, EditOutlined, ShrinkOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { useRequest } from 'ahooks';
import { Badge, Button, FormInstance, Space, Tag } from 'antd';
import type { ColumnsType } from 'antd/lib/table/interface';
import type { LTableInstance, UseShowInstance } from 'lighting-design';
import { FC, useCallback, useRef, useState } from 'react';
import BasicModal from './component/S-BasicModel';
import ButtonModel from './component/S-ButtonModel';
import { apiQueryMenu } from './service';
import type { SysMenuType } from './type';

const dataList: React.Key[] = [];
const generateList = (data: SysMenuType[]) => {
  for (let i = 0; i < data.length; i++) {
    const node: any = data[i];
    if (node.children && node.children.length !== 0) dataList.push(node.key);
    if (node.children) generateList(node.children);
  }
};

// 删除children
const generateData = (data: any[]) => {
  for (let i = 0; i < data.length; i++) {
    const node = data[i];
    if (node.children?.length === 0) delete data[i].children;
    if (node.children) generateData(node.children);
  }
  return data;
};

export const updateMenuTreeData = (
  list: SysMenuType[],
  key: React.Key,
  children: SysMenuType[],
): SysMenuType[] =>
  list.map((node) => {
    if (node.key === key) {
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
  const [show, setShow] = useState<boolean>(false);
  const [loadings, setLoadings] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState<SysMenuType[]>([]);
  const [expandedRowKeys, setExpandedRowKeys] = useState<React.Key[]>([]);

  const buttonRef = useRef<UseShowInstance>();
  const basicRef = useRef<UseShowInstance>();

  const urlTypeString = useCallback((record: SysMenuType) => {
    const { menuUrl, buttonUrlId } = record;
    if (menuUrl && buttonUrlId)
      return (
        <>
          <Tag color="cyan">按钮</Tag>
          <Tag color="geekblue">Url</Tag>
        </>
      );
    if (menuUrl) return <Tag color="cyan">按钮</Tag>;
    if (buttonUrlId) return <Tag color="geekblue">Url</Tag>;
  }, []);

  const columns: ColumnsType<SysMenuType> = [
    {
      title: '菜单名称',
      dataIndex: 'menuName',
      render: (_, record) => {
        const renderTag = () => {
          if (record.menuType === 2) {
            return record.state === 1 ? (
              <Tag color="orange">{record.menuName}</Tag>
            ) : (
              <Tag color="#d9d9d9">{record.menuName}</Tag>
            );
          }
          return <span style={{ opacity: record.state === 1 ? 1 : 0.5 }}>{record.menuName}</span>;
        };
        return renderTag();
      },
    },
    {
      title: '序号',
      dataIndex: 'sortId',
      align: 'center',
    },
    {
      title: '菜单类型',
      align: 'center',
      dataIndex: 'menuType',
      render(menuType, record) {
        return (
          <>
            {menuType === 2 ? (
              urlTypeString(record)
            ) : menuType === 1 ? (
              <Tag color="success">菜单</Tag>
            ) : (
              <Tag color="blue">目录</Tag>
            )}
          </>
        );
      },
    },
    {
      title: '菜单描述',
      dataIndex: 'menuDesc',
      align: 'center',
    },
    {
      title: '菜单链接',
      dataIndex: 'menuUrl',
      align: 'center',
      render(menuUrl, record) {
        if (!menuUrl) return;
        return (
          <>
            {record.menuType === 2 ? (
              <Tag color="orange">{menuUrl}</Tag>
            ) : (
              <Tag color="default">{menuUrl}</Tag>
            )}
          </>
        );
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
    {
      key: 'actions',
      title: '操作',
      align: 'center',
      fixed: 'right',
      width: 180,
      render: (_, record) => {
        return (
          <Space className="action_bar">
            {record.menuType === 0 && ( // 目录
              <AuthButton
                type="link"
                auth="sys:menu:create"
                onClick={() => {
                  basicRef.current?.onShow({
                    parentMenuCode: record.menuCode,
                    menuType: 1,
                    state: 1,
                  });
                }}
              >
                新增下级
              </AuthButton>
            )}
            {record.menuType === 1 ? ( // 菜单
              <AuthButton
                type="link"
                auth="sys:menu:create"
                onClick={() => {
                  buttonRef.current?.onShow({
                    parentMenuCode: record.menuCode,
                    menuType: 2,
                  });
                }}
              >
                新增按钮
              </AuthButton>
            ) : null}
            {record.menuType === 2 ? ( // 按钮
              <AuthButton
                type="link"
                auth="sys:menu:create"
                style={{ color: 'orange' }}
                onClick={() => {
                  buttonRef.current?.onShow({
                    ...record,
                    menuName: `${record.menuName} - 复制`,
                    menuCode: undefined,
                  });
                }}
              >
                复制
              </AuthButton>
            ) : null}
            <AuthButton
              type="link"
              auth="sys:menu:update"
              icon={<EditOutlined />}
              onClick={() => {
                if (record.menuType === 2) {
                  buttonRef.current?.onShow({ ...record });
                } else {
                  basicRef.current?.onShow({ ...record });
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

  const { run: RunMenu, loading } = useRequest<API.HttpResult, any>(apiQueryMenu, {
    manual: true,
    onSuccess: (result, params) => {
      const { data } = result;
      if (result.success) {
        data.forEach((d: SysMenuType) => {
          if (d.menuType !== 2 && !d.leaf) d.children = [];
          d.title = d.menuName;
          d.key = d.menuCode;
        });
        setDataSource((origin) => {
          const list = updateMenuTreeData(origin, params[0].parentMenuCode, data);
          generateList(list);
          return list;
        });
      }
    },
  });

  return (
    <PageContainer>
      <PageCard>
        <AuthTable
          rowKey="menuCode"
          auth="sys:menu:list"
          loading={loading || loadings}
          scroll={{ x: 1200 }}
          toolbarLeft={
            <>
              <AuthButton
                auth="sys:menu:create"
                type="primary"
                onClick={() => {
                  basicRef.current?.onShow({ menuList: dataSource, parentMenuCode: '1' });
                }}
              >
                新增
              </AuthButton>
              {show && (
                <Button
                  icon={expandedRowKeys.length > 0 ? <ShrinkOutlined /> : <ArrowsAltOutlined />}
                  onClick={() => {
                    if (expandedRowKeys.length > 0) {
                      setExpandedRowKeys([]);
                    } else {
                      setExpandedRowKeys(dataList);
                    }
                  }}
                >
                  {expandedRowKeys.length > 0 ? '折叠' : '展开'}
                </Button>
              )}
            </>
          }
          tableRef={tableRef}
          formRef={formRef}
          columns={columns}
          pagination={false}
          dataSource={dataSource}
          request={async () => {
            setLoadings(true);
            const result = await apiQueryMenu({ parentMenuCode: '1', state: '0' });
            const { data, success } = result;
            if (success) {
              data.forEach((d: SysMenuType) => {
                d.key = d.menuCode;
                d.title = d.menuName;
                if (d.menuType !== 2 && !d.leaf) d.children = [];
              });
              setExpandedRowKeys([]);
              setDataSource(data);
              generateList(data);
              result.data = data;
            }
            setLoadings(false);
            return result;
          }}
          expandedRowKeys={expandedRowKeys}
          expandable={{
            onExpand(expanded, record: SysMenuType) {
              if (!show) setShow(true);
              if (expanded && record.children.length === 0) {
                RunMenu({ parentMenuCode: record.key });
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
          onSuccess={(parentMenuCode) => {
            if (parentMenuCode === '1') {
              tableRef.current?.onSearch();
            } else {
              RunMenu({ parentMenuCode });
            }
          }}
        />
        <BasicModal
          proRef={basicRef}
          tableRef={tableRef}
          onSuccess={(parentMenuCode) => {
            if (parentMenuCode === '1') {
              tableRef.current?.onSearch();
            } else {
              RunMenu({ parentMenuCode });
            }
          }}
        />
      </PageCard>
    </PageContainer>
  );
};

export default Menu;
