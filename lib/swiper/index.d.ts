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
    componentWillUnmount(): void;
    refresh(): void;
    render(): JSX.Element;
}
