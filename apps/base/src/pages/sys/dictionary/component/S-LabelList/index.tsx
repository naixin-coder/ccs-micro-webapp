import type { FormInstance } from 'antd';
import { Space, Tag } from 'antd';
import type { FC } from 'react';
import { useRef, useState, useContext } from 'react';
import type { LTableInstance } from 'lighting-design';
import { LFormItemInput } from 'lighting-design';
import type { ColumnsType } from 'antd/lib/table';
import { apiQueryPageProperty } from '../../service';
import { DicContext } from '../..';
import type { DictionaryItemType } from '../../type';
import LabelModal from './Modal';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { useThrottleFn } from 'ahooks';
import AuthTable from '@/components/common/AuthTable';
import AuthButton from '@/components/common/AuthButton';

const LabelList: FC = () => {
  const formRef = useRef<FormInstance>();
  const tableRef = useRef<LTableInstance>();
  const [open, setOpen] = useState(false);
  const [editableRecord, setEditablRecord] = useState<Record<string, any>>();
  const { setRecord, record } = useContext(DicContext);
  const { run } = useThrottleFn((record) => setRecord({ ...record }), { wait: 500 });

  const formItems = [
    <LFormItemInput key="0" name="propName" label="属性名称" />,
    <LFormItemInput key="1" name="propCode" label="属性编码" />,
  ];
  const columns: ColumnsType<DictionaryItemType> = [
    {
      title: '属性名称',
      dataIndex: 'propName',
      align: 'center',
    },
    {
      title: '属性编码',
      dataIndex: 'propCode',
      align: 'center',
      render(value) {
        return (
          <Tag color="processing">
            <a>{value}</a>
          </Tag>
        );
      },
    },
    {
      title: '备注',
      dataIndex: 'propDesc',
      align: 'center',
      width: 150,
    },
    {
      key: 'actions',
      title: '操作',
      align: 'center',
      fixed: 'right',
      width: 60,
      render: (_, record) => {
        return (
          <Space className="action_bar">
            <AuthButton
              type="link"
              icon={<EditOutlined />}
              auth="sys:static:property:update"
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
    <>
      <AuthTable
        rowKey="propId"
        auth="sys:static:property:list"
        tableRef={tableRef}
        scroll={{ x: 800 }}
        toolbarLeft={
          <>
            <AuthButton
              type="primary"
              auth="sys:static:property:create"
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
        toolbarActionConfig={{
          showColumnSetting: false,
          showDensity: false,
          showFullscreen: false,
          showReload: false,
        }}
        queryFormProps={{
          isSpace: true,
          submitter: {
            onReset() {
              setRecord(undefined);
            },
            onSubmit() {
              setRecord(undefined);
            },
          },
        }}
        onRow={(records) => {
          return {
            style: {
              cursor: 'pointer',
              background: record?.propId === records.propId ? '#00000010' : 'unset',
            },
            onClick: () => run({ ...records }),
          };
        }}
        formItems={formItems}
        formRef={formRef}
        columns={columns}
        pagination={{
          pageSize: 6,
          showSizeChanger: false,
        }}
        table={{
          request: apiQueryPageProperty,
        }}
      />
      <LabelModal
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

export default LabelList;
