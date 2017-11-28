

export interface SwiperProps{
    swipeOptions?:{
        startSlide?:number,
        speed?:number,
        auto?:number,
        continuous?:true,
        disableScroll?:true,
        stopPropagation?:true,
        swiping?:Function,
        callback?:Function,
        transitionEnd?:Function
    }
    containerClass?:Array<string>|string|object,
    wrapperClass?:Array<string>|string|object,
    childClass?:Array<string>|string|object,
    id?:string,
    className?:Array<string>|string|object,
    childCount?:number
}