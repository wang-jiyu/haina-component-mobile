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
var Notice_1 = require("./Notice");
require("./style/notification.scss");
var noticeNumber = 0;
var getUuid = function () {
    return "notification-" + new Date().getTime() + "-" + noticeNumber++;
};
var Notification = (function (_super) {
    __extends(Notification, _super);
    function Notification(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            notices: [],
            hasMask: true,
        };
        return _this;
    }
    Notification.prototype.add = function (notice) {
        var notices = this.state.notices;
        var key = notice.key ? notice.key : notice.key = getUuid();
        var mask = notice.mask ? notice.mask : false;
        var temp = notices.filter(function (item) { return item.key === key; }).length;
        if (!temp) {
            notices.push(notice);
            this.setState({
                notices: notices,
                hasMask: mask
            });
        }
    };
    Notification.prototype.remove = function (key) {
        this.setState(function (previousState) { return ({ notices: previousState.notices.filter(function (notice) { return notice.key !== key; }) }); });
    };
    Notification.prototype.getNoticeDOM = function () {
        var _this = this;
        var notices = this.state.notices;
        var result = [];
        notices.map(function (notice) {
            var closeCallback = function () {
                _this.remove(notice.key);
                if (notice.onClose)
                    notice.onClose();
            };
            result.push(React.createElement(Notice_1.default, __assign({ key: notice.key }, notice, { onClose: closeCallback })));
        });
        return result;
    };
    Notification.prototype.getMaskDOM = function () {
        var _a = this.state, notices = _a.notices, hasMask = _a.hasMask;
        if (notices.length > 0 && hasMask === true) {
            return React.createElement("div", { className: "haina-notification-mask" });
        }
        else {
            return null;
        }
    };
    Notification.prototype.render = function () {
        var prefixCls = this.props.prefixCls;
        var noticesDOM = this.getNoticeDOM();
        var maskDOM = this.getMaskDOM();
        return (React.createElement("div", { className: prefixCls },
            maskDOM,
            React.createElement("div", { className: "haina-notification-box" }, noticesDOM)));
    };
    Notification.reWrite = function () {
        var div;
        div = document.createElement('div');
        document.body.appendChild(div);
        var notification = ReactDOM.render(React.createElement(Notification, null), div);
        return {
            notice: function (noticeProps) {
                notification.add(noticeProps);
            },
            removeNotice: function (key) {
                notification.remove(key);
            },
            destroy: function () {
                ReactDOM.unmountComponentAtNode(div);
                document.body.removeChild(div);
            },
            component: notification
        };
    };
    return Notification;
}(React.Component));
exports.default = Notification;
