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
import './index.scss';
export default class NavBar extends React.Component {
    render() {
        const _a = this.props, { prefixCls, className, children, mode, icon, onLeftClick, leftContent, rightContent } = _a, restProps = __rest(_a, ["prefixCls", "className", "children", "mode", "icon", "onLeftClick", "leftContent", "rightContent"]);
        return (React.createElement("div", Object.assign({}, restProps, { className: classnames(className, prefixCls, `${prefixCls}-${mode}`) }),
            React.createElement("div", { className: `${prefixCls}-left`, role: "button", onClick: onLeftClick },
                icon ? React.createElement("span", { className: `${prefixCls}-left-icon`, "aria-hidden": "true" }, icon) : null,
                leftContent),
            React.createElement("div", { className: `${prefixCls}-title` }, children),
            React.createElement("div", { className: `${prefixCls}-right` }, rightContent)));
    }
}
NavBar.defaultProps = {
    prefixCls: 'haina-navbar',
    mode: 'light',
    onLeftClick: () => { },
};
