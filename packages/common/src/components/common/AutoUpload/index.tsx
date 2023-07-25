import { FC, useState } from 'react';
import React from 'react';
import { message, Spin } from 'antd';
import { LFormItemUpload, LFormItemUploadProps } from 'lighting-design';
import globalConfig from '@/global';
import { USER_TOKEN } from '@/constants';
import { UploadChangeParam, UploadFile } from 'antd/es/upload';

interface LFormItemAutoUploadProps extends LFormItemUploadProps {
  onDoneChange: (file: UploadFile<API.HttpResult<API.UploadFile>>) => void;
}

/**
 * 静态值选择组件，适用查询条件，表单中使用，可赋初始值。 传入propCode
 * 数据缓存：每个类型的值只请求一次
 * @param StaticSelectProps
 * @returns
 */

const LFormItemAutoUpload: FC<LFormItemAutoUploadProps> = ({ onDoneChange, ...restProps }) => {
  const [loading, setLoading] = useState<boolean>(false);

  // 内容改变事件
  const handleChange = (info: UploadChangeParam<UploadFile<API.HttpResult<API.UploadFile>>>) => {
    const { file } = info;
    if (file.status === 'uploading') {
      setLoading(true);
    }
    if (file.status === 'done') {
      setLoading(false);
      onDoneChange && onDoneChange(file);
    } else if (info.file.status === 'error') {
      setLoading(false);
      message.error('上传失败');
    }
  };

  return (
    <Spin spinning={loading}>
      <LFormItemUpload
        label="上传"
        name="file"
        action={`${globalConfig.Api}${globalConfig.UploadUrl}`}
        {...restProps}
        uploadProps={{
          name: 'file',
          headers: { token: sessionStorage.getItem(USER_TOKEN) as string },
          onChange: handleChange,
          ...restProps.uploadProps,
        }}
      />
    </Spin>
  );
};

export default LFormItemAutoUpload;
