import * as React from 'react';
import Notification from './Notification'

class Toast {
    
    // Toast组件比较特殊
    // 因为<Toast />不会被直接渲染在DOM中
    // 而是动态插入页面中
    // Toast组件核心就是通过Notification暴露的重写方法 动态改变Notification
    public newNotification: any;

    getNewNotification() {
        if (!this.newNotification) {
            this.newNotification = Notification.reWrite();
        }

        return this.newNotification;
    }

    notice(type: string, content: any, mask = false, iconClass: string, onClose: Function, duration: number) {
        let notificationInstance = this.getNewNotification();

        notificationInstance.notice({
            duration,
            type,
            mask,
            iconClass,
            content,
            onClose: () => {
                if (onClose) onClose();
            },
        })
    }

    // 无动画
    show(content, mask, iconClass, onClose, duration){
        this.notice(undefined, content, mask, iconClass, onClose, duration)
    }
    info(content, mask, iconClass, onClose, duration){
        this.notice('info', content, mask, iconClass, onClose, duration)
    }
    success(content, mask, iconClass, onClose, duration){
        this.notice('success', content, mask, iconClass, onClose, duration)
    }
    warning(content, mask, iconClass, onClose, duration){
        this.notice('warning', content, mask, iconClass, onClose, duration)
    }
    error(content, mask, iconClass, onClose, duration){
        this.notice('error', content, mask, iconClass, onClose, duration)
    }
    loading(content, mask, iconClass, onClose, duration){
        this.notice(undefined, content || '加载中...', true, 'fa-circle-o-notch fa-spin', undefined, 0)
    }
    // 销毁
    hide() {
        if (this.newNotification) {
            this.newNotification.destroy();
            this.newNotification = null;
        }
    }
}
export default Toast



