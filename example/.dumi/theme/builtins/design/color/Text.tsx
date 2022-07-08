import React from 'react';
import { TextProps } from './types';
import { copyColor } from './utils';

export function Text(props: TextProps): JSX.Element {
  const { val, children } = props;
  return (
    <span
      style={{ color: val, cursor: 'pointer' }}
      onClick={() => copyColor(val)}
    >
      {children || val}
    </span>
  );
}
