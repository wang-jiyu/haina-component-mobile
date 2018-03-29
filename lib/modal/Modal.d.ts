/// <reference types="react" />
import * as React from 'react';
import { Action, ModalComponent, ModalPropsType } from './PropsType';
import './style/index.scss';
export interface ModalProps extends ModalPropsType {
    prefixCls?: string;
    transitionName?: string;
    maskTransitionName?: string;
    className?: string;
    wrapClassName?: string;
    wrapProps?: Partial<React.HTMLProps<HTMLDivElement>>;
    style?: React.CSSProperties;
    bodyStyle?: React.CSSProperties;
}
export default class Modal extends ModalComponent<ModalProps, any> {
    static defaultProps: {
        prefixCls: string;
        transparent: boolean;
        popup: boolean;
        animationType: string;
        animated: boolean;
        style: {};
        onShow(): void;
        footer: any[];
        closable: boolean;
        operation: boolean;
    };
    renderFooterButton(button: Action, prefixCls: string | undefined, i: number): JSX.Element;
    render(): JSX.Element;
}
