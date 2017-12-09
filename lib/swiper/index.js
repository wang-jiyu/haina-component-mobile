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
define(["require", "exports", "react", "classnames", "./lib/flipsnap", "./index.scss"], function (require, exports, React, classNames, flipsnap_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Swiper = (function (_super) {
        __extends(Swiper, _super);
        function Swiper(props) {
            var _this = _super.call(this, props) || this;
            _this.state = {};
            return _this;
        }
        Swiper.prototype.componentDidMount = function () {
            var _a = this.props, swipeOptions = _a.swipeOptions, children = _a.children;
            this.swipe = flipsnap_1.default(this.refs.container, {
                distance: swipeOptions.distance,
                currentPoint: swipeOptions.currentPoint
            });
            this.swipe.element.addEventListener('fstouchstart', function (ev) {
                swipeOptions.swTouchstart && swipeOptions.swTouchstart(ev);
            }, false);
            this.swipe.element.addEventListener('fstouchmove', function (ev) {
                swipeOptions.swTouchmove && swipeOptions.swTouchmove(ev);
            }, false);
            this.swipe.element.addEventListener('fstouchend', function (ev) {
                swipeOptions.swTouchend && swipeOptions.swTouchend(ev);
            }, false);
        };
        Swiper.prototype.componentWillUnmount = function () {
            this.swipe.destroy();
        };
        Swiper.prototype.refresh = function () {
            this.swipe.refresh();
        };
        Swiper.prototype.render = function () {
            var _a = this.props, id = _a.id, className = _a.className, wrapperClass = _a.wrapperClass, childClass = _a.childClass, children = _a.children;
            var classes = classNames('className', wrapperClass);
            return (React.createElement("div", { className: classes, ref: "container" }, children));
        };
        Swiper.defaultProps = {
            childCount: 0
        };
        return Swiper;
    }(React.Component));
    exports.default = Swiper;
});
