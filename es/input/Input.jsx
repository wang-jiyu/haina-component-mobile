var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
define(["require", "exports", "react"], function (require, exports, React) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Input extends React.Component {
        constructor() {
            super(...arguments);
            this.onInputBlur = (e) => {
                const value = e.target.value;
                if (this.props.onBlur) {
                    this.props.onBlur(value);
                }
            };
            this.onInputFocus = (e) => {
                const value = e.target.value;
                if (this.props.onFocus) {
                    this.props.onFocus(value);
                }
            };
            this.focus = () => {
                this.inputRef.focus();
            };
        }
        render() {
            const _a = this.props, { onBlur, onFocus } = _a, others = __rest(_a, ["onBlur", "onFocus"]);
            return (<input ref={el => this.inputRef = el} onBlur={this.onInputBlur} onFocus={this.onInputFocus} {...others}/>);
        }
    }
    exports.default = Input;
});
