var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
define(["require", "exports", "react", "prop-types", "classnames", "./Input", "rmc-feedback", "./index.scss"], function (require, exports, React, prop_types_1, classnames_1, Input_1, rmc_feedback_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function noop() { }
    function fixControlledValue(value) {
        if (typeof value === 'undefined' || value === null) {
            return '';
        }
        return value;
    }
    class Input extends React.Component {
        constructor(props) {
            super(props);
            this.onInputChange = (e) => {
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
                        }
                        else if (valueLen >= 8) {
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
                }
                else {
                    this.setState({ value: this.props.value });
                }
                if (onChange) {
                    onChange(value);
                }
            };
            this.onInputFocus = (value) => {
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
                            document.activeElement.scrollIntoViewIfNeeded();
                        }
                        catch (e) { }
                    }, 100);
                }
                if (this.props.onFocus) {
                    this.props.onFocus(value);
                }
            };
            this.onInputBlur = (value) => {
                if (this.inputRef) {
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
            };
            this.onExtraClick = (e) => {
                if (this.props.onExtraClick) {
                    this.props.onExtraClick(e);
                }
            };
            this.onErrorClick = (e) => {
                if (this.props.onErrorClick) {
                    this.props.onErrorClick(e);
                }
            };
            this.clearInput = () => {
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
            };
            this.focus = () => {
                this.inputRef.focus();
            };
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
        render() {
            const _a = this.props, { prefixCls, editable, style, clear, children, error, className, extra, labelNumber, onExtraClick, onErrorClick, updatePlaceholder, type, locale, moneyKeyboardAlign } = _a, restProps = __rest(_a, ["prefixCls", "editable", "style", "clear", "children", "error", "className", "extra", "labelNumber", "onExtraClick", "onErrorClick", "updatePlaceholder", "type", "locale", "moneyKeyboardAlign"]);
            const { defaultValue, name, disabled, maxLength } = restProps;
            const { value } = this.state;
            const { placeholder, focus } = this.state;
            const wrapCls = classnames_1.default(`${prefixCls}-item`, className, {
                [`${prefixCls}-disabled`]: disabled,
                [`${prefixCls}-error`]: error,
                [`${prefixCls}-focus`]: focus,
                [`${prefixCls}-android`]: focus,
            });
            const labelCls = `${prefixCls}-label`;
            const controlCls = `haina-input-control`;
            let inputType = 'text';
            if (type === 'bankCard' || type === 'phone') {
                inputType = 'tel';
            }
            else if (type === 'password') {
                inputType = 'password';
            }
            else if (type === 'digit') {
                inputType = 'number';
            }
            else if (type !== 'text' && type !== 'number') {
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
            return (<div className={wrapCls}>
                <div className={`haina-list-line`}>
                    {children ? (<div className={labelCls}>{children}</div>) : null}
                    <div className={controlCls}>
                        {(<Input_1.default {...patternProps} {...restProps} {...classNameProps} value={fixControlledValue(value)} defaultValue={defaultValue} ref={el => this.inputRef = el} style={style} type={inputType} maxLength={maxLength} name={name} placeholder={placeholder} onChange={this.onInputChange} onFocus={this.onInputFocus} onBlur={this.onInputBlur} readOnly={!editable} disabled={disabled}/>)}
                    </div>
                    {clear && editable && !disabled && (value && `${value}`.length > 0) ?
                <rmc_feedback_1.default activeClassName={`${prefixCls}-clear-active`}>
                            <div className={`${prefixCls}-clear`} onClick={this.clearInput}/>
                        </rmc_feedback_1.default>
                : null}
                    {error ? (<div className={`${prefixCls}-error-extra`} onClick={this.onErrorClick}/>) : null}
                    {extra !== '' ? <div className={`${prefixCls}-extra`} onClick={this.onExtraClick}>{extra}</div> : null}
                </div>
            </div>);
        }
    }
    Input.defaultProps = {
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
    Input.contextTypes = {
        antLocale: prop_types_1.default.object,
    };
    exports.default = Input;
});
