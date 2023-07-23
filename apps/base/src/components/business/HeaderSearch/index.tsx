import { SearchOutlined } from '@ant-design/icons';
import { useKeyPress } from 'ahooks';
import { Tooltip } from 'antd';
import { useState } from 'react';
import { history } from '@umijs/max';
import SearchModal from '../SearchModal';

const HeaderSearch = ({ className }: { className: string }) => {
  const [isShow, setIsShow] = useState(false);

  useKeyPress('ESC', () => {
    if (isShow) setIsShow(false);
  });

  useKeyPress(
    ['alt.s'],
    () => {
      setIsShow(!isShow);
    },
    {
      exactMatch: true,
    },
  );
  return (
    <div className={className} onClick={() => setIsShow(true)}>
      <Tooltip title="搜索">
        <SearchOutlined style={{ fontSize: 16 }} />
      </Tooltip>
      <SearchModal
        isShow={isShow}
        onEnter={(val) => {
          history.push(val.menuUrl);
          setIsShow(false);
        }}
      />
    </div>
  );
};

export default HeaderSearch;
