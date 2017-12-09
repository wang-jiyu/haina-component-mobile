/// <reference types="react" />
import * as React from 'react';
import BasePropsType from './PropsType';
import './index.scss';
export interface InputItemProps extends BasePropsType {
    prefixCls?: string;
    className?: string;
}
declare class Input extends React.Component<InputItemProps, any> {
    static defaultProps: {
        prefixCls: string;
        type: string;
        editable: boolean;
        disabled: boolean;
        placeholder: string;
        clear: boolean;
        onChange: () => void;
        onBlur: () => void;
        onFocus: () => void;
        extra: string;
        onExtraClick: () => void;
        error: boolean;
        onErrorClick: () => void;
        labelNumber: number;
        updatePlaceholder: boolean;
        moneyKeyboardAlign: string;
    };
    inputRef: any;
    private debounceTimeout;
    private scrollIntoViewTimeout;
    constructor(props: any);
    componentWillReceiveProps(nextProps: any): void;
    componentWillUnmount(): void;
    onInputChange: (e: any) => void;
    onInputFocus: (value: any) => void;
    onInputBlur: (value: any) => void;
    onExtraClick: (e: any) => void;
    onErrorClick: (e: any) => void;
    clearInput: () => void;
    focus: () => void;
    render(): JSX.Element;
}
export default Input;
