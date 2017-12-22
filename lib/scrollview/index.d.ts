/// <reference types="react" />
import * as React from 'react';
import './index.scss';
import IScrollViewProps from './PropsType';
export default class ScrollView extends React.Component<IScrollViewProps, any> {
    static defaultProps: {
        element: string;
        threshold: number;
        hasMore: boolean;
        initialLoad: boolean;
        pageStart: number;
        useWindow: boolean;
        isReverse: boolean;
        useCapture: boolean;
        loader: any;
    };
    constructor(props: any);
    private pageLoaded;
    private defaultLoader;
    private scrollComponent;
    componentDidMount(): void;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
    setDefaultLoader(loader: any): void;
    detachMousewheelListener(): void;
    detachScrollListener(): void;
    attachScrollListener(): void;
    mousewheelListener(e: any): void;
    scrollListener(): void;
    calculateTopPosition(el: any): any;
    render(): React.ReactElement<{
        className: string | object | string[];
        ref: (ref: Element) => Element;
    }>;
}
