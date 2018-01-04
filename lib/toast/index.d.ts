declare const _default: {
    show: (content: string, mask?: boolean, iconClass?: string, onClose?: Function, duration?: number) => void;
    info: (content: string, mask?: boolean, iconClass?: string, onClose?: Function, duration?: number) => void;
    success: (content: string, mask?: boolean, iconClass?: string, onClose?: Function, duration?: number) => void;
    warning: (content: string, mask?: boolean, iconClass?: string, onClose?: Function, duration?: number) => void;
    error: (content: string, mask?: boolean, iconClass?: string, onClose?: Function, duration?: number) => void;
    loading: (content: any) => void;
    hide(): void;
};
export default _default;
