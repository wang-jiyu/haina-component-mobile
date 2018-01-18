/// <reference types="react" />
import * as React from 'react';
import 'minirefresh/dist/debug/minirefresh.css';
import IRefreshProps from './Proptypes';
import './index.scss';
export default class RefreshControl extends React.Component<IRefreshProps, any> {
    static defaultProps: {
        down: {
            isLock: boolean;
            isAuto: boolean;
            isAways: boolean;
            isAllowAutoLoading: boolean;
            isAutoResetUpLoading: boolean;
            isScrollCssTranslate: boolean;
            offset: number;
            dampRateBegin: number;
            dampRate: number;
            bounceTime: number;
            successAnim: {
                isEnable: boolean;
                Number: number;
            };
            onPull: () => void;
            onCalcel: () => void;
        };
        up: {
            isLock: boolean;
            isAuto: boolean;
            isShowUpLoading: boolean;
            offset: number;
            loadFull: {
                isEnable: boolean;
                delay: number;
            };
            onScroll: () => void;
        };
        isLockX: boolean;
        isUseBodyScroll: boolean;
        isScrollBar: boolean;
    };
    constructor(props: any);
    componentDidMount(): void;
    static triggerDownLoading(): void;
    static triggerUpLoading(): void;
    static endDownLoading(isSuccess?: boolean, successTips?: string): void;
    static endUpLoading(isFinishUp?: boolean): void;
    static resetUpLoading(): void;
    static scrollTo(y: number, duration: number): void;
    static getPosition(): void;
    static refreshOptions(options: IRefreshProps): void;
    render(): JSX.Element;
}
