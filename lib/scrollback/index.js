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
var ScrollBack = /** @class */ (function (_super) {
    __extends(ScrollBack, _super);
    function ScrollBack(props) {
        return _super.call(this, props) || this;
    }
    ScrollBack.prototype.componentDidMount = function () {
        var _a = this.props, loaded = _a.loaded, callback = _a.callback;
        if (loaded) {
            callback();
        }
    };
    ScrollBack.prototype.componentWillReceiveProps = function (nextProps) {
        var callback = this.props.callback;
        if (nextProps.loaded) {
            callback();
        }
    };
    ScrollBack.prototype.render = function () {
        var _a = this.props, offset = _a.offset, overflow = _a.overflow, resize = _a.resize, scroll = _a.scroll;
        return (React.createElement(react_lazyload_1.default, { offset: offset, overflow: overflow, resize: resize, scroll: scroll }, this.props.children));
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
