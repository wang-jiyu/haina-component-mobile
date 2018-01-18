import * as React from 'react';
import * as MiniRefresh from 'minirefresh';
import 'minirefresh/dist/debug/minirefresh.css';
import './index.scss';
var minirefresh;
export default class RefreshControl extends React.Component {
    //minirefresh实例
    // public minirefresh: any
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        const { down, up, isLockX, isUseBodyScroll, isScrollBar } = this.props;
        minirefresh = new MiniRefresh({
            down, up, container: '#haina-refresh', isLockX, isUseBodyScroll, isScrollBar
        });
    }
    //触发下拉刷新
    static triggerDownLoading() {
        minirefresh.triggerDownLoading();
    }
    //触发上拉加载
    static triggerUpLoading() {
        minirefresh.triggerUpLoading();
    }
    //只有主题实现了success动画并开启时才有效，是否下拉并处理成功，默认为true，为true时会走入成功动画，否则走入失败动画
    //只有主题实现了success动画并开启时才有效，更新新的成功提示，只有传入参数时才会生效
    static endDownLoading(isSuccess = true, successTips) {
        minirefresh.endDownLoading(isSuccess, successTips);
    }
    //默认为false，是否没有更多数据，如果为true，会变为没有更多数据，不能继续加载更多，直到下拉刷新后更新状态或者主动resetUp状态才能继续加载
    static endUpLoading(isFinishUp = false) {
        minirefresh.endUpLoading(isFinishUp);
    }
    //重置上拉加载状态,如果是没有更多数据后重置，会变为可以继续上拉加载
    static resetUpLoading() {
        minirefresh.resetUpLoading();
    }
    //在特定的时间内，滚动到指定的y位置
    static scrollTo(y, duration) {
        minirefresh.scrollTo(y, duration);
    }
    //获取当前的滚动位置
    static getPosition() {
        minirefresh.getPosition();
    }
    //	新的配置参数，有一些属性无法更改
    static refreshOptions(options) {
        minirefresh.refreshOptions(options);
    }
    render() {
        const { children } = this.props;
        return (React.createElement("div", { id: "haina-refresh", className: "minirefresh-wrap" },
            React.createElement("div", { className: "minirefresh-scroll" }, children)));
    }
}
RefreshControl.defaultProps = {
    down: {
        isLock: false,
        isAuto: false,
        isAways: false,
        isAllowAutoLoading: true,
        isAutoResetUpLoading: true,
        isScrollCssTranslate: true,
        offset: 75,
        dampRateBegin: 1,
        dampRate: 0.3,
        bounceTime: 300,
        successAnim: {
            isEnable: false,
            Number: 300
        },
        onPull: () => {
        },
        onCalcel: () => {
        }
    },
    up: {
        isLock: false,
        isAuto: false,
        isShowUpLoading: false,
        offset: 75,
        loadFull: {
            isEnable: true,
            delay: 300
        },
        onScroll: () => {
        }
    },
    isLockX: true,
    isUseBodyScroll: false,
    isScrollBar: true
};
