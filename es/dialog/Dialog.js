import * as React from 'react';
import Animate from 'rc-animate';
import LazyRenderBox from './LazyRenderBox';
function noop() {
}
export default class Dialog extends React.Component {
    constructor() {
        super(...arguments);
        this.getDialogElement = () => {
            const props = this.props;
            const closable = props.closable;
            const prefixCls = props.prefixCls;
            let footer;
            if (props.footer) {
                footer = (React.createElement("div", { className: `${prefixCls}-footer`, ref: el => this.footerRef = el }, props.footer));
            }
            let header;
            if (props.title) {
                header = (React.createElement("div", { className: `${prefixCls}-header`, ref: el => this.headerRef = el },
                    React.createElement("div", { className: `${prefixCls}-title` }, props.title)));
            }
            let closer;
            if (closable) {
                closer = (React.createElement("button", { onClick: this.close, "aria-label": "Close", className: `${prefixCls}-close` },
                    React.createElement("span", { className: `${prefixCls}-close-x` })));
            }
            const transitionName = this.getTransitionName();
            const dialogElement = (React.createElement(LazyRenderBox, { key: "dialog-element", role: "document", ref: el => this.dialogRef = el, style: props.style || {}, className: `${prefixCls} ${props.className || ''}`, visible: props.visible },
                React.createElement("div", { className: `${prefixCls}-content` },
                    closer,
                    header,
                    React.createElement("div", { className: `${prefixCls}-body`, style: props.bodyStyle, ref: el => this.bodyRef = el }, props.children),
                    footer)));
            return (React.createElement(Animate, { key: "dialog", showProp: "visible", onAppear: this.onAnimateAppear, onLeave: this.onAnimateLeave, transitionName: transitionName, component: "", transitionAppear: true }, dialogElement));
        };
        this.onAnimateAppear = () => {
            document.body.style.overflow = 'hidden';
        };
        this.onAnimateLeave = () => {
            document.body.style.overflow = '';
            if (this.wrapRef) {
                this.wrapRef.style.display = 'none';
            }
            if (this.props.onAnimateLeave) {
                this.props.onAnimateLeave();
            }
            if (this.props.afterClose) {
                this.props.afterClose();
            }
        };
        this.close = (e) => {
            if (this.props.onClose) {
                this.props.onClose(e);
            }
        };
        this.onMaskClick = (e) => {
            if (e.target === e.currentTarget) {
                this.close(e);
            }
        };
    }
    componentWillUnmount() {
        // fix: react@16 no dismissing animation
        document.body.style.overflow = '';
        if (this.wrapRef) {
            this.wrapRef.style.display = 'none';
        }
    }
    getZIndexStyle() {
        const style = {};
        const props = this.props;
        if (props.zIndex !== undefined) {
            style.zIndex = props.zIndex;
        }
        return style;
    }
    getWrapStyle() {
        const wrapStyle = this.props.wrapStyle || {};
        return Object.assign({}, this.getZIndexStyle(), wrapStyle);
    }
    getMaskStyle() {
        const maskStyle = this.props.maskStyle || {};
        return Object.assign({}, this.getZIndexStyle(), maskStyle);
    }
    getMaskTransitionName() {
        const props = this.props;
        let transitionName = props.maskTransitionName;
        const animation = props.maskAnimation;
        if (!transitionName && animation) {
            transitionName = `${props.prefixCls}-${animation}`;
        }
        return transitionName;
    }
    getTransitionName() {
        const props = this.props;
        let transitionName = props.transitionName;
        const animation = props.animation;
        if (!transitionName && animation) {
            transitionName = `${props.prefixCls}-${animation}`;
        }
        return transitionName;
    }
    getMaskElement() {
        const props = this.props;
        let maskElement;
        if (props.mask) {
            const maskTransition = this.getMaskTransitionName();
            maskElement = (React.createElement(LazyRenderBox, { style: this.getMaskStyle(), key: "mask-element", className: `${props.prefixCls}-mask`, hiddenClassName: `${props.prefixCls}-mask-hidden`, visible: props.visible }));
            if (maskTransition) {
                maskElement = (React.createElement(Animate, { key: "mask", showProp: "visible", transitionAppear: true, component: "", transitionName: maskTransition }, maskElement));
            }
        }
        return maskElement;
    }
    render() {
        const { props } = this;
        const { prefixCls, maskClosable } = props;
        const style = this.getWrapStyle();
        if (props.visible) {
            style.display = null;
        }
        return (React.createElement("div", null,
            this.getMaskElement(),
            React.createElement("div", Object.assign({ className: `${prefixCls}-wrap ${props.wrapClassName || ''}`, ref: el => this.wrapRef = el, onClick: maskClosable ? this.onMaskClick : undefined, role: "dialog", "aria-labelledby": props.title, style: style }, props.wrapProps), this.getDialogElement())));
    }
}
Dialog.defaultProps = {
    afterClose: noop,
    className: '',
    mask: true,
    visible: false,
    closable: true,
    maskClosable: false,
    prefixCls: 'haina-dialog',
    onClose: noop,
    animation: "zoom",
    maskAnimation: "fade"
};
