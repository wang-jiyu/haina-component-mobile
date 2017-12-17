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
var CLIENT_SIZE_KEYS = { x: 'clientWidth', y: 'clientHeight' };
var CLIENT_START_KEYS = { x: 'clientTop', y: 'clientLeft' };
var INNER_SIZE_KEYS = { x: 'innerWidth', y: 'innerHeight' };
var OFFSET_SIZE_KEYS = { x: 'offsetWidth', y: 'offsetHeight' };
var OFFSET_START_KEYS = { x: 'offsetLeft', y: 'offsetTop' };
var OVERFLOW_KEYS = { x: 'overflowX', y: 'overflowY' };
var SCROLL_SIZE_KEYS = { x: 'scrollWidth', y: 'scrollHeight' };
var SCROLL_START_KEYS = { x: 'scrollLeft', y: 'scrollTop' };
var SIZE_KEYS = { x: 'width', y: 'height' };
var NOOP = function () { };
var PASSIVE = (function () {
    if (typeof window === 'undefined')
        return false;
    var hasSupport = true;
    try {
        document.createElement('div').addEventListener('test', NOOP, {});
    }
    catch (e) {
        hasSupport = false;
    }
    return hasSupport;
})() ? { passive: true } : false;
var UNSTABLE_MESSAGE = '组件加载失败';
var MAX_SYNC_UPDATES = 100;
var isEqualSubset = function (a, b) {
    for (var key in b)
        if (a[key] !== b[key])
            return false;
    return true;
};
var RefreshControl = (function (_super) {
    __extends(RefreshControl, _super);
    function RefreshControl(props) {
        return _super.call(this, props) || this;
    }
    RefreshControl.prototype.render = function () {
        return (React.createElement("div", null));
    };
    return RefreshControl;
}(React.Component));
exports.default = RefreshControl;
