export default interface IScrollViewProps {
    height?: number;
    refresh?: Function;
    loadMore?: Function;
    refreshComponent?: any;
    loadMoreComponent?: any;
    threshold?: number;
    useWindowScroll?: boolean;
    disableInfiniteScroll?: boolean;
    disableRefresh?: boolean;
    className?: Array<string> | string | object;
}
export interface IRefreshProps {
    isRefreshing: boolean;
    progress: number;
}
