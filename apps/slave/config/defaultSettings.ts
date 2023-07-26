import { ProLayoutProps } from '@ant-design/pro-components';

export interface SettingsTypes {
  pwa?: boolean;
  logo?: string;
}

/**
 * @name
 */
const Settings: ProLayoutProps & SettingsTypes = {
  colorPrimary: '#1890ff',
  layout: 'top',
  contentWidth: 'Fluid',
  splitMenus: false,
  fixedHeader: true,
  fixSiderbar: true,
  pwa: false,
  footerRender: false,
  menuHeaderRender: false,
  // headerRender: false,
  token: {},
};

export default Settings;
