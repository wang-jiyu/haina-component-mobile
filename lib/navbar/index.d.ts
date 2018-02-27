/// <reference types="react" />
import * as React from 'react';
import NavBarProps from './PropsType';
import './index.scss';
export default class NavBar extends React.Component<NavBarProps, any> {
    static defaultProps: {
        prefixCls: string;
        mode: string;
        onLeftClick: () => void;
    };
    render(): JSX.Element;
}
