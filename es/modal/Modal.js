var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
import * as React from 'react';
import * as classnames from 'classnames';
import Dialog from '../dialog';
import TouchFeedback from 'rmc-feedback';
import { ModalComponent } from './PropsType';
import './style/index.scss';
export default class Modal extends ModalComponent {
    renderFooterButton(button, prefixCls, i) {
        let buttonStyle = {};
        if (button.style) {
            buttonStyle = button.style;
            if (typeof buttonStyle === 'string') {
                const styleMap = {
                    cancel: {},
                    default: {},
                    destructive: { color: 'red' },
                };
                buttonStyle = styleMap[buttonStyle] || {};
            }
        }
        const onClickFn = (e) => {
            e.preventDefault();
            if (button.onPress) {
                button.onPress();
            }
        };
        return (React.createElement(TouchFeedback, { activeClassName: `${prefixCls}-button-active`, key: i },
            React.createElement("a", { className: `${prefixCls}-button`, role: "button", style: buttonStyle, onClick: onClickFn }, button.text || `Button`)));
    }
    render() {
        const _a = this.props, { prefixCls, className, wrapClassName, transitionName, maskTransitionName, style, footer = [], operation, animated, transparent, popup, animationType } = _a, restProps = __rest(_a, ["prefixCls", "className", "wrapClassName", "transitionName", "maskTransitionName", "style", "footer", "operation", "animated", "transparent", "popup", "animationType"]);
        const btnGroupClass = classnames(`${prefixCls}-button-group-${footer.length === 2 && !operation ? 'h' : 'v'}`, `${prefixCls}-button-group-${operation ? 'operation' : 'normal'}`);
        const footerDom = footer.length ? (React.createElement("div", { className: btnGroupClass, role: "group" }, footer.map((button, i) => 
        // tslint:disable-next-line:jsx-no-multiline-js
        this.renderFooterButton(button, prefixCls, i)))) : null;
        let transName;
        let maskTransName;
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
        const wrapCls = classnames(wrapClassName, {
            [`${prefixCls}-wrap-popup`]: popup,
        });
        const cls = classnames(className, {
            [`${prefixCls}-transparent`]: transparent,
            [`${prefixCls}-popup`]: popup,
            [`${prefixCls}-popup-${animationType}`]: popup && animationType,
        });
        return (React.createElement(Dialog, Object.assign({}, restProps, { prefixCls: prefixCls, className: cls, wrapClassName: wrapCls, transitionName: transitionName || transName, maskTransitionName: maskTransitionName || maskTransName, style: style, footer: footerDom })));
    }
}
Modal.defaultProps = {
    prefixCls: 'haina-component-modal',
    transparent: false,
    popup: false,
    animationType: 'slide-down',
    animated: true,
    style: {},
    onShow() { },
    footer: [],
    closable: false,
    operation: false,
};
