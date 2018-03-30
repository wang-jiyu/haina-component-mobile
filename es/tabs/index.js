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
import * as classNames from 'classnames';
import './index.scss';
export class Item extends React.Component {
    render() {
        return React.createElement("div", null, this.props.children);
    }
}
export default class Tabs extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            tabActive: this.props.tabActive
        };
    }
    componentDidMount() {
        let index = this.state.tabActive;
        var $selectedPanel = this.refs['tab-panel'];
        var $selectedMenu = this.refs[`tab-menu-${index}`];
        if (this.props.onMount) {
            this.props.onMount(index, $selectedPanel, $selectedMenu);
        }
    }
    componentWillReceiveProps(newProps) {
        if (newProps.tabActive && newProps.tabActive !== this.props.tabActive) {
            this.setState({ tabActive: newProps.tabActive });
        }
    }
    getChildrens(children = this.props.children) {
        return React.Children.map(children, (c) => {
            return Object.assign({}, c.props);
        });
    }
    setActive(index, e) {
        const { onAfterChange, onBeforeChange } = this.props;
        var $selectedPanel = this.refs['tab-panel'];
        var $selectedTabMenu = this.refs[`tab-menu-${index}`];
        if (onBeforeChange) {
            var cancel = onBeforeChange(index, $selectedPanel, $selectedTabMenu);
            if (cancel === false) {
                return;
            }
        }
        this.setState({ tabActive: index }, () => {
            if (onAfterChange) {
                onAfterChange(index, $selectedPanel, $selectedTabMenu);
            }
        });
    }
    _getMenuItems() {
        if (!this.props.children) {
            throw new Error('必须包含一个子元素');
        }
        const { tabClassName, tabMenuClassName, tabFontClassName, tabBarUnderlineStyle, tabBarActiveTextColor, tabBarInactiveTextColor } = this.props;
        const $menuItems = this.getChildrens()
            .map(($panel, index) => {
            const { title } = $panel, other = __rest($panel, ["title"]);
            const ref = `tab-menu-${index + 1}`;
            const classes = classNames('tabs-menu-item', this.state.tabActive === (index + 1) && !tabBarUnderlineStyle && 'is-active', this.state.tabActive === (index + 1) && tabBarUnderlineStyle);
            const fontClass = classNames(tabFontClassName);
            return (React.createElement("div", Object.assign({ ref: ref, key: index, className: classes, onClick: () => this.setActive(index + 1) }, other),
                React.createElement("span", { className: fontClass, style: { color: this.state.tabActive === (index + 1) ? tabBarActiveTextColor : tabBarInactiveTextColor } }, title)));
        });
        const classes = classNames('tabs-navigation', tabClassName);
        const tabMenuClass = classNames('tabs-menu', tabMenuClassName);
        return (React.createElement("div", { className: classes },
            React.createElement("div", { className: tabMenuClass }, $menuItems)));
    }
    _getSelectedPanel() {
        const { tabPanelClassName, tabPanelStyle } = this.props;
        const classes = classNames('tab-panel', tabPanelClassName);
        var index = this.state.tabActive - 1;
        var $panel = this.props.children[index];
        if (this.props.allShowMode) {
            return (React.Children.map(this.props.children, (child, subindex) => {
                return React.createElement("div", { ref: 'tab-panel', className: classes, style: Object.assign({ display: subindex === index ? 'block' : 'none' }, tabPanelStyle) }, child);
            }));
        }
        return (React.createElement("div", { ref: 'tab-panel', className: classes, style: tabPanelStyle }, $panel));
    }
    render() {
        var className = classNames('tabs', this.props.className);
        return (React.createElement("div", { className: className },
            this._getMenuItems(),
            this._getSelectedPanel()));
    }
}
Tabs.Item = Item;
Tabs.defaultProps = {
    tabActive: 1,
    allShowMode: false,
    tabPanelStyle: {}
};
