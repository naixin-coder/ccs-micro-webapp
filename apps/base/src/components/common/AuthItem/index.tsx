import { useState } from 'react';
import { useModel } from '@umijs/max';

interface AuthItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 权限标识
   */
  auth?: string;
}

/**
 * 带权限的盒子组件
 * @param AuthItemProps
 * @returns auth为`undefined`，则默认为普通div
 */
const AuthItem: React.FC<AuthItemProps> = ({ auth, children, ...props }) => {
  const { initialState } = useModel('@@initialState');

  const { currentUser } = initialState as { currentUser: API.CurrentUser };
  const [IsAuth] = useState<boolean>(() =>
    auth !== undefined ? !!(currentUser?.authButton && currentUser.authButton?.has(auth)) : true,
  );
  return <>{IsAuth ? <div {...props}>{children}</div> : <></>}</>;
};

export default AuthItem;
