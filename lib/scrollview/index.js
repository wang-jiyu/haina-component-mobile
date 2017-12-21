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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
require("./index.scss");
var ScrollView = (function (_super) {
    __extends(ScrollView, _super);
    function ScrollView(props) {
        var _this = _super.call(this, props) || this;
        _this.pageLoaded = 0;
        _this.defaultLoader = null;
        _this.scrollListener = _this.scrollListener.bind(_this);
        return _this;
    }
    ScrollView.prototype.componentDidMount = function () {
        this.pageLoaded = this.props.pageStart;
        this.attachScrollListener();
    };
    ScrollView.prototype.componentDidUpdate = function () {
        this.attachScrollListener();
    };
    ScrollView.prototype.componentWillUnmount = function () {
        this.detachScrollListener();
        this.detachMousewheelListener();
    };
    ScrollView.prototype.setDefaultLoader = function (loader) {
        this.defaultLoader = loader;
    };
    ScrollView.prototype.detachMousewheelListener = function () {
        var scrollEl = window;
        if (this.props.useWindow === false) {
            scrollEl = this.scrollComponent.parentNode;
        }
        scrollEl.removeEventListener('mousewheel', this.mousewheelListener, this.props.useCapture);
    };
    ScrollView.prototype.detachScrollListener = function () {
        var scrollEl = window;
        if (this.props.useWindow === false) {
            scrollEl = this.scrollComponent.parentNode;
        }
        scrollEl.removeEventListener('scroll', this.scrollListener, this.props.useCapture);
        scrollEl.removeEventListener('resize', this.scrollListener, this.props.useCapture);
    };
    ScrollView.prototype.attachScrollListener = function () {
        if (this.props.loading) {
            return;
        }
        if (!this.props.hasMore) {
            return;
        }
        var scrollEl = window;
        if (this.props.useWindow === false) {
            scrollEl = this.scrollComponent.parentNode;
        }
        scrollEl.addEventListener('mousewheel', this.mousewheelListener, this.props.useCapture);
        scrollEl.addEventListener('scroll', this.scrollListener, this.props.useCapture);
        scrollEl.addEventListener('resize', this.scrollListener, this.props.useCapture);
        if (this.props.initialLoad) {
            this.scrollListener();
        }
    };
    ScrollView.prototype.mousewheelListener = function (e) {
        if (e.deltaY === 1) {
            e.preventDefault();
        }
    };
    ScrollView.prototype.scrollListener = function () {
        var _this = this;
        var el = this.scrollComponent;
        var scrollEl = window;
        var LazyLoadArr = this.props.LazyLoadArr;
        var offset;
        var lazyOffset;
        if (this.props.useWindow) {
            var doc = document.documentElement;
            doc = doc;
            var scrollTop = scrollEl.pageYOffset !== undefined
                ? scrollEl.pageYOffset
                : doc.scrollTop;
            if (this.props.isReverse) {
                offset = scrollTop;
            }
            else {
                offset =
                    this.calculateTopPosition(el) +
                        (el.offsetHeight - scrollTop - window.innerHeight);
            }
            lazyOffset = scrollTop;
        }
        else if (this.props.isReverse) {
            offset = el.parentNode.scrollTop;
        }
        else {
            offset =
                el.scrollHeight - el.parentNode.scrollTop - el.parentNode.clientHeight;
        }
        if (offset < Number(this.props.threshold)) {
            this.detachScrollListener();
            if (typeof this.props.loadMore === 'function') {
                this.props.loadMore((this.pageLoaded += 1));
            }
        }
        LazyLoadArr.forEach(function (item, index) {
            var ref = item.ref, lazyload = item.lazyload, threshold = item.threshold, loaded = item.loaded;
            var elOffsetTop = ref.scrollTop;
            if ((elOffsetTop - lazyOffset) < Number(threshold) && !loaded) {
                _this.detachScrollListener();
                lazyload();
            }
        });
    };
    ScrollView.prototype.calculateTopPosition = function (el) {
        if (!el) {
            return 0;
        }
        return el.offsetTop + this.calculateTopPosition(el.offsetParent);
    };
    ScrollView.prototype.render = function () {
        var _this = this;
        var _a = this.props, children = _a.children, element = _a.element, hasMore = _a.hasMore, initialLoad = _a.initialLoad, isReverse = _a.isReverse, loader = _a.loader, loadMore = _a.loadMore, pageStart = _a.pageStart, threshold = _a.threshold, useCapture = _a.useCapture, useWindow = _a.useWindow, className = _a.className, props = __rest(_a, ["children", "element", "hasMore", "initialLoad", "isReverse", "loader", "loadMore", "pageStart", "threshold", "useCapture", "useWindow", "className"]);
        var childrenArray = [children];
        if (hasMore) {
            if (loader) {
                isReverse ? childrenArray.unshift(loader) : childrenArray.push(loader);
            }
            else if (this.defaultLoader) {
                isReverse
                    ? childrenArray.unshift(this.defaultLoader)
                    : childrenArray.push(this.defaultLoader);
            }
        }
        return React.createElement.apply(React, [element, { className: className, ref: function (ref) { return _this.scrollComponent = ref; } }].concat(childrenArray));
    };
    ScrollView.defaultProps = {
        element: 'div',
        threshold: 250,
        hasMore: false,
        initialLoad: false,
        pageStart: 0,
        useWindow: true,
        isReverse: false,
        useCapture: false,
        loader: null,
        LazyLoadArr: []
    };
    return ScrollView;
}(React.Component));
exports.default = ScrollView;
