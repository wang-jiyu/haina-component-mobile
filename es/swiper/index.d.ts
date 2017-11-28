/// <reference types="react" />
import * as React from 'react';
import { SwiperProps } from './PropsType';
import './index.scss';
export default class Swiper extends React.Component<SwiperProps, any> {
    swipe: any;
    container: any;
    static defaultProps: {
        childCount: number;
    };
    constructor(props: any);
    componentDidMount(): void;
    componentDidUpdate(prevProps: any): void;
    componentWillUnmount(): void;
    next(): void;
    prev(): void;
    slide(...args: any[]): void;
    getPos(): any;
    getNumSlides(): any;
    render(): JSX.Element;
}
