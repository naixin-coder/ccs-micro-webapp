export default [
  {
    path: '/sys',
    icon: 'SettingOutlined',
    name: '系统管理',
    routes: [
      {
        path: '/sys',
        redirect: '/sys/menu',
      },
      {
        name: '菜单管理',
        icon: 'MenuFoldOutlined',
        path: '/sys/menu',
        component: './sys/menu',
      },
      {
        name: '角色管理',
        icon: 'UserSwitchOutlined',
        path: '/sys/role',
        component: './sys/role',
      },
      {
        name: '用户管理',
        icon: 'TeamOutlined',
        path: '/sys/user',
        component: './sys/user',
      },
      {
        name: 'URL权限管理',
        icon: 'BranchesOutlined',
        path: '/sys/url',
        component: './sys/url',
      },
      {
        name: '静态值管理',
        icon: 'TagsOutlined',
        path: '/sys/dictionary',
        component: './sys/dictionary',
      },
      {
        name: '系统组织管理',
        icon: 'BranchesOutlined',
        path: '/sys/org',
        component: './sys/org',
      },
      {
        name: 'APP按钮权限管理',
        icon: 'AppstoreOutlined',
        path: '/sys/appAuth',
        component: './sys/appAuth',
      },
    ],
  },
];
