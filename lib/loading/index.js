"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
require("./loading.scss");
var Loading = /** @class */ (function (_super) {
    __extends(Loading, _super);
    function Loading(props) {
        var _this = _super.call(this, props) || this;
        _this.ratio = parseInt(document.documentElement.dataset.dpr);
        _this.state = {
            balde: 12,
            style: {}
        };
        return _this;
    }
    Loading.prototype.componentDidMount = function () {
        var value = this.props.size;
        this.setStyle({
            width: this.ratio * value,
            height: this.ratio * value
        });
    };
    Loading.prototype.componentWillReceiveProps = function (nextProps) {
        var value = 20;
        if (!nextProps.size) {
            value = 20;
        }
        else {
            value = nextProps.size;
        }
        this.setStyle({
            width: this.ratio * value,
            height: this.ratio * value
        });
    };
    Loading.prototype.setStyle = function (style) {
        this.setState({
            style: style
        });
    };
    Loading.prototype.render = function () {
        var _a = this.state, balde = _a.balde, style = _a.style;
        return (React.createElement("div", { className: "haina-loading" },
            React.createElement("span", { className: "haina-loading-spinners", style: style }, Array.from(new Array(balde), function (el, index) {
                return React.createElement("i", { key: index, className: "haina-loading-spinner" });
            }))));
    };
    Loading.defaultProps = {
        size: 20
    };
    return Loading;
}(React.Component));
exports.default = Loading;
