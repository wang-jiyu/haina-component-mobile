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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var rc_animate_1 = require("rc-animate");
var LazyRenderBox_1 = require("./LazyRenderBox");
function noop() {
}
var Dialog = /** @class */ (function (_super) {
    __extends(Dialog, _super);
    function Dialog() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.getDialogElement = function () {
            var props = _this.props;
            var closable = props.closable;
            var prefixCls = props.prefixCls;
            var footer;
            if (props.footer) {
                footer = (React.createElement("div", { className: prefixCls + "-footer", ref: function (el) { return _this.footerRef = el; } }, props.footer));
            }
            var header;
            if (props.title) {
                header = (React.createElement("div", { className: prefixCls + "-header", ref: function (el) { return _this.headerRef = el; } },
                    React.createElement("div", { className: prefixCls + "-title" }, props.title)));
            }
            var closer;
            if (closable) {
                closer = (React.createElement("button", { onClick: _this.close, "aria-label": "Close", className: prefixCls + "-close" },
                    React.createElement("span", { className: prefixCls + "-close-x" })));
            }
            var transitionName = _this.getTransitionName();
            var dialogElement = (React.createElement(LazyRenderBox_1.default, { key: "dialog-element", role: "document", ref: function (el) { return _this.dialogRef = el; }, style: props.style || {}, className: (props.className || '') + " " + (props.dialogclassName || ''), visible: props.visible },
                React.createElement("div", { className: prefixCls + "-content" },
                    closer,
                    header,
                    React.createElement("div", { className: prefixCls + "-body", style: props.bodyStyle, ref: function (el) { return _this.bodyRef = el; } }, props.children),
                    footer)));
            return (React.createElement(rc_animate_1.default, { key: "dialog", showProp: "visible", onAppear: _this.onAnimateAppear, onLeave: _this.onAnimateLeave, transitionName: transitionName, component: "", transitionAppear: true }, dialogElement));
        };
        _this.onAnimateAppear = function () {
            document.body.style.overflow = 'hidden';
        };
        _this.onAnimateLeave = function () {
            document.body.style.overflow = '';
            if (_this.wrapRef) {
                _this.wrapRef.style.display = 'none';
            }
            if (_this.props.onAnimateLeave) {
                _this.props.onAnimateLeave();
            }
            if (_this.props.afterClose) {
                _this.props.afterClose();
            }
        };
        _this.close = function (e) {
            if (_this.props.onClose) {
                _this.props.onClose(e);
            }
        };
        _this.onMaskClick = function (e) {
            if (e.target === e.currentTarget) {
                _this.close(e);
            }
        };
        return _this;
    }
    Dialog.prototype.componentWillUnmount = function () {
        // fix: react@16 no dismissing animation
        document.body.style.overflow = '';
        if (this.wrapRef) {
            this.wrapRef.style.display = 'none';
        }
    };
    Dialog.prototype.getZIndexStyle = function () {
        var style = {};
        var props = this.props;
        if (props.zIndex !== undefined) {
            style.zIndex = props.zIndex;
        }
        return style;
    };
    Dialog.prototype.getWrapStyle = function () {
        var wrapStyle = this.props.wrapStyle || {};
        return __assign({}, this.getZIndexStyle(), wrapStyle);
    };
    Dialog.prototype.getMaskStyle = function () {
        var maskStyle = this.props.maskStyle || {};
        return __assign({}, this.getZIndexStyle(), maskStyle);
    };
    Dialog.prototype.getMaskTransitionName = function () {
        var props = this.props;
        var transitionName = props.maskTransitionName;
        var animation = props.maskAnimation;
        if (!transitionName && animation) {
            transitionName = props.prefixCls + "-" + animation;
        }
        return transitionName;
    };
    Dialog.prototype.getTransitionName = function () {
        var props = this.props;
        var transitionName = props.transitionName;
        var animation = props.animation;
        if (!transitionName && animation) {
            transitionName = props.prefixCls + "-" + animation;
        }
        return transitionName;
    };
    Dialog.prototype.getMaskElement = function () {
        var props = this.props;
        var maskElement;
        if (props.mask) {
            var maskTransition = this.getMaskTransitionName();
            maskElement = (React.createElement(LazyRenderBox_1.default, { style: this.getMaskStyle(), key: "mask-element", className: props.prefixCls + "-mask", hiddenClassName: props.prefixCls + "-mask-hidden", visible: props.visible }));
            if (maskTransition) {
                maskElement = (React.createElement(rc_animate_1.default, { key: "mask", showProp: "visible", transitionAppear: true, component: "", transitionName: maskTransition }, maskElement));
            }
        }
        return maskElement;
    };
    Dialog.prototype.render = function () {
        var _this = this;
        var props = this.props;
        var prefixCls = props.prefixCls, maskClosable = props.maskClosable;
        var style = this.getWrapStyle();
        if (props.visible) {
            style.display = null;
        }
        return (React.createElement("div", null,
            this.getMaskElement(),
            React.createElement("div", __assign({ className: prefixCls + "-wrap " + (props.wrapClassName || ''), ref: function (el) { return _this.wrapRef = el; }, onClick: maskClosable ? this.onMaskClick : undefined, role: "dialog", "aria-labelledby": props.title, style: style }, props.wrapProps), this.getDialogElement())));
    };
    Dialog.defaultProps = {
        afterClose: noop,
        dialogclassName: '',
        mask: true,
        visible: false,
        closable: false,
        maskClosable: false,
        prefixCls: 'haina-dialog',
        onClose: noop,
        animation: "zoom",
        maskAnimation: "fade"
    };
    return Dialog;
}(React.Component));
exports.default = Dialog;
