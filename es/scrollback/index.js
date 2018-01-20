import * as React from 'react';
import LazyLoad from 'react-lazyload';
class ScrollBackItem extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        const { loaded, callback } = this.props;
        if (loaded) {
            callback();
        }
    }
    componentWillReceiveProps(nextProps) {
        const { callback } = this.props;
        if (nextProps.loaded) {
            callback();
        }
    }
    render() {
        return (this.props.children);
    }
}
export default class ScrollBack extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { offset, overflow, resize, scroll, loaded, callback, height } = this.props;
        return (React.createElement(LazyLoad, { height: height, offset: offset, overflow: overflow, resize: resize, scroll: scroll },
            React.createElement(ScrollBackItem, { loaded: loaded, callback: callback }, this.props.children)));
    }
}
ScrollBack.defaultProps = {
    offset: -50,
    overflow: false,
    resize: true,
    scroll: true,
    loaded: false
};
