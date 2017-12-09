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
define(["require", "exports", "react", "./index.scss"], function (require, exports, React) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SpinnerRefresh = (function (_super) {
        __extends(SpinnerRefresh, _super);
        function SpinnerRefresh(props) {
            return _super.call(this, props) || this;
        }
        SpinnerRefresh.prototype.conditionRender = function () {
            var props = this.props;
            if (props.isRefreshing) {
                return (React.createElement("div", { className: "spinner-refresh__animation" },
                    React.createElement("div", { className: "spinner-refresh__loader" })));
            }
            return (React.createElement("div", { className: "spinner-refresh__text" }, props.progress >= 100 ? '松手更新...' : '下拉更新...'));
        };
        SpinnerRefresh.prototype.render = function () {
            var props = this.props;
            return (React.createElement("div", { className: "spinner-refresh" }, this.conditionRender()));
        };
        return SpinnerRefresh;
    }(React.Component));
    exports.default = SpinnerRefresh;
});
