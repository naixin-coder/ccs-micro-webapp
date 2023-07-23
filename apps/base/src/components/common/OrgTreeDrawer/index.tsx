import AuthTable from '@/components/common/AuthTable';
import { apiPagefindOrg, apiPublicOrgChildren } from '@/services/public';
import { DownOutlined } from '@ant-design/icons';
import { useRequest } from '@umijs/max';
import { Button, message, Space, Spin, Tooltip, Tree, Typography } from 'antd';
import classNames from 'classnames';
import {
  LDrawerForm,
  LFormItemInput,
  LTableInstance,
  useShow,
  UseShowInstanceRef,
} from 'lighting-design';
import { FC, Key, useEffect, useRef, useState } from 'react';
import styles from './style.less';

const { Text } = Typography;

interface SysOrgType {
  leaf: boolean;
  leagueCode: string;
  leagueId: string;
  leagueName: string;
  title: string;
  key: string;
  isLeaf: boolean;
  children?: SysOrgType[];
}

interface ParamsType {
  leagueCode: number | string;
}

const updateTreeData = (list: any[], key: React.Key, children: any): SysOrgType[] =>
  list.map((node: any) => {
    if (node.key === key) {
      return {
        ...node,
        children,
      };
    }
    if (node.children) {
      return {
        ...node,
        children: updateTreeData(node.children, key, children),
      };
    }
    return node;
  });

interface LabelsModalProps {
  proRef: UseShowInstanceRef;
  onChange: (item: { label: string; value: string }) => void;
}

const Index: FC<LabelsModalProps> = ({ proRef, onChange }) => {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [treeList, setTreeList] = useState<SysOrgType[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<Key[]>([]);
  const [expandedKeys, setExpandedKeys] = useState<Key[]>([]);
  const tableRef = useRef<LTableInstance>();
  const { parentData } = useShow(proRef, {
    onShow: () => setOpen(!open),
    onHide: () => {
      setVisible(false);
      setTreeList([]);
      setSelectedKeys([]);
      setExpandedKeys([]);
      tableRef.current?.onReset();
    },
  });
  const [itemData, setItemData] = useState<{
    label: string;
    value: string;
  }>();

  // 选中
  const onRowSelection = (selectedRowKeys: Key[], selectedRows: any) => {
    setSelectedKeys(selectedRowKeys);
    setItemData({
      label: selectedRows[0].leagueName,
      value: selectedRows[0].leagueCode,
    });
  };

  useEffect(() => {
    if (parentData && parentData.value) setSelectedKeys([parentData.value]);
  }, [parentData]);

  const { loading, run } = useRequest<API.HttpResult<SysOrgType[]>, ParamsType[], SysOrgType[]>(
    apiPublicOrgChildren,
    {
      manual: true,
      defaultParams: [{ leagueCode: '' }],
      formatResult: ({ success, data }) => {
        if (success) {
          data.forEach((e: SysOrgType) => {
            e.title = e.leagueName;
            e.key = e.leagueCode;
            e.isLeaf = e.leaf;
          });
          return data;
        }
        return [];
      },
    },
  );

  // 单选
  const onSelect = (_e: any, { node }: { node: any }) => {
    setSelectedKeys([node.leagueCode]);
    setItemData({ value: node.leagueCode, label: node.leagueName });
  };

  // 异步加载数据
  const onLoadData = ({ key, children }: any) => {
    return new Promise<void>((resolve) => {
      if (children) resolve();
      run({ leagueCode: key }).then((childrenData) => {
        setTreeList((origin: any) => {
          const list = updateTreeData(origin, key, childrenData);
          return list;
        });
        resolve();
      });
    });
  };

  useEffect(() => {
    if (open && treeList.length === 0) {
      run({ leagueCode: '' }).then((res) => {
        if (res.length <= 1) {
          setTreeList(res);
          run({ leagueCode: res[0].leagueCode }).then((list) => {
            setExpandedKeys([res[0].leagueCode]);
            setTreeList(() => {
              return updateTreeData(res, res[0].leagueCode, list);
            });
          });
        } else {
          setTreeList(res);
        }
      });
    }
  }, [open]);

  return (
    <LDrawerForm
      title="组织选择"
      open={open}
      onOpenChange={setOpen}
      isEnterSubmit={false}
      onFinish={async () => {
        if (!itemData) {
          message.error('请选择组织！');
          return false;
        }
        onChange(itemData);
        return true;
      }}
      drawerProps={{
        maskClosable: true,
      }}
    >
      <AuthTable
        rowKey="leagueCode"
        size="small"
        tableRef={tableRef}
        columns={[
          { title: '组织名称', dataIndex: 'leagueName', ellipsis: true },
          {
            title: '组织树',
            dataIndex: 'parentLeague',
            render: (values = []) => {
              if (values) {
                const value = (values as SysOrgType[])
                  .map((item) => item.leagueName)
                  .join()
                  .replaceAll(',', ' > ');
                return (
                  <Text style={{ width: 220 }} ellipsis={{ tooltip: { title: value } }}>
                    {value}
                  </Text>
                );
              }
              return '';
            },
          },
        ]}
        rowSelection={{
          type: 'radio',
          selectedRowKeys: selectedKeys,
          onChange: onRowSelection,
        }}
        onRow={(record) => {
          return {
            style: { cursor: 'pointer' },
            onClick: () => {
              setSelectedKeys([record.leagueCode]);
              setItemData({
                label: record.leagueName,
                value: record.leagueCode,
              });
            },
          };
        }}
        formItems={[<LFormItemInput key="0" name="leagueName" label="组织名称" />]}
        showToolbar={false}
        formCardProps={{
          size: 'small',
        }}
        queryFormProps={{
          isSpace: true,
          isEnterSubmit: false,
          submitter: {
            onReset() {
              setVisible(false);
            },
            onSubmit() {
              setVisible(true);
            },
          },
        }}
        pagination={{
          defaultPageSize: 12,
          showSizeChanger: false,
          showQuickJumper: false,
        }}
        table={{
          request: apiPagefindOrg,
        }}
        tableRender={(Dom) => (
          <div>
            <>{Dom.searchFormDom}</>
            <Space className={styles.treeTable}>
              <Tooltip title={`切换到${!visible ? '表格' : '树级'}`}>
                <Button size="small" onClick={() => setVisible(!visible)}>
                  切换
                </Button>
              </Tooltip>
            </Space>
            <div style={{ position: 'relative', overflow: 'hidden' }}>
              <div
                className={classNames(styles.orgTree, {
                  [styles.orgTreeActive]: visible,
                })}
              >
                <Spin spinning={loading}>
                  <Tree
                    {...{
                      style: { paddingLeft: 20 },
                      showLine: true,
                      checkStrictly: true,
                      expandedKeys,
                      onExpand: setExpandedKeys,
                      switcherIcon: <DownOutlined />,
                      loadData: onLoadData,
                      treeData: treeList,
                      onSelect,
                      selectedKeys,
                    }}
                  />
                </Spin>
              </div>
              <div
                className={classNames(styles.tableDom, {
                  [styles.tableActive]: visible,
                })}
              >
                {Dom.tableDom}
              </div>
            </div>
          </div>
        )}
      />
    </LDrawerForm>
  );
};

export default Index;
