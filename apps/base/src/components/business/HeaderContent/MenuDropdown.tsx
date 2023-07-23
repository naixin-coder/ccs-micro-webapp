import React from 'react';
import { NOT_ACCESS } from '@/constants';
import { MenuOutlined } from '@ant-design/icons';
import { MenuProps } from 'antd';
import { useModel, Link } from '@umijs/max';
import HeaderDropdown from '../HeaderDropdown';
import { MenuDataItem } from '@ant-design/pro-components';
import AntdIcons from '@/components/common/AntdIcons';
import styles from './index.less';

export type GlobalHeaderRightProps = {
  menu?: boolean;
};
export type MenuItem = Required<MenuProps>['items'][number];

const buildTree = (routesList: any, parentMenuCode: string) => {
  return routesList
    .filter((route: MenuDataItem) => route.parentMenuCode === parentMenuCode)
    .map((route: MenuDataItem) => ({
      key: route.menuCode,
      label: route.menuName,
      path: route.menuUrl,
      menuType: route.menuType,
      icon: route.icon,
      children: buildTree(routesList, route.menuCode),
    }));
};

const getItem = (item: MenuDataItem) => {
  const { label, key, icon, path, children = [], theme, menuType } = item;
  return {
    key,
    menuType,
    label: (
      <Link to={path as any}>
        <span>{label}</span>
      </Link>
    ),
    icon: <div>{icon && <AntdIcons name={icon as any} />}</div>,
    children: children.length > 0 ? children : null,
    theme,
  } as MenuItem;
};
const Index: React.FC<GlobalHeaderRightProps> = () => {
  const { initialState } = useModel('@@initialState');
  if (!initialState) return null;
  const { currentUser } = initialState;
  if (!currentUser || !currentUser?.authUrl || !currentUser?.routes) return null;

  // 菜单项
  const renderMenu = (menus: MenuDataItem | []) => {
    const menuItems = menus.map((menu: any) => {
      if (!currentUser?.authUrl.has(menu.path || '') && !NOT_ACCESS.includes(menu.path || ''))
        return {};
      if (menu.children && !menu?.menuType && menu.children.some((child: any) => child.label)) {
        return getItem({ ...menu, children: renderMenu(menu.children || []) });
      }
      return getItem({ ...menu });
    });
    return menuItems;
  };
  const treeData = buildTree(currentUser?.routes, '1');

  return (
    <HeaderDropdown menu={{ items: renderMenu(treeData) }}>
      <MenuOutlined className={styles.menu_dropdown} onClick={(e) => e.stopPropagation()} />
    </HeaderDropdown>
  );
};

export default Index;
