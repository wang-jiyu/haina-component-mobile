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
define(["require", "exports", "react", "classnames", "./index.scss"], function (require, exports, React, classNames) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Item = (function (_super) {
        __extends(Item, _super);
        function Item() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Item.prototype.render = function () {
            return React.createElement("div", null, this.props.children);
        };
        return Item;
    }(React.Component));
    exports.Item = Item;
    var Tabs = (function (_super) {
        __extends(Tabs, _super);
        function Tabs(props) {
            var _this = _super.call(this, props) || this;
            _this.state = {
                tabActive: _this.props.tabActive
            };
            return _this;
        }
        Tabs.prototype.componentDidMount = function () {
            var index = this.state.tabActive;
            var $selectedPanel = this.refs['tab-panel'];
            var $selectedMenu = this.refs["tab-menu-" + index];
            if (this.props.onMount) {
                this.props.onMount(index, $selectedPanel, $selectedMenu);
            }
        };
        Tabs.prototype.componentWillReceiveProps = function (newProps) {
            if (newProps.tabActive && newProps.tabActive !== this.props.tabActive) {
                this.setState({ tabActive: newProps.tabActive });
            }
        };
        Tabs.prototype.getChildrens = function (children) {
            if (children === void 0) { children = this.props.children; }
            return React.Children.map(children, function (c) {
                return __assign({}, c.props);
            });
        };
        Tabs.prototype.setActive = function (index, e) {
            var _a = this.props, onAfterChange = _a.onAfterChange, onBeforeChange = _a.onBeforeChange;
            var $selectedPanel = this.refs['tab-panel'];
            var $selectedTabMenu = this.refs["tab-menu-" + index];
            if (onBeforeChange) {
                var cancel = onBeforeChange(index, $selectedPanel, $selectedTabMenu);
                if (cancel === false) {
                    return;
                }
            }
            this.setState({ tabActive: index }, function () {
                if (onAfterChange) {
                    onAfterChange(index, $selectedPanel, $selectedTabMenu);
                }
            });
        };
        Tabs.prototype._getMenuItems = function () {
            var _this = this;
            if (!this.props.children) {
                throw new Error('必须包含一个子元素');
            }
            var _a = this.props, tabClassName = _a.tabClassName, tabFontClassName = _a.tabFontClassName, tabBarUnderlineStyle = _a.tabBarUnderlineStyle, tabBarActiveTextColor = _a.tabBarActiveTextColor, tabBarInactiveTextColor = _a.tabBarInactiveTextColor;
            var $menuItems = this.getChildrens()
                .map(function ($panel, index) {
                var title = $panel.title;
                var ref = "tab-menu-" + (index + 1);
                var classes = classNames('tabs-menu-item', _this.state.tabActive === (index + 1) && !tabBarUnderlineStyle && 'is-active', _this.state.tabActive === (index + 1) && tabBarUnderlineStyle);
                var fontClass = classNames(tabFontClassName);
                return (React.createElement("div", { ref: ref, key: index, className: classes, onClick: function () { return _this.setActive(index + 1); } },
                    React.createElement("span", { className: fontClass, style: { color: _this.state.tabActive === (index + 1) ? tabBarActiveTextColor : tabBarInactiveTextColor } }, title)));
            });
            var classes = classNames('tabs-navigation', tabClassName);
            return (React.createElement("div", { className: classes },
                React.createElement("div", { className: 'tabs-menu' }, $menuItems)));
        };
        Tabs.prototype._getSelectedPanel = function () {
            var index = this.state.tabActive - 1;
            var $panel = this.props.children[index];
            return (React.createElement("div", { ref: 'tab-panel', className: 'tab-panel' }, $panel));
        };
        Tabs.prototype.render = function () {
            var className = classNames('tabs', this.props.className);
            return (React.createElement("div", { className: className },
                this._getMenuItems(),
                this._getSelectedPanel()));
        };
        Tabs.Item = Item;
        Tabs.defaultProps = {
            tabActive: 1,
        };
        return Tabs;
    }(React.PureComponent));
    exports.default = Tabs;
});
