import type { FC, Key } from 'react';
import React, { useState, useEffect } from 'react';
import { Spin, Tree } from 'antd';
import type { SysOrgType } from '@/pages/sys/org/type.d';
import { apiQueryOrgs } from '@/pages/sys/org/service';
import { useRequest } from '@umijs/max';

interface ParamsType {
  parentOrgId: number;
}

function updateTreeData(list: SysOrgType[], key: React.Key, children: SysOrgType[]): SysOrgType[] {
  return list.map((node) => {
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
}

/**
 * 组织选择组件
 * @param PropsType
 * @returns
 */
const OrgSelectTree: FC<any> = (props) => {
  const [selectedKeys, setSelectedKeys] = useState<Key[]>([]);
  const [nodeKeys, setNodeKeys] = useState<any[]>([]);

  const {
    data = [],
    loading,
    mutate,
    run,
  } = useRequest<API.HttpResult<SysOrgType[]>, ParamsType[], SysOrgType[]>(apiQueryOrgs, {
    defaultParams: [{ parentOrgId: 0 }],
    formatResult: (res) => {
      res.data.forEach((e: SysOrgType) => {
        e.title = e.orgName;
        e.key = e.orgId;
        e.isLeaf = e.leaf;
      });
      return res.data;
    },
  });

  // 监听value值改变
  useEffect(() => {
    const { orgId } = props.value || {};
    if (orgId) {
      if (props.multiple) {
        const ids = orgId.toString().split(',') || [];
        const idsInt = ids.map(Number);
        setNodeKeys([...idsInt]);
      } else {
        setSelectedKeys([orgId]);
      }
    } else if (props.multiple) {
      setNodeKeys([]);
    } else {
      setSelectedKeys([]);
    }
  }, [props.value]);

  // 异步加载数据
  const onLoadData = ({ key, children }: any) => {
    return new Promise<void>((resolve) => {
      if (children) {
        resolve();
      }
      // 获取下级数据
      run({ parentOrgId: key }).then((childrenData) => {
        // 更新数据
        const newData = updateTreeData(data, key, childrenData);
        mutate(newData);
        resolve();
      });
    });
  };

  // 单选
  const onSelect = (_e: any, { node }: { node: any }) => {
    setSelectedKeys([node.orgId]);
    props.onChange({ orgId: node.orgId, orgName: node.orgName });
    props.setOpen(false);
  };

  // 多选
  const onCheck = ({ checked }: any, { checkedNodes }: { checkedNodes: any[] }) => {
    const names: string[] = [];
    checkedNodes.forEach((e) => {
      names.push(e.title);
    });
    setNodeKeys([...checked]);
    if (props.onChange) props.onChange({ orgId: checked.toString(), orgName: names.toString() });
  };

  const checkProps: any = {
    checkable: props.multiple,
    checkStrictly: true,
    loadData: onLoadData,
    treeData: data,
  };

  if (props.multiple) {
    checkProps.onCheck = onCheck;
    checkProps.checkedKeys = nodeKeys;
  } else {
    checkProps.onSelect = onSelect;
    checkProps.selectedKeys = selectedKeys;
  }

  return data.length ? (
    <Tree {...checkProps} style={{ padding: 5 }} />
  ) : (
    <Spin spinning={loading} />
  );
};

export default OrgSelectTree;
