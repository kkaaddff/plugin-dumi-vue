import 'antd/es/message/style/index';
import './color.less';
import { ColorBaseProps, SquareBlockProps } from './types';
import { copyColor } from './utils';

export function SquareBlock(props: SquareBlockProps): JSX.Element {
  return (
    <span
      className="__design-color-box-square"
      style={{ color: props.textcolor, backgroundColor: props.val }}
      onClick={() => copyColor(props.val, props.title)}
    >
      <span className="__design-color-box-square__title">{props.title}</span>
      <span className="__design-color-box-square__text">{props.val}</span>
    </span>
  );
}

export function SquareBlockContainer(props: ColorBaseProps): JSX.Element {
  return (
    <span className="__design-color-box-square-container">
      {props.children}
    </span>
  );
}
