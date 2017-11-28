define(["require", "exports", "react", "classnames", "swipe-js-iso", "./index.scss"], function (require, exports, React, classNames, swipe_js_iso_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Swiper extends React.Component {
        constructor(props) {
            super(props);
            this.state = {};
        }
        componentDidMount() {
            const { swipeOptions } = this.props;
            this.swipe = swipe_js_iso_1(this.container, swipeOptions);
        }
        componentDidUpdate(prevProps) {
            const { childCount, swipeOptions } = this.props;
            if (prevProps.childCount !== childCount) {
                this.swipe.kill();
                this.swipe = swipe_js_iso_1(this.container, swipeOptions);
            }
        }
        componentWillUnmount() {
            this.swipe.kill();
            this.swipe = void 0;
        }
        next() {
            this.swipe.next();
        }
        prev() {
            this.swipe.prev();
        }
        slide(...args) {
            this.swipe.slide(...args);
        }
        getPos() {
            return this.swipe.getPos();
        }
        getNumSlides() {
            return this.swipe.getNumSlides();
        }
        render() {
            const { id, className, containerClass, wrapperClass, childClass, children } = this.props;
            const classes = classNames('haina-swiper', className, containerClass);
            const wrapperClasses = classNames('haina-wrapper', wrapperClass);
            return (React.createElement("div", { ref: container => this.container = container, id: id, className: classes },
                React.createElement("div", { className: wrapperClasses }, React.Children.map(children, (child) => {
                    if (!child) {
                        return null;
                    }
                    const childClasses = classNames('haina-swiper-child', childClass);
                    return React.createElement("div", { className: childClasses, style: {
                            float: 'left',
                            position: 'relative',
                            transitionProperty: 'transform'
                        } }, child);
                }))));
        }
    }
    Swiper.defaultProps = {
        childCount: 0
    };
    exports.default = Swiper;
});
