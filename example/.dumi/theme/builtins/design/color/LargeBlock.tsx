import classNames from 'classnames';
import './color.less';
import { LargeBlockProps } from './types';
import { copyColor } from './utils';

function LargeBlock(props: LargeBlockProps): JSX.Element {
  return (
    <span
      className={classNames('__design-color-box-large', props.className)}
      style={{ backgroundColor: props.val, color: props.textcolor }}
      onClick={() => copyColor(props.val)}
    >
      <span className="__design-color-box-large__title">{props.title}</span>
      <span className="__design-color-box-large__text">{props.val}</span>
    </span>
  );
}

const defaultProps: LargeBlockProps = {
  className: null,
  title: '',
  val: '',
  textcolor: '#fff',
};

LargeBlock.defaultProps = defaultProps;

export { LargeBlock };
