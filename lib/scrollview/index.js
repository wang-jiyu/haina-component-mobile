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
define(["require", "exports", "react", "classnames", "./loadmore-component/LoadMore", "./refresh-component/Refresh", "./fn/before", "./index.scss"], function (require, exports, React, classNames, LoadMore_1, Refresh_1, before_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function isIphone() {
        return /iphone/i.test(window.navigator.userAgent);
    }
    var ScrollView = (function (_super) {
        __extends(ScrollView, _super);
        function ScrollView(props) {
            var _this = _super.call(this, props) || this;
            _this.startYPos = 0;
            _this.prevYPos = 0;
            _this.rootDom = null;
            _this.refreshDom = null;
            _this.scrollTarget = null;
            _this.isRefreshing = true;
            _this.isPulling = false;
            _this.state = {
                translateY: 0,
                transition: false,
                topPosition: 100,
                isLoadingMore: false
            };
            function disableRefreshBefore() {
                return !this.props.disableRefresh;
            }
            _this.onTouchStart = before_1.default(disableRefreshBefore, _this.onTouchStart).bind(_this);
            _this.onTouchMove = before_1.default(disableRefreshBefore, _this.onTouchMove).bind(_this);
            _this.onTouchEnd = before_1.default(disableRefreshBefore, _this.onTouchEnd).bind(_this);
            _this.onScroll = before_1.default(function () {
                return !this.props.disableInfiniteScroll;
            }, _this.onScroll).bind(_this);
            return _this;
        }
        ScrollView.prototype.componentDidMount = function () {
            this.rootDom.addEventListener('touchmove', this.onTouchMove, false);
            this.setState({
                topPosition: -this.refreshDom.clientHeight
            });
            if (this.props.useWindowScroll) {
                this.listendScroll(window);
            }
            else {
                this.listendScroll(this.rootDom);
            }
        };
        ScrollView.prototype.componentWillUnmount = function () {
            this.scrollTarget.removeEventListener('scroll', this.onScroll);
        };
        ScrollView.prototype.isDragDown = function (prevY, curY) {
            return curY - prevY > 0;
        };
        ScrollView.prototype.onTouchStart = function (e) {
            this.startYPos = this.prevYPos = e.touches[0].pageY;
        };
        ScrollView.prototype.onTouchMove = function (e) {
            if (this.isRefreshing)
                return;
            var curYpos = e.touches[0].pageY;
            var scrollTop = this.rootDom.scrollTop;
            if ((scrollTop === 0 && this.isDragDown(this.prevYPos, curYpos)) || this.isPulling) {
                e.preventDefault();
                this.setState({
                    translateY: this.calcDistance(curYpos - this.startYPos),
                    transition: false
                });
                this.isPulling = true;
            }
            this.prevYPos = curYpos;
        };
        ScrollView.prototype.onTouchEnd = function () {
            if (this.isRefreshing)
                return;
            if (this.shouldRefresh) {
                this.refresh();
            }
            else {
                this.resetPosition();
            }
            this.isPulling = false;
        };
        ScrollView.prototype.onScroll = function () {
            var _this = this;
            var state = this.state;
            var props = this.props;
            if (state.isLoadingMore)
                return;
            if (this.arriveBottom()) {
                this.setState({
                    isLoadingMore: true
                });
                props.loadMore()
                    .then(function () { return _this.setState({
                    isLoadingMore: false
                }); });
            }
        };
        ScrollView.prototype.arriveBottom = function () {
            var props = this.props;
            var target = this.scrollTarget;
            var visibleHeight = props.useWindowScroll ? window.innerHeight : target.clientHeight;
            var scrollTop = props.useWindowScroll ? window.pageYOffset : target.scrollTop;
            var scrollHeight = props.useWindowScroll ? document.documentElement.scrollHeight : target.scrollHeight;
            return (scrollHeight - (scrollTop + visibleHeight) <= props.threshold);
        };
        ScrollView.prototype.calcDistance = function (distance) {
            return distance / 3;
        };
        Object.defineProperty(ScrollView.prototype, "shouldRefresh", {
            get: function () {
                return this.state.translateY >= this.refreshDom.clientHeight;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ScrollView.prototype, "progress", {
            get: function () {
                if (this.refreshDom) {
                    return Math.min(this.state.translateY / this.refreshDom.clientHeight * 100, 100);
                }
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        ScrollView.prototype.refresh = function (transition) {
            var _this = this;
            if (transition === void 0) { transition = true; }
            var props = this.props;
            this.setState({
                translateY: this.refreshDom.clientHeight,
                transition: transition
            });
            this.isRefreshing = true;
            props
                .refresh()
                .then(function () {
                _this.resetPosition();
                _this.isRefreshing = false;
            });
        };
        ScrollView.prototype.resetPosition = function () {
            this.setState({
                translateY: 0,
                transition: true
            });
        };
        ScrollView.prototype.listendScroll = function (target) {
            this.scrollTarget = target;
            target.addEventListener('scroll', this.onScroll);
        };
        ScrollView.prototype.render = function () {
            var _this = this;
            var props = this.props;
            var state = this.state;
            var height = props.height;
            return (React.createElement("div", { className: classNames('haina-view-component', props.className), ref: function (ref) { return _this.rootDom = ref; }, onTouchStart: this.onTouchStart, onTouchEnd: this.onTouchEnd, style: { height: height } },
                React.createElement("div", { ref: function (ref) { return _this.refreshDom = ref; }, className: classNames('haina-view-component__refresh', {
                        'ease-out-transion': state.transition,
                        active: state.translateY > 0,
                    }), style: {
                        transform: "translateY(" + state.translateY + "px)",
                        WebkitTransform: "translateY(" + state.translateY + "px)",
                        top: state.topPosition + "px"
                    } }, props.disableRefresh ? null :
                    React.createElement(props.refreshComponent, {
                        isRefreshing: this.isRefreshing,
                        progress: this.progress
                    })),
                React.createElement("div", { className: classNames('haina-view-component__content', {
                        'ease-out-transion': state.transition
                    }), style: {
                        transform: "translateY(" + state.translateY + "px)",
                        WebkitTransform: "translateY(" + state.translateY + "px)"
                    } },
                    props.children,
                    state.isLoadingMore ? React.createElement(props.loadMoreComponent) : null)));
        };
        ScrollView.defaultProps = {
            threshold: 10,
            useWindowScroll: false,
            disableInfiniteScroll: false,
            disableRefresh: false,
            refresh: function () { return Promise.resolve(); },
            loadMore: function () { return Promise.resolve(); },
            refreshComponent: LoadMore_1.default,
            loadMoreComponent: Refresh_1.default
        };
        return ScrollView;
    }(React.Component));
    exports.default = ScrollView;
});
