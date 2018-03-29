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
var classnames = require("classnames");
var dialog_1 = require("../dialog");
var rmc_feedback_1 = require("rmc-feedback");
var PropsType_1 = require("./PropsType");
require("./style/index.scss");
var Modal = /** @class */ (function (_super) {
    __extends(Modal, _super);
    function Modal() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Modal.prototype.renderFooterButton = function (button, prefixCls, i) {
        var buttonStyle = {};
        if (button.style) {
            buttonStyle = button.style;
            if (typeof buttonStyle === 'string') {
                var styleMap = {
                    cancel: {},
                    default: {},
                    destructive: { color: 'red' },
                };
                buttonStyle = styleMap[buttonStyle] || {};
            }
        }
        var onClickFn = function (e) {
            e.preventDefault();
            if (button.onPress) {
                button.onPress();
            }
        };
        return (React.createElement(rmc_feedback_1.default, { activeClassName: prefixCls + "-button-active", key: i },
            React.createElement("a", { className: prefixCls + "-button", role: "button", style: buttonStyle, onClick: onClickFn }, button.text || "Button")));
    };
    Modal.prototype.render = function () {
        var _this = this;
        var _a = this.props, prefixCls = _a.prefixCls, className = _a.className, wrapClassName = _a.wrapClassName, transitionName = _a.transitionName, maskTransitionName = _a.maskTransitionName, style = _a.style, _b = _a.footer, footer = _b === void 0 ? [] : _b, operation = _a.operation, animated = _a.animated, transparent = _a.transparent, popup = _a.popup, animationType = _a.animationType, restProps = __rest(_a, ["prefixCls", "className", "wrapClassName", "transitionName", "maskTransitionName", "style", "footer", "operation", "animated", "transparent", "popup", "animationType"]);
        var btnGroupClass = classnames(prefixCls + "-button-group-" + (footer.length === 2 && !operation ? 'h' : 'v'), prefixCls + "-button-group-" + (operation ? 'operation' : 'normal'));
        var footerDom = footer.length ? (React.createElement("div", { className: btnGroupClass, role: "group" }, footer.map(function (button, i) {
            // tslint:disable-next-line:jsx-no-multiline-js
            return _this.renderFooterButton(button, prefixCls, i);
        }))) : null;
        var transName;
        var maskTransName;
        if (animated) {
            // tslint:disable-next-line:prefer-conditional-expression
            if (transparent) {
                transName = maskTransName = 'am-fade';
            }
            else {
                transName = maskTransName = 'am-slide-up';
            }
            if (popup) {
                transName =
                    animationType === 'slide-up' ? 'am-slide-up' : 'am-slide-down';
                maskTransName = 'am-fade';
            }
        }
        var wrapCls = classnames(wrapClassName, (_c = {},
            _c[prefixCls + "-wrap-popup"] = popup,
            _c));
        var cls = classnames(className, (_d = {},
            _d[prefixCls + "-transparent"] = transparent,
            _d[prefixCls + "-popup"] = popup,
            _d[prefixCls + "-popup-" + animationType] = popup && animationType,
            _d));
        return (React.createElement(dialog_1.default, __assign({}, restProps, { prefixCls: prefixCls, className: cls, wrapClassName: wrapCls, transitionName: transitionName || transName, maskTransitionName: maskTransitionName || maskTransName, style: style, footer: footerDom })));
        var _c, _d;
    };
    Modal.defaultProps = {
        prefixCls: 'haina-component-modal',
        transparent: false,
        popup: false,
        animationType: 'slide-down',
        animated: true,
        style: {},
        onShow: function () { },
        footer: [],
        closable: false,
        operation: false,
    };
    return Modal;
}(PropsType_1.ModalComponent));
exports.default = Modal;
