"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Notification_1 = require("./Notification");
var newNotification;
var getNewNotification = function () {
    if (newNotification) {
        newNotification.destroy();
        newNotification = undefined;
    }
    return Notification_1.default.reWrite();
};
var notice = function (type, content, mask, iconClass, onClose, duration) {
    if (mask === void 0) { mask = false; }
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
    show: function (content, mask, iconClass, onClose, duration) { return (notice(undefined, content, mask, iconClass, onClose, duration)); },
    info: function (content, mask, iconClass, onClose, duration) { return (notice('info', content, mask, iconClass, onClose, duration)); },
    success: function (content, mask, iconClass, onClose, duration) { return (notice('success', content, mask, iconClass, onClose, duration)); },
    warning: function (content, mask, iconClass, onClose, duration) { return (notice('warning', content, mask, iconClass, onClose, duration)); },
    error: function (content, mask, iconClass, onClose, duration) { return (notice('error', content, mask, iconClass, onClose, duration)); },
    loading: function (content) { return (notice(undefined, content || '加载中...', true, 'fa-circle-o-notch fa-spin', undefined, 0)); },
    hide: function () {
        if (newNotification) {
            newNotification.destroy();
            newNotification = null;
        }
    },
};
