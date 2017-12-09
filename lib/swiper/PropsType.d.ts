export interface SwiperProps {
    swipeOptions?: {
        distance?: number;
        currentPoint?: number;
        swTouchstart?: Function;
        swTouchmove?: Function;
        swTouchend?: Function;
    };
    containerClass?: Array<string> | string | object;
    wrapperClass?: Array<string> | string | object;
    childClass?: Array<string> | string | object;
    id?: string;
    className?: Array<string> | string | object;
    childCount?: number;
}
