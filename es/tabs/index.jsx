define(["require", "exports", "react", "classnames", "./index.scss"], function (require, exports, React, classnames_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Item extends React.Component {
        render() {
            return <div>{this.props.children}</div>;
        }
    }
    exports.Item = Item;
    class Tabs extends React.PureComponent {
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
            const { tabClassName, tabFontClassName, tabBarUnderlineStyle, tabBarActiveTextColor, tabBarInactiveTextColor } = this.props;
            const $menuItems = this.getChildrens()
                .map(($panel, index) => {
                const title = $panel.title;
                const ref = `tab-menu-${index + 1}`;
                const classes = classnames_1.default('tabs-menu-item', tabClassName, this.state.tabActive === (index + 1) && !tabBarUnderlineStyle && 'is-active', this.state.tabActive === (index + 1) && tabBarUnderlineStyle);
                const fontClass = classnames_1.default(tabFontClassName);
                return (<div ref={ref} key={index} className={classes} onClick={() => this.setActive(index + 1)}>
                        <span className={fontClass} style={{ color: this.state.tabActive === (index + 1) ? tabBarActiveTextColor : tabBarInactiveTextColor }}>
                            {title}
                        </span>
                    </div>);
            });
            return (<div className='tabs-navigation'>
                <div className='tabs-menu'>{$menuItems}</div>
            </div>);
        }
        _getSelectedPanel() {
            var index = this.state.tabActive - 1;
            var $panel = this.props.children[index];
            return (<div ref='tab-panel' className='tab-panel'>
                {$panel}
            </div>);
        }
        render() {
            var className = classnames_1.default('tabs', this.props.className);
            return (<div className={className}>
                {this._getMenuItems()}
                {this._getSelectedPanel()}
            </div>);
        }
    }
    Tabs.Item = Item;
    Tabs.defaultProps = {
        tabActive: 1,
    };
    exports.default = Tabs;
});