import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import BasePropsType from './PropsType';
import MyInput from './Input';
import TouchFeedback from 'rmc-feedback';

import './index.scss'

export interface InputItemProps extends BasePropsType {
    prefixCls?: string;
    className?: string;
}

function noop() { }

function fixControlledValue(value) {
    if (typeof value === 'undefined' || value === null) {
        return '';
    }
    return value;
}

class InputItem extends React.Component<InputItemProps, any> {
    static defaultProps = {
        prefixCls: 'haina-input',
        type: 'text',
        editable: true,
        disabled: false,
        placeholder: '',
        clear: false,
        onChange: noop,
        onBlur: noop,
        onFocus: noop,
        extra: '',
        onExtraClick: noop,
        error: false,
        onErrorClick: noop,
        labelNumber: 5,
        updatePlaceholder: false,
        moneyKeyboardAlign: 'right',
    };

    static contextTypes = {
        antLocale: PropTypes.object,
    };

    inputRef: any;
    private debounceTimeout: any;
    private scrollIntoViewTimeout: any;

    constructor(props) {
        super(props);
        this.state = {
            placeholder: props.placeholder,
            value: props.value || props.defaultValue || '',
        };
    }

    componentWillReceiveProps(nextProps) {
        if ('placeholder' in nextProps && !nextProps.updatePlaceholder) {
            this.setState({
                placeholder: nextProps.placeholder,
            });
        }
        if ('value' in nextProps) {
            this.setState({
                value: nextProps.value,
            });
        }
    }

    componentWillUnmount() {
        if (this.debounceTimeout) {
            clearTimeout(this.debounceTimeout);
            this.debounceTimeout = null;
        }
        if (this.scrollIntoViewTimeout) {
            clearTimeout(this.scrollIntoViewTimeout);
            this.scrollIntoViewTimeout = null;
        }
    }

    onInputChange = (e) => {
        let value = e.target.value;
        const { onChange, type } = this.props;

        switch (type) {
            case 'text':
                break;
            case 'bankCard':
                value = value.replace(/\D/g, '').replace(/(....)(?=.)/g, '$1 ');
                break;
            case 'phone':
                value = value.replace(/\D/g, '').substring(0, 11);
                const valueLen = value.length;
                if (valueLen > 3 && valueLen < 8) {
                    value = `${value.substr(0, 3)} ${value.substr(3)}`;
                } else if (valueLen >= 8) {
                    value = `${value.substr(0, 3)} ${value.substr(3, 4)} ${value.substr(7)}`;
                }
                break;
            case 'number':
                value = value.replace(/\D/g, '');
                break;
            case 'password':
                break;
            default:
                break;
        }
        if (!('value' in this.props)) {
            this.setState({ value });
        } else {
            this.setState({ value: this.props.value });
        }
        if (onChange) {
            onChange(value);
        }
    }

    onInputFocus = (value) => {
        if (this.debounceTimeout) {
            clearTimeout(this.debounceTimeout);
            this.debounceTimeout = null;
        }
        this.setState({
            focus: true,
        });
        if (document.activeElement.tagName.toLowerCase() === 'input') {
            this.scrollIntoViewTimeout = setTimeout(() => {
                try {
                    (document.activeElement as any).scrollIntoViewIfNeeded();
                } catch (e) { }
            }, 100);
        }
        if (this.props.onFocus) {
            this.props.onFocus(value);
        }
    }

    onInputBlur = (value) => {
        if (this.inputRef) { // this.inputRef may be null if customKeyboard unmount
            this.debounceTimeout = setTimeout(() => {
                if (document.activeElement !== this.inputRef.inputRef) {
                    this.setState({
                        focus: false,
                    });
                }
            }, 200);
        }
        if (this.props.onBlur) {
            this.props.onBlur(value);
        }
    }

    onExtraClick = (e) => {
        if (this.props.onExtraClick) {
            this.props.onExtraClick(e);
        }
    }

    onErrorClick = (e) => {
        if (this.props.onErrorClick) {
            this.props.onErrorClick(e);
        }
    }

    clearInput = () => {
        if (this.props.type !== 'password' && this.props.updatePlaceholder) {
            this.setState({
                placeholder: this.props.value,
            });
        }
        this.setState({
            value: '',
        });
        if (this.props.onChange) {
            this.props.onChange('');
        }
        this.focus();
    }

    focus = () => {
        this.inputRef.focus();
    }
    render() {
        const { prefixCls,
            editable, style,
            clear, children, error, className, extra, labelNumber, onExtraClick, onErrorClick,
            updatePlaceholder, type, locale, moneyKeyboardAlign, ...restProps,
    } = this.props;
        const { defaultValue, name, disabled, maxLength } = restProps;
        const { value } = this.state;


        const { placeholder, focus } = this.state;

        const wrapCls = classnames(
            `${prefixCls}-item`,
            className,
            {
                [`${prefixCls}-disabled`]: disabled,
                [`${prefixCls}-error`]: error,
                [`${prefixCls}-focus`]: focus,
                [`${prefixCls}-android`]: focus,
            },
        );

        const labelCls = `${prefixCls}-label`

        const controlCls = `haina-input-control`;

        let inputType: any = 'text';
        if (type === 'bankCard' || type === 'phone') {
            inputType = 'tel';
        } else if (type === 'password') {
            inputType = 'password';
        } else if (type === 'digit') {
            inputType = 'number';
        } else if (type !== 'text' && type !== 'number') {
            inputType = type;
        }

        let patternProps;
        if (type === 'number') {
            patternProps = {
                pattern: '[0-9]*',
            };
        }

        let classNameProps;
        if (type === 'digit') {
            classNameProps = {
                className: 'h5numInput',
            };
        }

        return (
            <div className={wrapCls}>
                <div className={`haina-list-line`}>
                    {children ? (<div className={labelCls}>{children}</div>) : null}
                    <div className={controlCls}>
                        {(
                            <MyInput
                                {...patternProps}
                                {...restProps}
                                {...classNameProps}
                                value={fixControlledValue(value)}
                                defaultValue={defaultValue}
                                ref={el => this.inputRef = el}
                                style={style}
                                type={inputType}
                                maxLength={maxLength}
                                name={name}
                                placeholder={placeholder}
                                onChange={this.onInputChange}
                                onFocus={this.onInputFocus}
                                onBlur={this.onInputBlur}
                                readOnly={!editable}
                                disabled={disabled}
                            />
                        )}
                    </div>
                    {clear && editable && !disabled && (value && `${value}`.length > 0) ?
                        <TouchFeedback activeClassName={`${prefixCls}-clear-active`}>
                            <div className={`${prefixCls}-clear`} onClick={this.clearInput} />
                        </TouchFeedback>
                        : null}
                    {error ? (<div className={`${prefixCls}-error-extra`} onClick={this.onErrorClick} />) : null}
                    {extra !== '' ? <div className={`${prefixCls}-extra`} onClick={this.onExtraClick}>{extra}</div> : null}
                </div>
            </div>
        );
    }
}

export default InputItem;
