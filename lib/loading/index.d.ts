/// <reference types="react" />
import * as React from 'react';
import './loading.scss';
export interface ILoadingProps {
    size?: number;
}
export default class Loading extends React.Component<ILoadingProps, any> {
    static defaultProps: {
        size: number;
    };
    state: {
        balde: number;
        style: {};
    };
    constructor(props: any);
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: any): void;
    setStyle(style: any): void;
    render(): JSX.Element;
}
