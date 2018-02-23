var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as React from 'react';
import BScroll from 'better-scroll/src';
import Bubble from '../bubble';
import Loading from '../loading';
import { getRect } from '../common/dom';
import './scroll.scss';
const COMPONENT_NAME = 'scroll';
const DIRECTION_H = 'horizontal';
const DIRECTION_V = 'vertical';
export default class Scroll extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            beforePullDown: true,
            isRebounding: false,
            isPullingDown: false,
            isPullUpLoad: false,
            pullUpDirty: true,
            pullDownStyle: {},
            bubbleY: 0
        };
        this.ratio = parseInt(document.documentElement.dataset.dpr);
        this.pullDownInitTop = -50 * this.ratio;
    }
    componentDidMount() {
        setTimeout(() => {
            this.initScroll();
        }, 20);
    }
    componentDidUpdate(prevProps, prevState) {
    }
    pullUpTxt() {
        let { pullUpLoad } = this.props;
        const moreTxt = pullUpLoad && pullUpLoad.txt && pullUpLoad.txt.more || '加载更多';
        const noMoreTxt = pullUpLoad && pullUpLoad.txt && pullUpLoad.txt.noMore || '没有更多数据';
        return this.state.pullUpDirty ? moreTxt : noMoreTxt;
    }
    refreshTxt() {
        let pullDownRefresh = this.props;
        return pullDownRefresh && pullDownRefresh.txt || '加载成功';
    }
    initScroll() {
        let { pullDownRefresh, pullUpLoad, probeType, click, freeScroll, direction, scrollbar, startY, mouseWheel, listenScroll, scroll, listenBeforeScroll, beforeScrollStart } = this.props;
        if (!this.refs.wrapper) {
            return;
        }
        if (this.refs.listWrapper && (pullDownRefresh || pullUpLoad)) {
            this.refs.listWrapper.style.minHeight = `${getRect(this.refs.wrapper).height + 1}px`;
        }
        let options = {
            probeType: probeType,
            click: click,
            scrollY: freeScroll || direction === DIRECTION_V,
            scrollX: freeScroll || direction === DIRECTION_H,
            scrollbar: scrollbar,
            pullDownRefresh: pullDownRefresh,
            pullUpLoad: pullUpLoad,
            startY: startY,
            freeScroll: freeScroll,
            mouseWheel: mouseWheel
        };
        this.scroll = new BScroll(this.refs.wrapper, options);
        if (listenScroll) {
            this.scroll.on('scroll', (pos) => {
                scroll(pos);
            });
        }
        if (listenBeforeScroll) {
            this.scroll.on('beforeScrollStart', () => {
                beforeScrollStart();
            });
        }
        if (pullDownRefresh) {
            console.log('pullDownRefresh');
            this._initPullDownRefresh();
        }
        if (pullUpLoad) {
            console.log('pullUpLoad');
            this._initPullUpLoad();
        }
    }
    _initPullDownRefresh() {
        this.scroll.on('pullingDown', () => {
            console.log("pullingDown ing");
            this.setState({
                beforePullDown: false,
                isPullingDown: true
            }, () => __awaiter(this, void 0, void 0, function* () {
                yield this.props.pullingDown();
                this.forceUpdate(true);
            }));
        });
        this.scroll.on('scroll', (pos) => {
            if (this.state.beforePullDown) {
                this.setState({
                    bubbleY: Math.max(0, pos.y + this.pullDownInitTop),
                    pullDownStyle: {
                        top: Math.min(pos.y + this.pullDownInitTop, 10) * this.ratio
                    }
                });
            }
            else {
                this.setState({
                    bubbleY: 0
                });
            }
            if (this.state.isRebounding) {
                this.setState({
                    pullDownStyle: {
                        top: 10 - (this.props.pullDownRefresh.stop - pos.y)
                    }
                });
            }
        });
    }
    _initPullUpLoad() {
        this.scroll.on('pullingUp', () => {
            this.setState({
                isPullUpLoad: true
            }, () => __awaiter(this, void 0, void 0, function* () {
                let isMore = yield this.props.pullingUp();
                this.forceUpdate(isMore);
            }));
        });
    }
    disable() {
        this.scroll && this.scroll.disable();
    }
    enable() {
        this.scroll && this.scroll.enable();
    }
    refresh() {
        this.scroll && this.scroll.refresh();
    }
    scrollTo() {
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments);
    }
    scrollToElement() {
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments);
    }
    clickItem(e, item) {
        this.props.clickItem(item);
    }
    destroy() {
        this.scroll.destroy();
    }
    forceUpdate(dirty) {
        return __awaiter(this, void 0, void 0, function* () {
            let { pullDownRefresh, pullUpLoad } = this.props;
            let { isPullingDown, isPullUpLoad } = this.state;
            if (pullDownRefresh && isPullingDown) {
                yield this.setState({
                    isPullingDown: false
                });
                this._reboundPullDown().then(() => {
                    this._afterPullDown();
                });
            }
            else if (pullUpLoad && isPullUpLoad) {
                yield this.setState({
                    isPullUpLoad: false
                });
                console.log("isPullUpLoad", this.state.isPullUpLoad);
                this.scroll.finishPullUp();
                yield this.setState({
                    pullUpDirty: dirty
                });
                this.refresh();
            }
            else {
                this.refresh();
            }
        });
    }
    _reboundPullDown() {
        const { stopTime = 600 } = this.props.pullDownRefresh;
        return new Promise((resolve) => {
            setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                yield this.setState({
                    isRebounding: true
                });
                this.scroll.finishPullDown();
                resolve();
            }), stopTime);
        });
    }
    _afterPullDown() {
        setTimeout(() => __awaiter(this, void 0, void 0, function* () {
            yield this.setState({
                pullDownStyle: {
                    top: this.pullDownInitTop
                },
                beforePullDown: true,
                isRebounding: false
            });
            this.refresh();
        }), this.scroll.options.bounceTime);
    }
    render() {
        const { pullUpLoad, pullDownRefresh } = this.props;
        const { isPullUpLoad, pullDownStyle, beforePullDown, bubbleY, isPullingDown } = this.state;
        return (React.createElement("div", { ref: "wrapper", className: "list-wrapper" },
            React.createElement("div", { className: "scroll-content" },
                React.createElement("div", { ref: "listWrapper" }, this.props.children),
                pullUpLoad ? (React.createElement("div", { className: "pullup-wrapper" }, !isPullUpLoad ? (React.createElement("div", { className: "before-trigger" },
                    React.createElement("span", null, this.pullUpTxt()))) : (React.createElement("div", { className: "after-trigger" },
                    React.createElement(Loading, null))))) : null),
            pullDownRefresh ? (React.createElement("div", { ref: "pulldown", className: "pulldown-wrapper", style: pullDownStyle }, beforePullDown ? (React.createElement("div", { className: "before-trigger" },
                React.createElement(Bubble, { y: bubbleY }))) : (React.createElement("div", { className: "after-trigger" }, isPullingDown ? (React.createElement("div", { className: "loading" },
                React.createElement(Loading, null))) : (React.createElement("div", null,
                React.createElement("span", null, this.refreshTxt()))))))) : null));
    }
}
Scroll.defaultProps = {
    probeType: 1,
    click: true,
    listenScroll: false,
    listenBeforeScroll: false,
    direction: DIRECTION_V,
    scrollbar: false,
    pullDownRefresh: false,
    pullUpLoad: false,
    startY: 0,
    refreshDelay: 20,
    freeScroll: false,
    mouseWheel: false
};
