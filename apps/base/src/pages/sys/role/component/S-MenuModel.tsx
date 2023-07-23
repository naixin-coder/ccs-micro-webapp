import AntdIcons from '@/components/common/AntdIcons';
import TreeSlider from '@/components/common/TreeSlider';
import * as antIcons from '@ant-design/icons';
import { useRequest } from 'ahooks';
import { message, Space, Tag } from 'antd';
import type { DataNode } from 'antd/lib/tree';
import type { LModalFormProps } from 'lighting-design';
import { LDrawerForm, LForm, LFormItem, LFormItemInput } from 'lighting-design';
import { FC, useEffect, useRef, useState } from 'react';
import { apiDoRoleRelaButton, apiGetRoleBtnTreeNode, apiQueryMenu, apiSaveMenu } from '../service';

interface BasicModalProps extends LModalFormProps {
  roleData: any;
  onChange: () => void;
  open: boolean;
  isApp: boolean;
  setIsApp: (e: boolean) => void;
}

const onFormat = (nodes: any[]): DataNode[] => {
  nodes.forEach((res) => {
    res.key = res.nodeId;
    res.title = res.nodeName;
    if (res.children) {
      onFormat(res.children);
    }
  });
  return nodes;
};

const BasicModel: FC<BasicModalProps> = ({
  roleData,
  onChange,
  open,
  isApp,
  setIsApp,
  ...restProps
}) => {
  const [form] = LForm.useForm();
  const [theeData, setTheeData] = useState<DataNode[]>([]);
  const isChange = useRef<boolean>(false); // 是否发生选中改变

  const {
    data = { nodes: [], checkedIds: [], halfCheckedIds: [] } as any,
    run,
    loading: loadingTree,
    mutate,
  } = useRequest<API.HttpResult, any>(isApp ? apiGetRoleBtnTreeNode : apiQueryMenu, {
    manual: true,
    onSuccess: (result) => {
      if (result.success) {
        const { data: d } = result;
        setTheeData(onFormat(d.nodes));
        form.setFieldsValue({
          checkedIds: d.checkedIds,
        });
      }
    },
  });
  const { runAsync: runSaveMenu } = useRequest<API.HttpResult, any>(apiSaveMenu, {
    manual: true,
    onSuccess(result) {
      if (result.success) {
        onChange(); // 响应成功后，刷新表格
        message.success('操作成功');
      }
    },
  });
  // APP关联角色
  const { runAsync: runDoRoleRelaButton } = useRequest<API.HttpResult, any>(apiDoRoleRelaButton, {
    manual: true,
    onSuccess(result) {
      if (result.success) {
        onChange(); // 响应成功后，刷新表格
        message.success('操作成功');
      }
    },
  });

  // 选中事件
  const onCheck = (keys: any, e: any) => {
    isChange.current = true;
    mutate({ ...data, checkedIds: keys, halfCheckedIds: e?.halfCheckedKeys || [] });
  };

  useEffect(() => {
    if (open && roleData) {
      run({ roleId: roleData.roleId });
      form.setFieldsValue(roleData);
    }
  }, [open]);

  return (
    <LDrawerForm
      open={open}
      onOpenChange={() => {}}
      form={form}
      title={roleData ? '修改信息' : '新建角色'}
      onFinish={async () => {
        if (isChange.current) {
          const { success } = isApp
            ? await runDoRoleRelaButton({
                btnIds: [...data?.checkedIds, ...data?.halfCheckedIds],
                roleId: roleData.roleId,
              })
            : await runSaveMenu({
                menuCodes: [...data?.checkedIds, ...data?.halfCheckedIds],
                roleId: roleData.roleId,
              });
          return success;
        }
        return true;
      }}
      drawerProps={{
        afterOpenChange: () => {
          setIsApp(false);
          isChange.current = false;
          form.resetFields();
        },
      }}
      isEnterSubmit={false}
      {...restProps}
    >
      <LFormItemInput name="roleName" label="角色名称" disabled />
      <LFormItemInput name="roleDesc" label="角色描述" disabled />
      <LFormItem valuePropName="checkedKeys" trigger="onCheck" name="checkedIds" label="菜单列表">
        <TreeSlider
          loading={loadingTree}
          treeList={theeData}
          onCheck={onCheck}
          checkable
          checkStrictly={false}
          placeholder="菜单筛选"
          titleRender={(item: any) => {
            return (
              <Space size="small">
                {item.nodeData.menuType === 2 ? (
                  <>
                    {item.nodeData.menuUrl && (
                      <Tag color="green" style={{ marginRight: 0 }}>
                        按钮
                      </Tag>
                    )}
                    {item.nodeData.urlPath && (
                      <Tag color="blue" style={{ marginRight: 0 }}>
                        URL
                      </Tag>
                    )}
                    <div style={{ color: '#848587' }}>
                      {isApp ? item.nodeData.name : item.nodeData.menuName}
                      {`：${isApp ? item.nodeData.describe : item.nodeData.menuDesc || ''}`}
                    </div>
                  </>
                ) : (
                  <>
                    {item.nodeData.icon ? (
                      <AntdIcons name={item.nodeData.icon as keyof typeof antIcons} />
                    ) : null}
                    {isApp ? item.nodeData.name : item.nodeData.menuName}
                    {item?.children && item?.children.length > 0 && (
                      <span
                        style={{ color: '#BDBDBD', letterSpacing: 1 }}
                      >{` (${item?.children.length})`}</span>
                    )}
                  </>
                )}
              </Space>
            );
          }}
        />
      </LFormItem>
    </LDrawerForm>
  );
};

export default BasicModel;
