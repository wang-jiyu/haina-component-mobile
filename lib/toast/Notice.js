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
var classNames = require("classnames");
require("./style/notice.scss");
var Notice = (function (_super) {
    __extends(Notice, _super);
    function Notice(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            shouldClose: false,
        };
        return _this;
    }
    Notice.prototype.componentDidMount = function () {
        var _this = this;
        if (this.props.duration > 0) {
            this.closeTimer = setTimeout(function () {
                _this.close();
            }, this.props.duration - 300);
        }
    };
    Notice.prototype.componentWillUnmount = function () {
        this.clearCloseTimer();
    };
    Notice.prototype.clearCloseTimer = function () {
        if (this.closeTimer) {
            clearTimeout(this.closeTimer);
            this.closeTimer = null;
        }
    };
    Notice.prototype.close = function () {
        var _this = this;
        this.clearCloseTimer();
        this.setState({ shouldClose: true });
        this.timer = setTimeout(function () {
            if (_this.props.onClose) {
                _this.props.onClose();
            }
            clearTimeout(_this.timer);
        }, 300);
    };
    Notice.prototype.render = function () {
        var shouldClose = this.state.shouldClose;
        var _a = this.props, prefixCls = _a.prefixCls, type = _a.type, iconClass = _a.iconClass, content = _a.content;
        return (React.createElement("div", { className: classNames([prefixCls,
                { 'info': type === 'info' },
                { 'success': type === 'success' },
                { 'warning': type === 'warning' },
                { 'error': type === 'error' },
                { 'leave': shouldClose }
            ]) },
            iconClass ? React.createElement("div", { className: prefixCls + "-icon" },
                React.createElement("span", { className: classNames(['fa', iconClass]) })) : null,
            React.createElement("div", { className: prefixCls + "-content" }, content)));
    };
    Notice.defaultProps = {
        prefixCls: 'haina-notice',
        duration: 3000
    };
    return Notice;
}(React.Component));
exports.default = Notice;
