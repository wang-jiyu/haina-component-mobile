/// <reference types="react" />
import * as React from 'react';
interface NavBarProps {
    prefixCls?: string;
    className?: string;
    mode?: 'niuniu' | 'light';
    icon?: React.ReactNode;
    leftContent?: any;
    rightContent?: any;
    onLeftClick?: () => void;
}
export default NavBarProps;
