/// <reference types="react" />
import * as React from 'react';
import './index.scss';
import IScrollViewProps from './PropsType';
import LoadMore from './loadmore-component/LoadMore';
import Refresh from './refresh-component/Refresh';
export default class ScrollView extends React.Component<IScrollViewProps, any> {
    static defaultProps: {
        threshold: number;
        useWindowScroll: boolean;
        disableInfiniteScroll: boolean;
        disableRefresh: boolean;
        refresh: () => Promise<any>;
        loadMore: () => Promise<any>;
        refreshComponent: typeof LoadMore;
        loadMoreComponent: typeof Refresh;
    };
    startYPos: number;
    prevYPos: number;
    rootDom: any;
    refreshDom: any;
    scrollTarget: any;
    isRefreshing: any;
    isPulling: any;
    constructor(props: any);
    componentDidMount(): void;
    componentWillUnmount(): void;
    isDragDown(prevY: any, curY: any): boolean;
    onTouchStart(e: any): void;
    onTouchMove(e: any): void;
    onTouchEnd(): void;
    onScroll(): void;
    arriveBottom(): boolean;
    calcDistance(distance: any): number;
    readonly shouldRefresh: boolean;
    readonly progress: number;
    refresh(transition?: boolean): void;
    resetPosition(): void;
    listendScroll(target: any): void;
    render(): JSX.Element;
}
