/// <reference types="react" />
import * as React from 'react';
interface IDialogPropTypes {
    className?: string;
    dialogclassName?: string;
    style?: {};
    mask?: boolean;
    children?: any;
    afterClose?: () => void;
    onClose?: (e: any) => void;
    closable?: boolean;
    maskClosable?: boolean;
    visible?: boolean;
    title?: React.ReactNode;
    footer?: React.ReactNode;
    transitionName?: string;
    maskTransitionName?: string;
    animation?: any;
    maskAnimation?: any;
    wrapStyle?: {};
    bodyStyle?: {};
    maskStyle?: {};
    prefixCls?: string;
    wrapClassName?: string;
    onAnimateLeave?: () => void;
    zIndex?: number;
    wrapProps?: any;
}
export default IDialogPropTypes;
