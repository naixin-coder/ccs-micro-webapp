import { Badge, FormInstance } from 'antd';
import { Space, Tag } from 'antd';
import type { FC } from 'react';
import { useContext, useEffect } from 'react';
import { useRef, useState } from 'react';
import type { LTableInstance } from 'lighting-design';
import type { ColumnsType } from 'antd/lib/table';
import { DicContext } from '../..';
import ValueModal from './Modal';
import type { DicValueItemType } from '../../type';
import { ProCard } from '@ant-design/pro-components';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import AuthButton from '@/components/common/AuthButton';
import AuthTable from '@/components/common/AuthTable';
import { apiQueryPageValue } from '@/services/public';

const DetailList: FC = () => {
  const formRef = useRef<FormInstance>();
  const [open, setOpen] = useState(false);
  const [editableRecord, setEditablRecord] = useState<Record<string, any>>();
  const tableRef = useRef<LTableInstance>();
  const { record } = useContext(DicContext);

  const columns: ColumnsType<DicValueItemType> = [
    {
      title: '排序',
      dataIndex: 'sortId',
      align: 'center',
    },
    {
      title: '属性名称',
      dataIndex: 'valueName',
      align: 'center',
    },
    {
      title: '属性值',
      dataIndex: 'valueCode',
      align: 'center',
    },
    {
      title: '属性描述',
      dataIndex: 'valueDesc',
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
      fixed: 'right',
      align: 'center',
      render: (_, records) => {
        return (
          <Space className="action_bar">
            <AuthButton
              auth="sys:static:value:update"
              type="link"
              icon={<EditOutlined />}
              onClick={() => {
                setEditablRecord({ ...records });
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

  useEffect(() => {
    if (record?.propCode) {
      tableRef.current?.onSearch();
    } else {
      tableRef.current?.onReset();
    }
  }, [record]);

  return (
    <ProCard
      title={
        <Space>
          <strong>{record?.propName}</strong>
          <br />
          <span>{record?.propCode}</span>
        </Space>
      }
    >
      <AuthTable
        rowKey="valueId"
        tableRef={tableRef}
        formRef={formRef}
        size="small"
        auth="sys:static:value:list"
        columns={columns}
        pagination={{
          pageSize: 10,
          showSizeChanger: false,
          showQuickJumper: false,
        }}
        table={{
          request: apiQueryPageValue,
          requestParam: { propCode: record?.propCode },
        }}
        autoRequest={false}
        scroll={{ x: 600 }}
        toolbarRight={
          record?.propId && (
            <AuthButton
              auth="sys:static:value:create"
              type="primary"
              onClick={() => {
                setEditablRecord(undefined);
                setOpen(true);
              }}
              icon={<PlusOutlined />}
            >
              新增
            </AuthButton>
          )
        }
        queryFormProps={{
          submitter: {
            showReset: false,
          },
        }}
        toolbarActionConfig={{
          showColumnSetting: false,
          showDensity: false,
          showFullscreen: false,
          showReload: false,
        }}
      />
      <ValueModal
        open={open}
        onOpenChange={setOpen}
        data={editableRecord}
        onChange={() => {
          tableRef.current?.onReload();
        }}
      />
    </ProCard>
  );
};

export default DetailList;
