import './color.less';
import { LongBlockContainerProps, LongBlockProps } from './types';
import { copyColor } from './utils';

function LongBlock(props: LongBlockProps): JSX.Element {
  return (
    <span
      className="__design-color-box-long"
      style={{ backgroundColor: props.val, color: props.textcolor }}
      onClick={() => copyColor(props.val, props.title)}
    >
      <span className="__design-color-box-long__title">{props.title}</span>
      <span className="__design-color-box-long__text">{props.val}</span>
    </span>
  );
}

const defaultProps: LongBlockProps = {
  textcolor: '#fff',
  title: '',
  val: '',
};

LongBlock.defaultProps = defaultProps;

export function LongBlockContainer(props: LongBlockContainerProps) {
  return (
    <span className="__design-color-box-long-container">
      <span className="__design-color-box-long-container__title">
        {props.title}
      </span>
      {props.children}
    </span>
  );
}

export { LongBlock };
