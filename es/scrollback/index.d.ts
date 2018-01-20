/// <reference types="react" />
import * as React from 'react';
import ILazyLoad from './PropsTypes';
export default class ScrollBack extends React.Component<ILazyLoad, any> {
    static defaultProps: {
        offset: number;
        overflow: boolean;
        resize: boolean;
        scroll: boolean;
        loaded: boolean;
    };
    constructor(props: any);
    render(): JSX.Element;
}
