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
var Bubble = /** @class */ (function (_super) {
    __extends(Bubble, _super);
    function Bubble(props) {
        var _this = _super.call(this, props) || this;
        _this.ratio = parseInt(document.documentElement.dataset.dpr);
        _this.width = 50 * _this.ratio;
        _this.height = 80 * _this.ratio;
        _this.initRadius = 18 * _this.ratio;
        _this.minHeadRadius = 12 * _this.ratio;
        _this.minTailRadius = 5 * _this.ratio;
        _this.initArrowRadius = 10 * _this.ratio;
        _this.minArrowRadius = 6 * _this.ratio;
        _this.arrowWidth = 3 * _this.ratio;
        _this.maxDistance = 40 * _this.ratio;
        _this.initCenterX = 25 * _this.ratio;
        _this.initCenterY = 25 * _this.ratio;
        _this.headCenter = {
            x: _this.initCenterX,
            y: _this.initCenterY
        };
        _this.style = {
            width: _this.width,
            height: _this.height
        };
        _this.distance = Math.max(0, Math.min(_this.props.y * _this.ratio, _this.maxDistance));
        return _this;
    }
    Bubble.prototype.componentWillMount = function () {
    };
    Bubble.prototype.componentDidMount = function () {
    };
    Bubble.prototype.componentDidUpdate = function () {
    };
    Bubble.prototype.componentWillReceiveProps = function (nextProps) {
        this.distance = Math.max(0, Math.min(nextProps.y * this.ratio, this.maxDistance));
        this.style = {
            width: this.width,
            height: this.height
        };
        this._draw();
    };
    Bubble.prototype._draw = function () {
        var bubble = this.refs.bubble;
        var ctx = bubble.getContext('2d');
        ctx.clearRect(0, 0, bubble.width, bubble.height);
        this._drawBubble(ctx);
        this._drawArrow(ctx);
    };
    Bubble.prototype._drawBubble = function (ctx) {
        ctx.save();
        ctx.beginPath();
        var rate = this.distance / this.maxDistance;
        var headRadius = this.initRadius - (this.initRadius - this.minHeadRadius) * rate;
        this.headCenter.y = this.initCenterY - (this.initRadius - this.minHeadRadius) * rate;
        // upper semicircle
        ctx.arc(this.headCenter.x, this.headCenter.y, headRadius, 0, Math.PI, true);
        // left bessel
        var tailRadius = this.initRadius - (this.initRadius - this.minTailRadius) * rate;
        var tailCenter = {
            x: this.headCenter.x,
            y: this.headCenter.y + this.distance
        };
        var tailPointL = {
            x: tailCenter.x - tailRadius,
            y: tailCenter.y
        };
        var controlPointL = {
            x: tailPointL.x,
            y: tailPointL.y - this.distance / 2
        };
        ctx.quadraticCurveTo(controlPointL.x, controlPointL.y, tailPointL.x, tailPointL.y);
        // lower semicircle
        ctx.arc(tailCenter.x, tailCenter.y, tailRadius, Math.PI, 0, true);
        // right bessel
        var headPointR = {
            x: this.headCenter.x + headRadius,
            y: this.headCenter.y
        };
        var controlPointR = {
            x: tailCenter.x + tailRadius,
            y: headPointR.y + this.distance / 2
        };
        ctx.quadraticCurveTo(controlPointR.x, controlPointR.y, headPointR.x, headPointR.y);
        ctx.fillStyle = 'rgb(170,170,170)';
        ctx.fill();
        ctx.strokeStyle = 'rgb(153,153,153)';
        ctx.stroke();
        ctx.restore();
    };
    Bubble.prototype._drawArrow = function (ctx) {
        ctx.save();
        ctx.beginPath();
        var rate = this.distance / this.maxDistance;
        var arrowRadius = this.initArrowRadius - (this.initArrowRadius - this.minArrowRadius) * rate;
        // inner circle
        ctx.arc(this.headCenter.x, this.headCenter.y, arrowRadius - (this.arrowWidth - rate), -Math.PI / 2, 0, true);
        // outer circle
        ctx.arc(this.headCenter.x, this.headCenter.y, arrowRadius, 0, Math.PI * 3 / 2, false);
        ctx.lineTo(this.headCenter.x, this.headCenter.y - arrowRadius - this.arrowWidth / 2 + rate);
        ctx.lineTo(this.headCenter.x + this.arrowWidth * 2 - rate * 2, this.headCenter.y - arrowRadius + this.arrowWidth / 2);
        ctx.lineTo(this.headCenter.x, this.headCenter.y - arrowRadius + this.arrowWidth * 3 / 2 - rate);
        ctx.fillStyle = 'rgb(255,255,255)';
        ctx.fill();
        ctx.strokeStyle = 'rgb(170,170,170)';
        ctx.stroke();
        ctx.restore();
    };
    Bubble.prototype.render = function () {
        return (React.createElement("canvas", { ref: "bubble", width: this.width, height: this.height, style: this.style }));
    };
    Bubble.defaultProps = {
        y: 0
    };
    return Bubble;
}(React.Component));
exports.default = Bubble;
