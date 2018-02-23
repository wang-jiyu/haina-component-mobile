/// <reference types="react" />
import * as React from 'react';
import './scroll.scss';
export interface IScrollProps {
    probeType?: number;
    click?: boolean;
    listenScroll?: boolean;
    listenBeforeScroll?: boolean;
    direction?: string;
    scrollbar?: boolean | {
        fade?: boolean;
        interactive?: boolean;
    };
    pullDownRefresh?: boolean | {
        threshold?: number;
        stop?: number;
        stopTime?: number;
        txt?: string;
    };
    pullUpLoad?: boolean | {
        threshold?: number;
        txt?: {
            more?: string;
            noMore?: string;
        };
    };
    startY?: number;
    refreshDelay?: number;
    freeScroll?: boolean;
    mouseWheel?: boolean | {
        speed?: number;
        invert?: boolean;
    };
    scroll?: Function;
    beforeScrollStart?: Function;
    pullingDown?: Function;
    pullingUp?: Function;
    clickItem?: Function;
}
export default class Scroll extends React.Component<IScrollProps, any> {
    static defaultProps: {
        probeType: number;
        click: boolean;
        listenScroll: boolean;
        listenBeforeScroll: boolean;
        direction: string;
        scrollbar: boolean;
        pullDownRefresh: boolean;
        pullUpLoad: boolean;
        startY: number;
        refreshDelay: number;
        freeScroll: boolean;
        mouseWheel: boolean;
    };
    state: {
        beforePullDown: boolean;
        isRebounding: boolean;
        isPullingDown: boolean;
        isPullUpLoad: boolean;
        pullUpDirty: boolean;
        pullDownStyle: {};
        bubbleY: number;
    };
    ratio: number;
    pullDownInitTop: number;
    scroll: any;
    componentDidMount(): void;
    componentDidUpdate(prevProps: any, prevState: any): void;
    pullUpTxt(): any;
    refreshTxt(): any;
    initScroll(): void;
    _initPullDownRefresh(): void;
    _initPullUpLoad(): void;
    disable(): void;
    enable(): void;
    refresh(): void;
    scrollTo(): void;
    scrollToElement(): void;
    clickItem(e: any, item: any): void;
    destroy(): void;
    forceUpdate(dirty: any): Promise<void>;
    _reboundPullDown(): Promise<{}>;
    _afterPullDown(): void;
    render(): JSX.Element;
}
