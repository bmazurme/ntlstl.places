/* eslint-disable import/no-extraneous-dependencies */
import { SVGAttributes, ReactNode, JSX } from 'react';

export interface IconTree {
    tag: string;
    attr: {
        [key: string]: string;
    };
    child: IconTree[];
}
export interface IconBaseProps extends SVGAttributes<SVGElement> {
  children?: ReactNode;
  size?: string | number;
  color?: string;
  title?: string;
}
export declare function GenIcon(data: IconTree): (props: IconBaseProps) => JSX.Element;
export type IconType = (props: IconBaseProps) => JSX.Element;
export declare function IconBase(props: IconBaseProps & {
    attr?: Record<string, string>;
}): JSX.Element;
