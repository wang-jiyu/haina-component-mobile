/// <reference types="react" />
import * as React from 'react';
import { TabsProps, TabItemProps } from './PropsType';
import './index.scss';
export declare class Item extends React.Component<TabItemProps, any> {
    render(): JSX.Element;
}
export default class Tabs extends React.PureComponent<TabsProps, any> {
    static Item: typeof Item;
    static defaultProps: {
        tabActive: number;
    };
    constructor(props: any);
    componentDidMount(): void;
    componentWillReceiveProps(newProps: any): void;
    getChildrens(children?: React.ReactNode): {
        title: string;
        ItemContainerClass?: string | object | string[];
    }[];
    setActive(index: number, e?: any): void;
    _getMenuItems(): JSX.Element;
    _getSelectedPanel(): JSX.Element;
    render(): JSX.Element;
}
