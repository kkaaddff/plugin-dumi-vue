import React from 'react';
import { About } from './design/About';

interface DesignProps {
  type: 'About';
}

const DesignSet = {
  About,
};
/**
 * 设计模块
 * @param props
 * @returns
 */
export default function Design(props: DesignProps): JSX.Element {
  const Component = DesignSet[props.type];
  return Component ? <Component /> : <></>;
}
