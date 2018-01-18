"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var MiniRefresh = require("minirefresh");
require("minirefresh/dist/debug/minirefresh.css");
require("./index.scss");
var minirefresh;
var RefreshControl = /** @class */ (function (_super) {
    __extends(RefreshControl, _super);
    //minirefresh实例
    // public minirefresh: any
    function RefreshControl(props) {
        return _super.call(this, props) || this;
    }
    RefreshControl.prototype.componentDidMount = function () {
        var _a = this.props, down = _a.down, up = _a.up, isLockX = _a.isLockX, isUseBodyScroll = _a.isUseBodyScroll, isScrollBar = _a.isScrollBar;
        minirefresh = new MiniRefresh({
            down: down, up: up, container: '#haina-refresh', isLockX: isLockX, isUseBodyScroll: isUseBodyScroll, isScrollBar: isScrollBar
        });
    };
    //触发下拉刷新
    RefreshControl.triggerDownLoading = function () {
        minirefresh.triggerDownLoading();
    };
    //触发上拉加载
    RefreshControl.triggerUpLoading = function () {
        minirefresh.triggerUpLoading();
    };
    //只有主题实现了success动画并开启时才有效，是否下拉并处理成功，默认为true，为true时会走入成功动画，否则走入失败动画
    //只有主题实现了success动画并开启时才有效，更新新的成功提示，只有传入参数时才会生效
    RefreshControl.endDownLoading = function (isSuccess, successTips) {
        if (isSuccess === void 0) { isSuccess = true; }
        minirefresh.endDownLoading(isSuccess, successTips);
    };
    //默认为false，是否没有更多数据，如果为true，会变为没有更多数据，不能继续加载更多，直到下拉刷新后更新状态或者主动resetUp状态才能继续加载
    RefreshControl.endUpLoading = function (isFinishUp) {
        if (isFinishUp === void 0) { isFinishUp = false; }
        minirefresh.endUpLoading(isFinishUp);
    };
    //重置上拉加载状态,如果是没有更多数据后重置，会变为可以继续上拉加载
    RefreshControl.resetUpLoading = function () {
        minirefresh.resetUpLoading();
    };
    //在特定的时间内，滚动到指定的y位置
    RefreshControl.scrollTo = function (y, duration) {
        minirefresh.scrollTo(y, duration);
    };
    //获取当前的滚动位置
    RefreshControl.getPosition = function () {
        minirefresh.getPosition();
    };
    //	新的配置参数，有一些属性无法更改
    RefreshControl.refreshOptions = function (options) {
        minirefresh.refreshOptions(options);
    };
    RefreshControl.prototype.render = function () {
        var children = this.props.children;
        return (React.createElement("div", { id: "haina-refresh", className: "minirefresh-wrap" },
            React.createElement("div", { className: "minirefresh-scroll" }, children)));
    };
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
            onPull: function () {
            },
            onCalcel: function () {
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
            onScroll: function () {
            }
        },
        isLockX: true,
        isUseBodyScroll: false,
        isScrollBar: true
    };
    return RefreshControl;
}(React.Component));
exports.default = RefreshControl;
