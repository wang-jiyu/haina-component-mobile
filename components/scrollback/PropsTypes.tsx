export default interface ILazyLoad {
    height?: number|string,//容器高度
    offset?: number|Array<number>,//距离顶部的高度
    overflow?: boolean,//
    resize?: boolean,//
    scroll?: boolean,//使用滚动监听事件
    children: any,//
    throttle?: number|boolean,
    debounce?: number|boolean,
    callback:Function,
    loaded:boolean
}