import classNames from 'classnames';
import { ReactNode } from 'react';
import './design/border/border.less';

interface BorderProps {
  position: string;
  type: string;
  title?: string;
  children?: ReactNode;
  color?: string;
}

function Border(props: BorderProps): JSX.Element {
  const { type, position, children, title, color } = props;
  if (!type) {
    const rootClz = position
      .split(',')
      .map((p) => `__design-border--${p}`)
      .join(' ');
    return <span className={classNames('__design-border', rootClz)}></span>;
  }
  if (type === 'container')
    return (
      <span className="__design-border-colored-container">{children}</span>
    );
  return (
    <span className="__design-border-colored">
      <span
        className="__design-border-colored__block"
        style={{ borderColor: color }}
      />
      <span className="__design-border-colored__text">{title}</span>
    </span>
  );
}

export default Border;
