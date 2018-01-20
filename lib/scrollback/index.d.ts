/// <reference types="react" />
import * as React from 'react';
export default class ScrollBack extends React.Component<any, any> {
    static defaultProps: {
        offset: number;
        overflow: boolean;
        resize: boolean;
        scroll: boolean;
        loaded: boolean;
    };
    constructor(props: any);
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: any): void;
    render(): JSX.Element;
}
