/// <reference types="react" />
import * as React from 'react';
import './index.scss';
export interface IconPropType {
    type: string;
    className?: string;
    style?: React.CSSProperties;
    size?: 'xxs' | 'xs' | 'sm' | 'md' | 'lg';
    onClick?: (e?: any) => void;
}
export default class Icon extends React.Component<IconPropType, any> {
    static defaultProps: {
        size: string;
    };
    componentDidMount(): void;
    render(): JSX.Element;
}
