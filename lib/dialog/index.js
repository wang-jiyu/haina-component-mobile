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
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ReactDOM = require("react-dom");
var Dialog_1 = require("./Dialog");
require("./dialog.scss");
require("./mask.scss");
function noop() {
}
var IS_REACT_16 = true;
var DialogWrap = /** @class */ (function (_super) {
    __extends(DialogWrap, _super);
    function DialogWrap() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.saveRef = function (node) {
            if (IS_REACT_16) {
                _this._component = node;
            }
        };
        _this.getComponent = function (visible) {
            var props = __assign({}, _this.props);
            ['visible', 'onAnimateLeave'].forEach(function (key) {
                if (props.hasOwnProperty(key)) {
                    delete props[key];
                }
            });
            return (React.createElement(Dialog_1.default, __assign({}, props, { visible: visible, onAnimateLeave: _this.removeContainer, ref: _this.saveRef })));
        };
        _this.removeContainer = function () {
            if (_this.container) {
                if (!IS_REACT_16) {
                    ReactDOM.unmountComponentAtNode(_this.container);
                }
                _this.container.parentNode.removeChild(_this.container);
                _this.container = null;
            }
        };
        _this.getContainer = function () {
            if (!_this.container) {
                var container = document.createElement('div');
                var containerId = _this.props.prefixCls + "-container-" + (new Date().getTime());
                container.setAttribute('id', containerId);
                container.setAttribute("class", _this.props.prefixCls + "-container");
                document.body.appendChild(container);
                _this.container = container;
            }
            return _this.container;
        };
        return _this;
    }
    DialogWrap.prototype.componentDidMount = function () {
        if (this.props.visible) {
            this.componentDidUpdate();
        }
    };
    DialogWrap.prototype.shouldComponentUpdate = function (_a) {
        var visible = _a.visible;
        return !!(this.props.visible || visible);
    };
    DialogWrap.prototype.componentWillUnmount = function () {
        if (this.props.visible) {
            if (!IS_REACT_16) {
                this.renderDialog(false);
            }
            else {
                // TODO for react@16 createPortal animation
                this.removeContainer();
            }
        }
        else {
            this.removeContainer();
        }
    };
    DialogWrap.prototype.componentDidUpdate = function () {
        if (!IS_REACT_16) {
            this.renderDialog(this.props.visible);
        }
    };
    DialogWrap.prototype.renderDialog = function (visible) {
        ReactDOM.unstable_renderSubtreeIntoContainer(this, this.getComponent(visible), this.getContainer());
    };
    DialogWrap.prototype.render = function () {
        var visible = this.props.visible;
        if (IS_REACT_16 && (visible || this._component)) {
            return ReactDOM.createPortal(this.getComponent(visible), this.getContainer());
        }
        return null;
    };
    DialogWrap.defaultProps = {
        visible: false,
        prefixCls: 'haina-dialog',
        onClose: noop
    };
    return DialogWrap;
}(React.Component));
exports.default = DialogWrap;
