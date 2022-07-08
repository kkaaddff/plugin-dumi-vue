import { ReactNode } from 'react';

export const TYPES = [
  'text', // 字体颜色
  // FTA View
  '_primary', // 平台主色
  '_basicContainer',
  '_basic', // 基础色板
  '_neutralContainer',
  '_neutral', // 中性色
  // 满帮集团规范色
  'primary', // 平台主色
  'basicContainer',
  'basic', // 基础色板
  'neutral', // 中性色
  'neutralApp',
  'swatches',
] as const;

export type ColorType = typeof TYPES[number];

export interface ColorBaseProps {
  children?: ReactNode;
  [key: string]: unknown;
}

export interface ColorProps extends ColorBaseProps {
  type: ColorType;
}

export interface TextProps extends ColorBaseProps {
  val: string;
}

export interface LargeBlockProps extends ColorBaseProps {
  title: string;
  val: string;
  className: string;
  /**
   * 文字颜色
   * @default '#fff'
   */
  textcolor?: string;
}

export interface SquareBlockProps extends ColorBaseProps {
  title: string;
  /**
   * 文字颜色
   * @default '#fff'
   */
  textcolor: string;
  val: string;
}

export interface LongBlockProps extends SquareBlockProps {}

export interface LongBlockContainerProps extends ColorBaseProps {
  title: string;
}

export interface CardBlockProps extends SquareBlockProps {
  subtitle: string;
  bg: string;
}
