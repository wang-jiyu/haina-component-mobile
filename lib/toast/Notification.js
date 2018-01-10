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
// 统计notice总数 防止重复
var noticeNumber = 0;
// 生成唯一的id
var getUuid = function () {
    return "notification-" + new Date().getTime() + "-" + noticeNumber++;
};
var Notification = /** @class */ (function (_super) {
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
        // 添加notice
        // 创造一个不重复的key
        var notices = this.state.notices;
        var key = notice.key ? notice.key : notice.key = getUuid();
        var mask = notice.mask ? notice.mask : false;
        var temp = notices.filter(function (item) { return item.key === key; }).length;
        if (!temp) {
            // 不存在重复的 添加
            notices.push(notice);
            this.setState({
                notices: notices,
                hasMask: mask
            });
        }
    };
    Notification.prototype.remove = function (key) {
        // 根据key删除对应
        this.setState(function (previousState) { return ({ notices: previousState.notices.filter(function (notice) { return notice.key !== key; }) }); });
    };
    Notification.prototype.getNoticeDOM = function () {
        var _this = this;
        var notices = this.state.notices;
        var result = [];
        notices.map(function (notice) {
            // 每个Notice onClose的时候 删除掉notices中对应key的notice
            var closeCallback = function () {
                _this.remove(notice.key);
                // 如果有用户传入的onClose 执行
                if (notice.onClose)
                    notice.onClose();
            };
            result.push(React.createElement(Notice_1.default, __assign({ key: notice.key }, notice, { onClose: closeCallback })));
        });
        return result;
    };
    Notification.prototype.getMaskDOM = function () {
        var _a = this.state, notices = _a.notices, hasMask = _a.hasMask;
        // notices为空的时候 不显示蒙版
        // 始终只有一个蒙版
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
    // Notification增加一个重写方法
    // 该方法方便Notification组件动态添加到页面中和重写
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
