import { FC, useState } from 'react';
import { Button } from 'antd';
import { useRive } from '@rive-app/react-canvas';

interface SimpleProps {
  src: string;
}

const Simple: FC<SimpleProps> = ({ src }) => {
  const { rive, RiveComponent } = useRive({
    src,
    autoplay: true,
  });
  const [isPlaying, setIsPlaying] = useState(true);

  const togglePlaying = () => {
    if (isPlaying) {
      rive && rive.pause();
      setIsPlaying(false);
    } else {
      rive && rive.play();
      setIsPlaying(true);
    }
  };
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ height: 160, width: 400 }}>
        <RiveComponent />
      </div>
      <Button onClick={togglePlaying}>{isPlaying ? '暂停' : '开始'}</Button>
    </div>
  );
};

export default Simple;
