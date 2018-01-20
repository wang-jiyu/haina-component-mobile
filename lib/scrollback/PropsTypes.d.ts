export default interface ILazyLoad {
    height?: number | string;
    offset?: number | Array<number>;
    overflow?: boolean;
    resize?: boolean;
    scroll?: boolean;
    children: any;
    throttle?: number | boolean;
    debounce?: number | boolean;
    callback: Function;
    loaded: boolean;
}
