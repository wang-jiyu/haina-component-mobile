import * as React from 'react';
import LazyLoad from 'react-lazyload';
export default class ScrollBack extends React.Component {
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
        const { offset, overflow, resize, scroll } = this.props;
        return (React.createElement(LazyLoad, { offset: offset, overflow: overflow, resize: resize, scroll: scroll }, this.props.children));
    }
}
ScrollBack.defaultProps = {
    offset: -50,
    overflow: false,
    resize: true,
    scroll: true,
    loaded: false
};
