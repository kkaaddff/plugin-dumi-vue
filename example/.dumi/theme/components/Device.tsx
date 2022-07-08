import { Tooltip } from 'antd';
import 'antd/es/image/style/index';
import 'antd/es/tooltip/style/index';
import { context, usePrefersColor } from 'dumi/theme';
import QRCode from 'qrcode.react';
import type { FC } from 'react';
import { useContext, useEffect, useState } from 'react';
import './device.less';

interface IDeviceProps {
  className?: string;
  url: string;
}

export const Device: FC<IDeviceProps> = ({ url, className }) => {
  const [renderKey, setRenderKey] = useState(Math.random());

  const [color] = usePrefersColor();
  const {
    config: { mode, theme },
  } = useContext(context);

  useEffect(() => {
    setRenderKey(Math.random());
  }, [color]);

  return (
    <div className={'adm-doc-device'} data-device-type="iOS" data-mode={mode}>
      <iframe title="dumi-previewer" src={url} key={renderKey} />
      <div className="adm-doc-device-action">
        <Tooltip title="刷新预览" placement="bottom">
          <button
            className="__dumi-default-icon"
            role="refresh"
            onClick={() => setRenderKey(Math.random())}
          />
        </Tooltip>
        <Tooltip title="浏览器扫一扫" placement="bottom">
          <button
            className="__dumi-default-icon __dumi-default-icon-mini"
            role="qrcode-h5"
          >
            <QRCode value={url} size={96} />
          </button>
        </Tooltip>
        <Tooltip title="新窗口打开" placement="bottom">
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="__dumi-default-icon"
            role="open-demo"
          />
        </Tooltip>
      </div>
    </div>
  );
};
