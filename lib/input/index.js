"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var classnames = require("classnames");
var Input_1 = require("./Input");
require("./index.scss");
function noop() { }
function fixControlledValue(value) {
    if (typeof value === 'undefined' || value === null) {
        return '';
    }
    return value;
}
var Input = (function (_super) {
    __extends(Input, _super);
    function Input(props) {
        var _this = _super.call(this, props) || this;
        _this.onInputChange = function (e) {
            var value = e.target.value;
            var _a = _this.props, onChange = _a.onChange, type = _a.type;
            switch (type) {
                case 'text':
                    break;
                case 'bankCard':
                    value = value.replace(/\D/g, '').replace(/(....)(?=.)/g, '$1 ');
                    break;
                case 'phone':
                    value = value.replace(/\D/g, '').substring(0, 11);
                    var valueLen = value.length;
                    if (valueLen > 3 && valueLen < 8) {
                        value = value.substr(0, 3) + " " + value.substr(3);
                    }
                    else if (valueLen >= 8) {
                        value = value.substr(0, 3) + " " + value.substr(3, 4) + " " + value.substr(7);
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
            if (!('value' in _this.props)) {
                _this.setState({ value: value });
            }
            else {
                _this.setState({ value: _this.props.value });
            }
            if (onChange) {
                onChange(value);
            }
        };
        _this.onInputFocus = function (value) {
            if (_this.debounceTimeout) {
                clearTimeout(_this.debounceTimeout);
                _this.debounceTimeout = null;
            }
            _this.setState({
                focus: true,
            });
            if (document.activeElement.tagName.toLowerCase() === 'input') {
                _this.scrollIntoViewTimeout = setTimeout(function () {
                    try {
                        document.activeElement.scrollIntoViewIfNeeded();
                    }
                    catch (e) { }
                }, 100);
            }
            if (_this.props.onFocus) {
                _this.props.onFocus(value);
            }
        };
        _this.onInputBlur = function (value) {
            if (_this.inputRef) {
                _this.debounceTimeout = setTimeout(function () {
                    if (document.activeElement !== _this.inputRef.inputRef) {
                        _this.setState({
                            focus: false,
                        });
                    }
                }, 200);
            }
            if (_this.props.onBlur) {
                _this.props.onBlur(value);
            }
        };
        _this.onExtraClick = function (e) {
            if (_this.props.onExtraClick) {
                _this.props.onExtraClick(e);
            }
        };
        _this.onErrorClick = function (e) {
            if (_this.props.onErrorClick) {
                _this.props.onErrorClick(e);
            }
        };
        _this.clearInput = function () {
            if (_this.props.type !== 'password' && _this.props.updatePlaceholder) {
                _this.setState({
                    placeholder: _this.props.value,
                });
            }
            _this.setState({
                value: '',
            });
            if (_this.props.onChange) {
                _this.props.onChange('');
            }
            _this.focus();
        };
        _this.focus = function () {
            _this.inputRef.focus();
        };
        _this.state = {
            placeholder: props.placeholder,
            value: props.value || props.defaultValue || '',
        };
        return _this;
    }
    Input.prototype.componentWillReceiveProps = function (nextProps) {
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
    };
    Input.prototype.componentWillUnmount = function () {
        if (this.debounceTimeout) {
            clearTimeout(this.debounceTimeout);
            this.debounceTimeout = null;
        }
        if (this.scrollIntoViewTimeout) {
            clearTimeout(this.scrollIntoViewTimeout);
            this.scrollIntoViewTimeout = null;
        }
    };
    Input.prototype.render = function () {
        var _this = this;
        var _a = this.props, prefixCls = _a.prefixCls, editable = _a.editable, style = _a.style, clear = _a.clear, children = _a.children, error = _a.error, className = _a.className, extra = _a.extra, labelNumber = _a.labelNumber, onExtraClick = _a.onExtraClick, onErrorClick = _a.onErrorClick, updatePlaceholder = _a.updatePlaceholder, type = _a.type, locale = _a.locale, moneyKeyboardAlign = _a.moneyKeyboardAlign, restProps = __rest(_a, ["prefixCls", "editable", "style", "clear", "children", "error", "className", "extra", "labelNumber", "onExtraClick", "onErrorClick", "updatePlaceholder", "type", "locale", "moneyKeyboardAlign"]);
        var defaultValue = restProps.defaultValue, name = restProps.name, disabled = restProps.disabled, maxLength = restProps.maxLength;
        var value = this.state.value;
        var _b = this.state, placeholder = _b.placeholder, focus = _b.focus;
        var wrapCls = classnames(prefixCls + "-item", className, (_c = {},
            _c[prefixCls + "-disabled"] = disabled,
            _c[prefixCls + "-error"] = error,
            _c[prefixCls + "-focus"] = focus,
            _c[prefixCls + "-android"] = focus,
            _c));
        var labelCls = prefixCls + "-label";
        var controlCls = "haina-input-control";
        var inputType = 'text';
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
        var patternProps;
        if (type === 'number') {
            patternProps = {
                pattern: '[0-9]*',
            };
        }
        var classNameProps;
        if (type === 'digit') {
            classNameProps = {
                className: 'h5numInput',
            };
        }
        return (React.createElement("div", { className: wrapCls },
            React.createElement("div", { className: "haina-list-line" },
                children ? (React.createElement("div", { className: labelCls }, children)) : null,
                React.createElement("div", { className: controlCls }, (React.createElement(Input_1.default, __assign({}, patternProps, restProps, classNameProps, { value: fixControlledValue(value), defaultValue: defaultValue, ref: function (el) { return _this.inputRef = el; }, style: style, type: inputType, maxLength: maxLength, name: name, placeholder: placeholder, onChange: this.onInputChange, onFocus: this.onInputFocus, onBlur: this.onInputBlur, readOnly: !editable, disabled: disabled })))),
                clear && editable && !disabled && (value && ("" + value).length > 0) ?
                    React.createElement("div", { className: prefixCls + "-clear", onClick: this.clearInput })
                    : null,
                error ? (React.createElement("div", { className: prefixCls + "-error-extra", onClick: this.onErrorClick })) : null,
                extra !== '' ? React.createElement("div", { className: prefixCls + "-extra", onClick: this.onExtraClick }, extra) : null)));
        var _c;
    };
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
    return Input;
}(React.Component));
exports.default = Input;
