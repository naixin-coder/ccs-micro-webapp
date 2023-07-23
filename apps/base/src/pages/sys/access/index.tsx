import AuthButton from '@/components/common/AuthButton';
import AuthTable from '@/components/common/AuthTable';
import PageCard from '@/components/common/PageCard';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { useRequest } from 'ahooks';
import { Badge, Button, FormInstance, Image, message, Popconfirm, Space, Table } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import type { TableRowSelection } from 'antd/lib/table/interface';
import { LFormItemInput, LFormItemSelect, LTableInstance } from 'lighting-design';
import { FC, useEffect, useRef, useState } from 'react';
import { SysOrgType } from '../../tag/category/type';
import BasicDrawer from './Drawer';
import { apiPageSearch, apiUpdateState } from './service';

const Label: FC = () => {
  const formRef = useRef<FormInstance>();
  const tableRef = useRef<LTableInstance>();
  const [open, setOpen] = useState(false);
  const [editableRecord, setEditablRecord] = useState<Record<string, any>>();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [isEdit, setIsedit] = useState<boolean>(false);

  /**接入管理-变更状态 */
  const { runAsync: runUpdateState } = useRequest<API.HttpResult, any[]>(apiUpdateState, {
    manual: true,
  });

  const formItems = [
    <LFormItemInput key="0" name="systemName" label="系统名称" />,
    <LFormItemSelect
      key="1"
      label={'状态'}
      placeholder={'请选择状态'}
      name="state"
      options={[
        {
          label: '有效',
          value: 1,
        },
        {
          label: '无效',
          value: 0,
        },
      ]}
    />,
  ];

  const columns: ColumnsType<any> = [
    {
      title: '编码',
      dataIndex: 'appCode',
      align: 'center',
    },
    {
      title: '系统名称',
      dataIndex: 'systemName',
      align: 'center',
    },
    { title: '主管单位', dataIndex: 'sponsor', align: 'center' },
    {
      title: '图标',
      dataIndex: 'logoUrl',
      width: 80,
      align: 'center',
      render: (text) => {
        return <Image width={80} src={text} />;
      },
    },
    {
      title: '功能名称',
      dataIndex: 'appName',
      align: 'center',
    },
    {
      title: '地址',
      dataIndex: 'appUrl',
      align: 'center',
    },
    {
      title: '排序',
      dataIndex: 'sort',
      align: 'center',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      align: 'center',
    },
    {
      title: '公钥',
      dataIndex: 'publicKey',
      align: 'center',
    },
    {
      title: '私钥',
      dataIndex: 'privateKey',
      align: 'center',
    },
    {
      title: '是否16机制',
      dataIndex: 'mustAuth',
      align: 'center',
      render: (text) => {
        return text === 1 ? '必须认证' : '不需要认证';
      },
    },
    {
      title: '是否强制认证',
      dataIndex: 'mustHex',
      align: 'center',
      render: (text) => {
        return text === 1 ? '是' : '否';
      },
    },
    {
      title: '状态',
      dataIndex: 'state',
      align: 'center',
      render: (text) => {
        return text === 1 ? (
          <Badge status="success" text="有效" />
        ) : (
          <Badge status="default" text="无效" />
        );
      },
    },
    {
      title: '备注',
      dataIndex: 'notes',
      align: 'center',
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
            <Popconfirm
              placement="topRight"
              title="确认变更状态?"
              onConfirm={async () => {
                const res = await runUpdateState({ appId: record.appId, state: record.state });
                if (res.success) {
                  message.success('变更状态成功');
                  tableRef.current?.onSearch();
                }
              }}
              okText="确定"
              cancelText="取消"
            >
              <AuthButton type="link" icon={<EditOutlined />}>
                变更状态
              </AuthButton>
            </Popconfirm>

            <AuthButton
              type="link"
              icon={<EditOutlined />}
              onClick={() => {
                setEditablRecord({ ...record });
                setOpen(true);
                setIsedit(true);
              }}
            >
              修改
            </AuthButton>
          </Space>
        );
      },
    },
  ];
  // 选择行
  const rowSelection: TableRowSelection<SysOrgType> = {
    selectedRowKeys,
    onChange: (newKeys) => setSelectedRowKeys(newKeys),
    selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT, Table.SELECTION_NONE],
  };
  useEffect(() => {
    // getTreeData('0');
  }, []);
  return (
    <PageContainer>
      <PageCard>
        <AuthTable
          isSort={false}
          rowKey="appId"
          scroll={{ x: 1800 }}
          queryFormProps={{
            submitter: {
              onReset: () => {
                tableRef.current?.onReset();
              },
            },
          }}
          toolbarLeft={
            <>
              <Button
                type="primary"
                onClick={() => {
                  setEditablRecord(undefined);
                  setIsedit(false);
                  setOpen(true);
                }}
                icon={<PlusOutlined />}
              >
                新建
              </Button>
              {/* <Popconfirm
                placement="topRight"
                title="确认删除?"
                disabled={!selectedRowKeys.length}
                onConfirm={async () => {
                  const { success } = await runDeleteLabel({ labelIdList: [...selectedRowKeys] });
                  if (success) {
                    message.success('操作成功');
                    tableRef.current?.onReload();
                  }
                }}
                okText="确定"
                cancelText="取消"
              >
                <Button type="primary" disabled={!selectedRowKeys.length} icon={<MinusOutlined />}>
                  批量删除
                </Button>
              </Popconfirm> */}
            </>
          }
          size="small"
          // rowSelection={rowSelection}
          formItems={formItems}
          tableRef={tableRef}
          formRef={formRef}
          columns={columns}
          table={{
            request: apiPageSearch,
          }}
        />
      </PageCard>
      <BasicDrawer
        open={open}
        isEdit={isEdit}
        onOpenChange={setOpen}
        record={editableRecord}
        onChange={() => {
          tableRef.current?.onReload();
        }}
      />
    </PageContainer>
  );
};

export default Label;
