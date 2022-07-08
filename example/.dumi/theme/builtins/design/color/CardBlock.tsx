import classNames from 'classnames';
import { MouseEvent } from 'react';
import './color.less';
import { CardBlockProps } from './types';
import { copyColor } from './utils';

function CardBlock(props: CardBlockProps): JSX.Element {
  const { val, textcolor, bg, title, subtitle } = props;
  return (
    <span
      className="__design-color-box-card"
      style={{ backgroundColor: val, color: textcolor }}
      onClick={() => copyColor(val, title)}
    >
      <span className="__design-color-box-card__title">{title}</span>
      <span
        className={classNames(
          '__design-color-box-card__text',
          bg && 'flex-row-reverse',
        )}
      >
        {subtitle ? (
          <span
            className="__design-color-box-card__text-left"
            style={bg ? { color: val } : {}}
          >
            {subtitle}
          </span>
        ) : null}
        <span className="__design-color-box-card__text-right">{val}</span>
      </span>
      {bg ? (
        <span
          className="__design-color-box-card-extra-bg"
          style={{ backgroundColor: subtitle }}
          onClick={(e) => copyExtraColor(subtitle, e)}
        />
      ) : null}
    </span>
  );
}

export { CardBlock };

function copyExtraColor(text: string, evt: MouseEvent) {
  evt.stopPropagation();
  copyColor(text);
}
