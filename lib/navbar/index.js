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
require("./index.scss");
var NavBar = /** @class */ (function (_super) {
    __extends(NavBar, _super);
    function NavBar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NavBar.prototype.render = function () {
        var _a = this.props, prefixCls = _a.prefixCls, className = _a.className, children = _a.children, mode = _a.mode, icon = _a.icon, onLeftClick = _a.onLeftClick, leftContent = _a.leftContent, rightContent = _a.rightContent, restProps = __rest(_a, ["prefixCls", "className", "children", "mode", "icon", "onLeftClick", "leftContent", "rightContent"]);
        return (React.createElement("div", __assign({}, restProps, { className: classnames(className, prefixCls, prefixCls + "-" + mode) }),
            React.createElement("div", { className: prefixCls + "-left", role: "button", onClick: onLeftClick },
                icon ? React.createElement("span", { className: prefixCls + "-left-icon", "aria-hidden": "true" }, icon) : null,
                leftContent),
            React.createElement("div", { className: prefixCls + "-title" }, children),
            React.createElement("div", { className: prefixCls + "-right" }, rightContent)));
    };
    NavBar.defaultProps = {
        prefixCls: 'haina-navbar',
        mode: 'light',
        onLeftClick: function () { },
    };
    return NavBar;
}(React.Component));
exports.default = NavBar;
