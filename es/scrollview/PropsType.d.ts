export interface ILazyLoad {
    ref: any;
    lazyload: Function;
    threshold: number;
    loaded: boolean;
}
export default interface IScrollViewProps {
    element?: string;
    height?: number;
    refresh?: Function;
    loadMore?: Function;
    refreshComponent?: any;
    loadMoreComponent?: any;
    loader?: any;
    pageStart?: number;
    threshold?: number;
    useCapture?: boolean;
    useWindow?: boolean;
    hasMore?: boolean;
    initialLoad?: boolean;
    isReverse?: boolean;
    className?: Array<string> | string | object;
    ref?: any;
    loading?: boolean;
}
export interface IRefreshProps {
    isRefreshing: boolean;
    progress: number;
}
