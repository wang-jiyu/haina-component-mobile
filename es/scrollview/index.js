define(["require", "exports", "react", "classnames", "./loadmore-component/LoadMore", "./refresh-component/Refresh", "./fn/before", "./rlist-view.css"], function (require, exports, React, classnames_1, LoadMore_1, Refresh_1, before_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function isIphone() {
        return /iphone/i.test(window.navigator.userAgent);
    }
    class ScrollView extends React.Component {
        constructor(props) {
            super(props);
            this.startYPos = 0;
            this.prevYPos = 0;
            this.rootDom = null;
            this.refreshDom = null;
            this.scrollTarget = null;
            this.isRefreshing = true;
            this.isPulling = false;
            this.state = {
                translateY: 0,
                transition: false,
                topPosition: 100,
                isLoadingMore: false
            };
            function disableRefreshBefore() {
                return !this.props.disableRefresh;
            }
            this.onTouchStart = before_1.default(disableRefreshBefore, this.onTouchStart).bind(this);
            this.onTouchMove = before_1.default(disableRefreshBefore, this.onTouchMove).bind(this);
            this.onTouchEnd = before_1.default(disableRefreshBefore, this.onTouchEnd).bind(this);
            this.onScroll = before_1.default(function () {
                return !this.props.disableInfiniteScroll;
            }, this.onScroll).bind(this);
        }
        componentDidMount() {
            this.rootDom.addEventListener('touchmove', this.onTouchMove, false);
            this.setState({
                topPosition: -this.refreshDom.clientHeight
            });
            this.refresh(false);
            if (this.props.useWindowScroll) {
                this.listendScroll(window);
            }
            else {
                this.listendScroll(this.rootDom);
            }
        }
        isDragDown(prevY, curY) {
            return curY - prevY > 0;
        }
        onTouchStart(e) {
            this.startYPos = this.prevYPos = e.touches[0].pageY;
        }
        onTouchMove(e) {
            if (this.isRefreshing)
                return;
            const curYpos = e.touches[0].pageY;
            const scrollTop = this.rootDom.scrollTop;
            if ((scrollTop === 0 && this.isDragDown(this.prevYPos, curYpos)) || this.isPulling) {
                e.preventDefault();
                this.setState({
                    translateY: this.calcDistance(curYpos - this.startYPos),
                    transition: false
                });
                this.isPulling = true;
            }
            this.prevYPos = curYpos;
        }
        onTouchEnd() {
            if (this.isRefreshing)
                return;
            if (this.shouldRefresh) {
                this.refresh();
            }
            else {
                this.resetPosition();
            }
            this.isPulling = false;
        }
        onScroll() {
            const state = this.state;
            const props = this.props;
            if (state.isLoadingMore)
                return;
            if (this.arriveBottom()) {
                this.setState({
                    isLoadingMore: true
                });
                props.loadMore()
                    .then(() => this.setState({
                    isLoadingMore: false
                }));
            }
        }
        arriveBottom() {
            const props = this.props;
            const target = this.scrollTarget;
            const visibleHeight = props.useWindowScroll ? window.innerHeight : target.clientHeight;
            const scrollTop = props.useWindowScroll ? window.pageYOffset : target.scrollTop;
            const scrollHeight = props.useWindowScroll ? document.documentElement.scrollHeight : target.scrollHeight;
            return (scrollHeight - (scrollTop + visibleHeight) <= props.threshold);
        }
        calcDistance(distance) {
            return distance / 3;
        }
        get shouldRefresh() {
            return this.state.translateY >= this.refreshDom.clientHeight;
        }
        get progress() {
            if (this.refreshDom) {
                return Math.min(this.state.translateY / this.refreshDom.clientHeight * 100, 100);
            }
            return 0;
        }
        refresh(transition = true) {
            const props = this.props;
            this.setState({
                translateY: this.refreshDom.clientHeight,
                transition
            });
            this.isRefreshing = true;
            props
                .refresh()
                .then(() => {
                this.resetPosition();
                this.isRefreshing = false;
            });
        }
        resetPosition() {
            this.setState({
                translateY: 0,
                transition: true
            });
        }
        listendScroll(target) {
            this.scrollTarget = target;
            target.addEventListener('scroll', this.onScroll);
        }
        render() {
            const props = this.props;
            const state = this.state;
            const { className } = props;
            return (React.createElement("div", { className: classnames_1.default('haina-view-component', {
                    className
                }), ref: ref => this.rootDom = ref, onTouchStart: this.onTouchStart, onTouchEnd: this.onTouchEnd },
                React.createElement("div", { ref: ref => this.refreshDom = ref, className: classnames_1.default('haina-view-component__refresh', {
                        'ease-out-transion': state.transition,
                        active: state.translateY > 0,
                    }), style: {
                        transform: `translateY(${state.translateY}px)`,
                        WebkitTransform: `translateY(${state.translateY}px)`,
                        top: `${state.topPosition}px`
                    } }, props.disableRefresh ? null :
                    React.createElement(props.refreshComponent, {
                        isRefreshing: this.isRefreshing,
                        progress: this.progress
                    })),
                React.createElement("div", { className: classnames_1.default('haina-view-component__content', {
                        'ease-out-transion': state.transition
                    }), style: {
                        transform: `translateY(${state.translateY}px)`,
                        WebkitTransform: `translateY(${state.translateY}px)`
                    } },
                    props.children,
                    state.isLoadingMore ? React.createElement(props.loadMoreComponent) : null)));
        }
    }
    ScrollView.defaultProps = {
        threshold: 10,
        useWindowScroll: false,
        disableInfiniteScroll: false,
        disableRefresh: false,
        refresh: () => Promise.resolve(),
        loadMore: () => Promise.resolve(),
        refreshComponent: LoadMore_1.default,
        loadMoreComponent: Refresh_1.default
    };
    exports.default = ScrollView;
});
