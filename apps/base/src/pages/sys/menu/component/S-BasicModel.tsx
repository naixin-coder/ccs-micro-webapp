import LFormItemStaticRadio from '@/components/business/StaticRadio';
import { useRequest } from 'ahooks';
import { Col, Row } from 'antd';
import {
  LFormItem,
  LFormItemRadio,
  LFormItemTextArea,
  LDrawerForm,
  LTrigger,
  LForm,
  LFormItemInput,
  LFormItemNumber,
  LFormItemIcon,
  LModalFormProps,
  LTableInstance,
  UseShowInstanceRef,
  useShow,
} from 'lighting-design';
import type { FC, MutableRefObject } from 'react';
import { useEffect, useState } from 'react';
import { apiSaveMenu } from '../service';
import type { SysMenuType } from '../type';
import TreeMenuSlider from './S-TreeMenuSlider';

interface BasicModalProps extends LModalFormProps {
  proRef: UseShowInstanceRef;
  tableRef?: MutableRefObject<LTableInstance | undefined>;
  onSuccess: (parentMenuCode: string) => void;
}

const onFormat = (nodes: SysMenuType[]): SysMenuType[] => {
  nodes.forEach((res) => {
    res.key = res.menuCode;
    res.title = res.menuName;
    if (res.children) {
      onFormat(res.children);
    }
  });
  return nodes;
};
const BasicModal: FC<BasicModalProps> = ({ proRef, tableRef, onSuccess, ...restProps }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [form] = LForm.useForm();

  const { parentData: record } = useShow(proRef, {
    onShow: () => setOpen(!open),
  });

  const { runAsync } = useRequest<API.HttpResult, SysMenuType[]>(apiSaveMenu, {
    manual: true,
    onSuccess(result) {
      if (result.success) {
        if (record) {
          onSuccess(record.parentMenuCode || '1');
        } else {
          tableRef?.current?.onReload();
        }
      }
    },
  });

  useEffect(() => {
    if (record) {
      form.setFieldsValue({ ...record });
    }
  }, [record]);

  const ItemTree = (...props: any[]) => {
    return (
      <TreeMenuSlider
        placeholder="筛选菜单"
        treeList={record?.menuList || []}
        titleRender={(item: any) => {
          return (
            <>
              {item.title}
              {item?.children && item?.children.length > 0 && (
                <span
                  style={{ color: '#BDBDBD', letterSpacing: 1 }}
                >{` (${item?.children.length})`}</span>
              )}
            </>
          );
        }}
        onSelect={(_, item: any) => {
          props[0].onChange({
            label: item.node.menuName,
            value: item.node.menuCode,
          });
          props[0].setOpen(false);
        }}
        selectedKeys={[props[0].value]}
      />
    );
  };

  const TriggerItem = (...props: any[]) => {
    return (
      <LTrigger
        {...props[0]}
        allowClear
        style={{ width: '100%' }}
        placement="bottomLeft"
        placeholder="请选择上级菜单"
      >
        <ItemTree />
      </LTrigger>
    );
  };

  return (
    <LDrawerForm
      open={open}
      form={form}
      width={600}
      title={record?.menuCode ? '修改信息' : '新建菜单'}
      onFinish={async (values) => {
        if (record?.menuList) {
          values.parentMenuCode =
            typeof values.parentMenuCode === 'string'
              ? record.parentMenuCode
              : values.parentMenuCode.value;
        }
        const { success } = await runAsync({ ...record, ...values } as SysMenuType);
        return success;
      }}
      modalProps={{
        afterClose: () => form.resetFields(),
      }}
      onOpenChange={setOpen}
      layout="vertical"
      initialValues={{
        menuType: 1,
        state: 1,
      }}
      {...restProps}
    >
      <Row>
        {record?.menuList && (
          <Col span={24}>
            <LFormItem name="parentMenuCode" label="上级菜单" tooltip="不选择则默认为根节点">
              <TriggerItem />
            </LFormItem>
          </Col>
        )}
        <Col span={10}>
          <LFormItemInput
            name="menuName"
            required
            tooltip="菜单位置显示的说明信息"
            label="菜单标题"
          />
        </Col>
        <Col span={12} offset={2}>
          <LFormItemNumber
            name="sortId"
            tooltip="根据序号升序排列"
            required
            label="显示排序"
            min={0}
            numberProps={{ precision: 0 }}
          />
        </Col>
        <Col span={12}>
          <LFormItemRadio
            label="菜单类型"
            name="menuType"
            required
            options={[
              {
                label: '目录',
                value: 0,
              },
              {
                label: '菜单',
                value: 1,
              },
              {
                label: '按钮',
                value: 2,
                disabled: true,
              },
            ]}
          />
        </Col>
        <Col span={12}>
          <LFormItemIcon
            name="icon"
            label="菜单图标"
            options={{
              Outlined: {
                label: '线框风格',
              },
              Filled: {
                label: '实底风格',
              },
            }}
          />
        </Col>
        <Col span={12}>
          <LFormItemStaticRadio label="菜单状态" required name="state" propCode="status" />
        </Col>
      </Row>
      <LFormItemInput
        tooltip="访问此页面自定义的url地址"
        name="menuUrl"
        required
        label="路由地址"
      />
      <LFormItemTextArea name="menuDesc" label="菜单描述" />
    </LDrawerForm>
  );
};

export default BasicModal;
