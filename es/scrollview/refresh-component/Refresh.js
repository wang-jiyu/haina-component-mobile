define(["require", "exports", "react", "./index.scss"], function (require, exports, React) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class SpinnerRefresh extends React.Component {
        constructor(props) {
            super(props);
        }
        conditionRender() {
            const props = this.props;
            if (props.isRefreshing) {
                return (React.createElement("div", { className: "spinner-refresh__animation" },
                    React.createElement("div", { className: "spinner-refresh__loader" })));
            }
            return (React.createElement("div", { className: "spinner-refresh__text" }, props.progress >= 100 ? '松手更新...' : '下拉更新...'));
        }
        render() {
            const props = this.props;
            return (React.createElement("div", { className: "spinner-refresh" }, this.conditionRender()));
        }
    }
    exports.default = SpinnerRefresh;
});
