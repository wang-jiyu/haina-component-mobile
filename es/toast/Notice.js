import * as React from 'react';
import * as classNames from 'classnames';
import './style/notice.scss';
class Notice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shouldClose: false,
        };
    }
    componentDidMount() {
        if (this.props.duration > 0) {
            this.closeTimer = setTimeout(() => {
                this.close();
            }, this.props.duration - 300); // 减掉消失动画300毫秒
        }
    }
    componentWillUnmount() {
        // 当有意外关闭的时候 清掉定时器
        this.clearCloseTimer();
    }
    clearCloseTimer() {
        if (this.closeTimer) {
            clearTimeout(this.closeTimer);
            this.closeTimer = null;
        }
    }
    close() {
        // 关闭的时候 应该先清掉倒数定时器
        // 然后开启过场动画
        // 等待动画结束 执行回调
        this.clearCloseTimer();
        this.setState({ shouldClose: true });
        this.timer = setTimeout(() => {
            if (this.props.onClose) {
                this.props.onClose();
            }
            clearTimeout(this.timer);
        }, 300);
    }
    render() {
        const { shouldClose } = this.state;
        const { prefixCls, type, iconClass, content } = this.props;
        return (React.createElement("div", { className: classNames([prefixCls,
                { 'info': type === 'info' },
                { 'success': type === 'success' },
                { 'warning': type === 'warning' },
                { 'error': type === 'error' },
                { 'leave': shouldClose }
            ]) },
            iconClass ? React.createElement("div", { className: `${prefixCls}-icon` },
                React.createElement("span", { className: classNames(['fa', iconClass]) })) : null,
            React.createElement("div", { className: `${prefixCls}-content` }, content)));
    }
}
Notice.defaultProps = {
    prefixCls: 'haina-notice',
    duration: 3000
};
export default Notice;
