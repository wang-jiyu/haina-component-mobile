export default interface ILazyLoad {
    once: boolean;
    height: number | string;
    offset: number | Array<number>;
    overflow: boolean;
    resize: boolean;
    scroll: boolean;
    children: any;
    throttle: number | boolean;
    debounce: number | boolean;
    placeholder: any;
    unmountIfInvisible: boolean;
} 
