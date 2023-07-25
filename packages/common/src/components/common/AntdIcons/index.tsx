import { FC } from 'react';
import * as antIcons from '@ant-design/icons';

interface AntdIconsProps {
  /**
   * ant-design/icons 名称  as keyof typeof antIcons
   */
  name: keyof typeof antIcons;
}

const AntdIcons: FC<AntdIconsProps> = ({ name }) => {
  const Icon = antIcons[name] as any;
  return <Icon />;
};

export default AntdIcons;
