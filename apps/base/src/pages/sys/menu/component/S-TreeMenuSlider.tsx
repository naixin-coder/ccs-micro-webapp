/* eslint-disable no-async-promise-executor */
import type { TreeProps } from 'antd';
import { Spin, Tree } from 'antd';
import React, { useEffect, useState } from 'react';
import { updateMenuTreeData } from '..';
import { apiQueryMenu } from '../service';
import type { SysMenuType } from '../type';
import styles from './styles.less';

interface TreeMenuSliderProps extends TreeProps {
  loading?: boolean;
  placeholder: string;
  treeList: SysMenuType[];
}

const TreeMenuSlider: React.FC<TreeMenuSliderProps> = ({
  loading = false,
  treeList,
  placeholder,
  ...props
}) => {
  const [treeData, setTreeData] = useState<SysMenuType[]>([]);
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);

  useEffect(() => {
    if (treeList) {
      setTreeData(treeList);
    }
  }, [treeList]);

  // 展开/收起节点时触发
  const onExpand = (newExpandedKeys: React.Key[]) => {
    setExpandedKeys(newExpandedKeys);
    setAutoExpandParent(false);
  };

  const onLoadData = ({ menuCode }: any) =>
    new Promise<void>(async (resolve) => {
      const result = await apiQueryMenu({ parentMenuCode: menuCode });
      const { data } = result;
      if (result.success) {
        data.forEach((d: SysMenuType, i: number) => {
          d.title = d.menuName;
          d.key = d.menuCode;
          if (d.menuType !== 2) d.children = [];
          // if (d.state == 0) data.splice(i, 1);
        });
        setTreeData((origin) => {
          const list = updateMenuTreeData(origin, menuCode, data);
          return list;
        });
        resolve();
      }
    });

  return (
    <>
      <div className={styles.TreeSlider}>
        <Spin spinning={loading}>
          <Tree
            blockNode
            onExpand={onExpand}
            expandedKeys={expandedKeys}
            autoExpandParent={autoExpandParent}
            loadData={onLoadData}
            treeData={treeData}
            {...props}
          />
        </Spin>
      </div>
    </>
  );
};

export default TreeMenuSlider;
