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
import loadSprite from './loadSprite';
import './index.scss';
export default class Icon extends React.Component {
    componentDidMount() {
        loadSprite();
    }
    render() {
        const _a = this.props, { type, className, size } = _a, restProps = __rest(_a, ["type", "className", "size"]);
        const cls = classnames(className, 'haina-icon', `haina-icon-${type}`, `haina-icon-${size}`);
        return (React.createElement("svg", Object.assign({ className: cls }, restProps),
            React.createElement("use", { xlinkHref: `#${type}` })));
    }
}
Icon.defaultProps = {
    size: 'md',
};
