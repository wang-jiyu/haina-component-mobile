"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by Aus on 2017/6/13.
 */
var Notification_1 = require("./Notification");
// Toast组件比较特殊
// 因为<Toast />不会被直接渲染在DOM中
// 而是动态插入页面中
// Toast组件核心就是通过Notification暴露的重写方法 动态改变Notification
var newNotification;
// 获得一个Notification
var getNewNotification = function () {
    // 单例 保持页面始终只有一个Notification
    if (newNotification) {
        newNotification.destroy();
        newNotification = undefined;
    }
    return Notification_1.default.reWrite();
};
// notice方法实际上就是集合参数 完成对Notification的改变
var notice = function (type, content, mask, iconClass, onClose, duration) {
    if (mask === void 0) { mask = true; }
    var notificationInstance = getNewNotification();
    notificationInstance.notice({
        duration: duration,
        type: type,
        mask: mask,
        iconClass: iconClass,
        content: content,
        onClose: function () {
            if (onClose)
                onClose();
            notificationInstance.destroy();
            notificationInstance = undefined;
        },
    });
};
exports.default = {
    // 无动画
    show: function (content, mask, iconClass, onClose, duration) { return (notice(undefined, content, mask, iconClass, onClose, duration)); },
    // 翻转效果
    info: function (content, mask, iconClass, onClose, duration) { return (notice('info', content, mask, iconClass, onClose, duration)); },
    // 缩放效果
    success: function (content, mask, iconClass, onClose, duration) { return (notice('success', content, mask, iconClass, onClose, duration)); },
    // 从下方滑入
    warning: function (content, mask, iconClass, onClose, duration) { return (notice('warning', content, mask, iconClass, onClose, duration)); },
    // 抖动
    error: function (content, mask, iconClass, onClose, duration) { return (notice('error', content, mask, iconClass, onClose, duration)); },
    // loading
    loading: function (content) { return (notice(undefined, content || '加载中...', true, 'fa-circle-o-notch fa-spin', undefined, 0)); },
    // 销毁
    hide: function () {
        if (newNotification) {
            newNotification.destroy();
            newNotification = null;
        }
    },
};
