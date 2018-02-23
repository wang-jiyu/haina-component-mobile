/// <reference types="react" />
import * as React from 'react';
export interface IBubbleProps {
    y: number;
}
export default class Bubble extends React.Component<IBubbleProps, any> {
    ratio: number;
    width: number;
    height: number;
    initRadius: number;
    minHeadRadius: number;
    minTailRadius: number;
    initArrowRadius: number;
    minArrowRadius: number;
    arrowWidth: number;
    maxDistance: number;
    initCenterX: number;
    initCenterY: number;
    headCenter: {
        x: number;
        y: number;
    };
    style: {
        width: number;
        height: number;
    };
    static defaultProps: {
        y: number;
    };
    distance: number;
    constructor(props: any);
    componentWillMount(): void;
    componentDidMount(): void;
    componentDidUpdate(): void;
    componentWillReceiveProps(nextProps: any): void;
    _draw(): void;
    _drawBubble(ctx: any): void;
    _drawArrow(ctx: any): void;
    render(): JSX.Element;
}
