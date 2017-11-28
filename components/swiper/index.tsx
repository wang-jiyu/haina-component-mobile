import * as React from 'react';
import { SwiperProps } from './PropsType';
import * as classNames from 'classnames'
import Swipe from 'swipe-js-iso';
import './index.scss'

export default class Swiper extends React.Component<SwiperProps, any> {

    public swipe

    public container

    static defaultProps = {
        childCount: 0
    };

    constructor(props) {
        super(props)
        this.state = {
        }
    }

    componentDidMount() {
        const { swipeOptions } = this.props;

        this.swipe = Swipe(this.container, swipeOptions);
    }
    componentDidUpdate(prevProps) {
        const { childCount, swipeOptions } = this.props;

        if (prevProps.childCount !== childCount) {
            this.swipe.kill();
            this.swipe = Swipe(this.container, swipeOptions);
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
        const classes = classNames(
            'haina-swiper',
            className,
            containerClass
        )
        const wrapperClasses = classNames(
            'haina-wrapper',
            wrapperClass
        )
        return (
            <div ref={container => this.container = container} id={id} className={classes}>
                <div className={wrapperClasses}>
                    {React.Children.map(children, (child) => {
                        if (!child) {
                            return null;
                        }
                        const childClasses = classNames(
                            'haina-swiper-child',
                            childClass
                        )
                        return React.cloneElement(child as any, { className: childClasses });
                    })}
                </div>
            </div>
        );
    }


}
