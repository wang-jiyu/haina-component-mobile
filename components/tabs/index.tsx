import * as React from 'react';
import { TabsProps, TabItemProps } from './PropsType';
import * as classNames from 'classnames'
import './index.scss'

export class Item extends React.Component<TabItemProps, any>{
    render() {
        return <div>{this.props.children}</div>;
    }
}

export default class Tabs extends React.PureComponent<TabsProps, any> {


    public static Item = Item;

    static defaultProps = {
        tabActive: 1,
        allShowMode: false,
        tabPanelStyle:{}
    };

    constructor(props) {
        super(props)
        this.state = {
            tabActive: this.props.tabActive
        }
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
        return React.Children.map(children, (c: any) => {
            return {
                ...c.props as TabItemProps,
            };
        });
    }
    setActive(index: number, e?) {
        const { onAfterChange, onBeforeChange } = this.props
        var $selectedPanel = this.refs['tab-panel'];
        var $selectedTabMenu = this.refs[`tab-menu-${index}`];

        if (onBeforeChange) {
            var cancel = onBeforeChange(index, $selectedPanel, $selectedTabMenu);
            if (cancel === false) { return }
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
        const { tabClassName,tabMenuClassName,tabFontClassName, tabBarUnderlineStyle, tabBarActiveTextColor, tabBarInactiveTextColor } = this.props
        const $menuItems = this.getChildrens()
            .map(($panel, index) => {
                const { title, ...other } = $panel;
                const ref = `tab-menu-${index + 1}`;

                const classes = classNames(
                    'tabs-menu-item',
                    this.state.tabActive === (index + 1) && !tabBarUnderlineStyle && 'is-active',
                    this.state.tabActive === (index + 1) && tabBarUnderlineStyle
                );
                const fontClass = classNames(
                    tabFontClassName
                );
                return (
                    <div ref={ref} key={index} className={classes} onClick={() => this.setActive(index + 1)} {...other}>
                        <span className={fontClass} style={{ color: this.state.tabActive === (index + 1) ? tabBarActiveTextColor : tabBarInactiveTextColor }}>
                            {title}
                        </span>
                    </div>
                );
            });
        const classes = classNames('tabs-navigation', tabClassName)
        const tabMenuClass = classNames('tabs-menu', tabMenuClassName)
        return (
            <div className={classes}>
                <div className={tabMenuClass}>{$menuItems}</div>
            </div>
        );
    }
    _getSelectedPanel() {
        const {tabPanelClassName,tabPanelStyle} = this.props
        const classes = classNames('tab-panel', tabPanelClassName)
        var index = this.state.tabActive - 1;
        var $panel = this.props.children[index];
        if (this.props.allShowMode) {
            return (
                React.Children.map(this.props.children, (child,subindex) => {
                    return <div ref='tab-panel' className={classes} style={{display:subindex===index?'block':'none',...tabPanelStyle}}>
                        {child}
                    </div>
                })
            )
        }
        return (
            <div ref='tab-panel' className={classes} style={tabPanelStyle}>
                {$panel}
            </div>
        );
    }
    render() {
        var className = classNames('tabs', this.props.className);
        return (
            <div className={className}>
                {this._getMenuItems()}
                {this._getSelectedPanel()}
            </div>
        );
    }


}
