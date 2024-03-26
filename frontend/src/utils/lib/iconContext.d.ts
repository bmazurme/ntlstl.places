/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-redeclare */
import { Context } from 'react';

export interface IconContext {
    color?: string;
    size?: string;
    className?: string;
    style?: React.CSSProperties;
    attr?: React.SVGAttributes<SVGElement>;
}
export declare const DefaultContext: IconContext;
export declare const IconContext: Context<IconContext>;
