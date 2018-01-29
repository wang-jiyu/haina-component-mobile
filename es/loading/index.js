import * as React from 'react';
import './loading.scss';
export default class Loading extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            balde: 12,
            style: {}
        };
    }
    componentDidMount() {
        let value = this.props.size;
        this.setStyle({
            width: value,
            height: value
        });
    }
    componentWillReceiveProps(nextProps) {
        let value = 40;
        if (!nextProps.size) {
            value = 40;
        }
        else {
            value = nextProps.size;
        }
        this.setStyle({
            width: value,
            height: value
        });
    }
    setStyle(style) {
        this.setState({
            style
        });
    }
    render() {
        const { balde, style } = this.state;
        return (React.createElement("div", { className: "haina-loading" },
            React.createElement("span", { className: "haina-loading-spinners", style: style }, Array.from(new Array(balde), (el, index) => {
                return React.createElement("i", { key: index, className: "haina-loading-spinner" });
            }))));
    }
}
Loading.defaultProps = {
    size: 40
};
