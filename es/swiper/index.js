define(["require", "exports", "react", "classnames", "./lib/flipsnap", "./index.scss"], function (require, exports, React, classNames, flipsnap_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Swiper extends React.Component {
        constructor(props) {
            super(props);
            this.state = {};
        }
        componentDidMount() {
            const { swipeOptions, children } = this.props;
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
            this.swipe.element.addEventListener('fstouchend', ev => {
                swipeOptions.swTouchend && swipeOptions.swTouchend(ev);
            }, false);
        }
        componentWillUnmount() {
            this.swipe.destroy();
        }
        refresh() {
            this.swipe.refresh();
        }
        render() {
            const { id, className, wrapperClass, childClass, children } = this.props;
            const classes = classNames('className', wrapperClass);
            return (React.createElement("div", { className: classes, ref: "container" }, children));
        }
    }
    Swiper.defaultProps = {
        childCount: 0
    };
    exports.default = Swiper;
});
