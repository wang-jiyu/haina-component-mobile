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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var src_1 = require("better-scroll/src");
var bubble_1 = require("../bubble");
var loading_1 = require("../loading");
var dom_1 = require("../common/dom");
require("./scroll.scss");
var COMPONENT_NAME = 'scroll';
var DIRECTION_H = 'horizontal';
var DIRECTION_V = 'vertical';
var Scroll = /** @class */ (function (_super) {
    __extends(Scroll, _super);
    function Scroll() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            beforePullDown: true,
            isRebounding: false,
            isPullingDown: false,
            isPullUpLoad: false,
            pullUpDirty: true,
            pullDownStyle: {},
            bubbleY: 0
        };
        _this.ratio = parseInt(document.documentElement.dataset.dpr);
        _this.pullDownInitTop = -50 * _this.ratio;
        return _this;
    }
    Scroll.prototype.componentDidMount = function () {
        var _this = this;
        setTimeout(function () {
            _this.initScroll();
        }, 20);
    };
    Scroll.prototype.componentDidUpdate = function (prevProps, prevState) {
    };
    Scroll.prototype.pullUpTxt = function () {
        var pullUpLoad = this.props.pullUpLoad;
        var moreTxt = pullUpLoad && pullUpLoad.txt && pullUpLoad.txt.more || '加载更多';
        var noMoreTxt = pullUpLoad && pullUpLoad.txt && pullUpLoad.txt.noMore || '没有更多数据';
        return this.state.pullUpDirty ? moreTxt : noMoreTxt;
    };
    Scroll.prototype.refreshTxt = function () {
        var pullDownRefresh = this.props;
        return pullDownRefresh && pullDownRefresh.txt || '加载成功';
    };
    Scroll.prototype.initScroll = function () {
        var _a = this.props, pullDownRefresh = _a.pullDownRefresh, pullUpLoad = _a.pullUpLoad, probeType = _a.probeType, click = _a.click, freeScroll = _a.freeScroll, direction = _a.direction, scrollbar = _a.scrollbar, startY = _a.startY, mouseWheel = _a.mouseWheel, listenScroll = _a.listenScroll, scroll = _a.scroll, listenBeforeScroll = _a.listenBeforeScroll, beforeScrollStart = _a.beforeScrollStart;
        if (!this.refs.wrapper) {
            return;
        }
        if (this.refs.listWrapper && (pullDownRefresh || pullUpLoad)) {
            this.refs.listWrapper.style.minHeight = dom_1.getRect(this.refs.wrapper).height + 1 + "px";
        }
        var options = {
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
        this.scroll = new src_1.default(this.refs.wrapper, options);
        if (listenScroll) {
            this.scroll.on('scroll', function (pos) {
                scroll(pos);
            });
        }
        if (listenBeforeScroll) {
            this.scroll.on('beforeScrollStart', function () {
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
    };
    Scroll.prototype._initPullDownRefresh = function () {
        var _this = this;
        this.scroll.on('pullingDown', function () {
            console.log("pullingDown ing");
            _this.setState({
                beforePullDown: false,
                isPullingDown: true
            }, function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.props.pullingDown()];
                        case 1:
                            _a.sent();
                            this.forceUpdate(true);
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        this.scroll.on('scroll', function (pos) {
            if (_this.state.beforePullDown) {
                _this.setState({
                    bubbleY: Math.max(0, pos.y + _this.pullDownInitTop),
                    pullDownStyle: {
                        top: Math.min(pos.y + _this.pullDownInitTop, 10) * _this.ratio
                    }
                });
            }
            else {
                _this.setState({
                    bubbleY: 0
                });
            }
            if (_this.state.isRebounding) {
                _this.setState({
                    pullDownStyle: {
                        top: 10 - (_this.props.pullDownRefresh.stop - pos.y)
                    }
                });
            }
        });
    };
    Scroll.prototype._initPullUpLoad = function () {
        var _this = this;
        this.scroll.on('pullingUp', function () {
            _this.setState({
                isPullUpLoad: true
            }, function () { return __awaiter(_this, void 0, void 0, function () {
                var isMore;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.props.pullingUp()];
                        case 1:
                            isMore = _a.sent();
                            this.forceUpdate(isMore);
                            return [2 /*return*/];
                    }
                });
            }); });
        });
    };
    Scroll.prototype.disable = function () {
        this.scroll && this.scroll.disable();
    };
    Scroll.prototype.enable = function () {
        this.scroll && this.scroll.enable();
    };
    Scroll.prototype.refresh = function () {
        this.scroll && this.scroll.refresh();
    };
    Scroll.prototype.scrollTo = function () {
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments);
    };
    Scroll.prototype.scrollToElement = function () {
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments);
    };
    Scroll.prototype.clickItem = function (e, item) {
        this.props.clickItem(item);
    };
    Scroll.prototype.destroy = function () {
        this.scroll.destroy();
    };
    Scroll.prototype.forceUpdate = function (dirty) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var _a, pullDownRefresh, pullUpLoad, _b, isPullingDown, isPullUpLoad;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this.props, pullDownRefresh = _a.pullDownRefresh, pullUpLoad = _a.pullUpLoad;
                        _b = this.state, isPullingDown = _b.isPullingDown, isPullUpLoad = _b.isPullUpLoad;
                        if (!(pullDownRefresh && isPullingDown)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.setState({
                                isPullingDown: false
                            })];
                    case 1:
                        _c.sent();
                        this._reboundPullDown().then(function () {
                            _this._afterPullDown();
                        });
                        return [3 /*break*/, 6];
                    case 2:
                        if (!(pullUpLoad && isPullUpLoad)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.setState({
                                isPullUpLoad: false
                            })];
                    case 3:
                        _c.sent();
                        console.log("isPullUpLoad", this.state.isPullUpLoad);
                        this.scroll.finishPullUp();
                        return [4 /*yield*/, this.setState({
                                pullUpDirty: dirty
                            })];
                    case 4:
                        _c.sent();
                        this.refresh();
                        return [3 /*break*/, 6];
                    case 5:
                        this.refresh();
                        _c.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    Scroll.prototype._reboundPullDown = function () {
        var _this = this;
        var _a = this.props.pullDownRefresh.stopTime, stopTime = _a === void 0 ? 600 : _a;
        return new Promise(function (resolve) {
            setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.setState({
                                isRebounding: true
                            })];
                        case 1:
                            _a.sent();
                            this.scroll.finishPullDown();
                            resolve();
                            return [2 /*return*/];
                    }
                });
            }); }, stopTime);
        });
    };
    Scroll.prototype._afterPullDown = function () {
        var _this = this;
        setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.setState({
                            pullDownStyle: {
                                top: this.pullDownInitTop
                            },
                            beforePullDown: true,
                            isRebounding: false
                        })];
                    case 1:
                        _a.sent();
                        this.refresh();
                        return [2 /*return*/];
                }
            });
        }); }, this.scroll.options.bounceTime);
    };
    Scroll.prototype.render = function () {
        var _a = this.props, pullUpLoad = _a.pullUpLoad, pullDownRefresh = _a.pullDownRefresh;
        var _b = this.state, isPullUpLoad = _b.isPullUpLoad, pullDownStyle = _b.pullDownStyle, beforePullDown = _b.beforePullDown, bubbleY = _b.bubbleY, isPullingDown = _b.isPullingDown;
        return (React.createElement("div", { ref: "wrapper", className: "list-wrapper" },
            React.createElement("div", { className: "scroll-content" },
                React.createElement("div", { ref: "listWrapper" }, this.props.children),
                pullUpLoad ? (React.createElement("div", { className: "pullup-wrapper" }, !isPullUpLoad ? (React.createElement("div", { className: "before-trigger" },
                    React.createElement("span", null, this.pullUpTxt()))) : (React.createElement("div", { className: "after-trigger" },
                    React.createElement(loading_1.default, null))))) : null),
            pullDownRefresh ? (React.createElement("div", { ref: "pulldown", className: "pulldown-wrapper", style: pullDownStyle }, beforePullDown ? (React.createElement("div", { className: "before-trigger" },
                React.createElement(bubble_1.default, { y: bubbleY }))) : (React.createElement("div", { className: "after-trigger" }, isPullingDown ? (React.createElement("div", { className: "loading" },
                React.createElement(loading_1.default, null))) : (React.createElement("div", null,
                React.createElement("span", null, this.refreshTxt()))))))) : null));
    };
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
    return Scroll;
}(React.Component));
exports.default = Scroll;
