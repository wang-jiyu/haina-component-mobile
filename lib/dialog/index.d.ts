/// <reference types="react" />
import * as React from 'react';
import IDialogPropTypes from './IDialogPropTypes';
import './dialog.scss';
import './mask.scss';
export default class DialogWrap extends React.Component<IDialogPropTypes, any> {
    static defaultProps: {
        visible: boolean;
        prefixCls: string;
        onClose: () => void;
    };
    _component: any;
    container: any;
    componentDidMount(): void;
    shouldComponentUpdate({visible}: {
        visible: any;
    }): boolean;
    componentWillUnmount(): void;
    componentDidUpdate(): void;
    saveRef: (node: any) => void;
    getComponent: (visible: any) => JSX.Element;
    removeContainer: () => void;
    getContainer: () => any;
    renderDialog(visible: any): void;
    render(): any;
}
