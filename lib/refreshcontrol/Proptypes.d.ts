export interface DownProps {
    isLock?: boolean;
    isAuto?: boolean;
    isAways?: boolean;
    isAllowAutoLoading?: boolean;
    isAutoResetUpLoading?: boolean;
    isScrollCssTranslate?: boolean;
    offset?: number;
    dampRateBegin?: number;
    dampRate?: number;
    bounceTime?: number;
    successAnim?: {
        isEnable?: boolean;
        duration?: boolean;
    };
    onPull?: Function;
    onCalcel?: Function;
    callback: Function;
}
export interface UpProps {
    isLock?: boolean;
    isAuto?: boolean;
    isShowUpLoading?: boolean;
    offset?: number;
    loadFull?: {
        isEnable?: boolean;
        delay?: number;
    };
    onScroll?: Function;
    callback: Function;
}
export default interface IRefreshProps {
    down: DownProps;
    up: UpProps;
    isLockX?: boolean;
    isUseBodyScroll?: boolean;
    isScrollBar?: boolean;
    className?: string | Array<string>;
}
