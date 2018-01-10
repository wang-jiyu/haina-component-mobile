/// <reference types="react" />
import * as React from 'react';
import './style/notice.scss';
export interface INoticeProps {
    duration: number;
    content: any;
    onClose: Function;
    type: 'info' | 'success' | 'warning' | 'error';
    prefixCls: string;
    iconClass: string;
}
declare class Notice extends React.Component<INoticeProps, any> {
    static defaultProps: {
        prefixCls: string;
        duration: number;
    };
    closeTimer: any;
    timer: any;
    constructor(props: any);
    componentDidMount(): void;
    componentWillUnmount(): void;
    clearCloseTimer(): void;
    close(): void;
    render(): JSX.Element;
}
export default Notice;
