export default interface ILazyLoad {
    once: boolean,//是否只加载一次
    height: number|string,//容器高度
    offset: number|Array<number>,//距离顶部的高度
    overflow: boolean,//
    resize: boolean,//
    scroll: boolean,//使用滚动监听事件
    children: any,//
    throttle: number|boolean,
    debounce: number|boolean,
    placeholder: any,//加载中显示的组件
    unmountIfInvisible: boolean
}