import { useDemoUrl } from 'dumi/theme';
import React from 'react';
import { Device } from '../components/device';
import type { IPreviewerProps } from './preview-default/Previewer';
import Previewer from './preview-default/Previewer';
import './Previewer.less';

export const ACTIVE_MSG_TYPE = 'dumi:scroll-into-demo';

export default (props: IPreviewerProps) => {
  const ip = process.env.LOCAL_IP;
  let builtinDemoUrl = useDemoUrl(props.identifier);
  // 开发环境使用内网IP预览
  if (process.env.NODE_ENV === 'development' && ip) {
    builtinDemoUrl =
      builtinDemoUrl.replace(/localhost|127.0.0.1/, ip) + '?immersive=true';
  }

  return (
    <div className="adm-doc-previewer">
      <div className="adm-doc-previewer-source">
        <Previewer {...props} />
      </div>
      <div className="adm-doc-previewer-device">
        <Device url={props.demoUrl ?? builtinDemoUrl} />
      </div>
    </div>
  );
};
