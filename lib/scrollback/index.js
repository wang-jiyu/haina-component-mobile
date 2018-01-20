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
var react_lazyload_1 = require("react-lazyload");
var ScrollBackItem = /** @class */ (function (_super) {
    __extends(ScrollBackItem, _super);
    function ScrollBackItem(props) {
        return _super.call(this, props) || this;
    }
    ScrollBackItem.prototype.componentDidMount = function () {
        var _a = this.props, loaded = _a.loaded, callback = _a.callback;
        if (loaded) {
            callback();
        }
    };
    ScrollBackItem.prototype.componentWillReceiveProps = function (nextProps) {
        var callback = this.props.callback;
        if (nextProps.loaded) {
            callback();
        }
    };
    ScrollBackItem.prototype.render = function () {
        return (this.props.children);
    };
    return ScrollBackItem;
}(React.Component));
var ScrollBack = /** @class */ (function (_super) {
    __extends(ScrollBack, _super);
    function ScrollBack(props) {
        return _super.call(this, props) || this;
    }
    ScrollBack.prototype.render = function () {
        var _a = this.props, offset = _a.offset, overflow = _a.overflow, resize = _a.resize, scroll = _a.scroll, loaded = _a.loaded, callback = _a.callback, height = _a.height;
        return (React.createElement(react_lazyload_1.default, { height: height, offset: offset, overflow: overflow, resize: resize, scroll: scroll },
            React.createElement(ScrollBackItem, { loaded: loaded, callback: callback }, this.props.children)));
    };
    ScrollBack.defaultProps = {
        offset: -50,
        overflow: false,
        resize: true,
        scroll: true,
        loaded: false
    };
    return ScrollBack;
}(React.Component));
exports.default = ScrollBack;
