import * as React from 'react';
import * as classNames from 'classnames';
import Flipsnap from './lib/flipsnap';
import './index.scss';
export default class Swiper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        const { swipeOptions, children } = this.props;
        this.swipe = Flipsnap(this.refs.container, {
            distance: swipeOptions.distance,
            currentPoint: swipeOptions.currentPoint
        });
        // 各个阶段事件监听
        this.swipe.element.addEventListener('fstouchstart', function (ev) {
            swipeOptions.swTouchstart && swipeOptions.swTouchstart(ev);
        }, false);
        this.swipe.element.addEventListener('fstouchmove', function (ev) {
            swipeOptions.swTouchmove && swipeOptions.swTouchmove(ev);
        }, false);
        this.swipe.element.addEventListener('fstouchend', ev => {
            swipeOptions.swTouchend && swipeOptions.swTouchend(ev);
        }, false);
    }
    // 注销
    componentWillUnmount() {
        this.swipe.destroy();
    }
    refresh() {
        this.swipe.refresh();
    }
    render() {
        const { id, className, wrapperClass, childClass, children } = this.props;
        const classes = classNames('className', wrapperClass);
        // todo 计算 父级包裹元素的宽度
        return (React.createElement("div", { className: classes, ref: "container" }, children));
    }
}
Swiper.defaultProps = {
    childCount: 0
};
