/// <reference types="react" />
import * as React from 'react';
import './style/notification.scss';
declare class Notification extends React.Component<any, any> {
    static reWrite: () => {
        notice(noticeProps: any): void;
        removeNotice(key: any): void;
        destroy(): void;
        component: void | Element | React.Component<any, React.ComponentState>;
    };
    constructor(props: any);
    add(notice: any): void;
    remove(key: any): void;
    getNoticeDOM(): any[];
    getMaskDOM(): JSX.Element;
    render(): JSX.Element;
}
export default Notification;
