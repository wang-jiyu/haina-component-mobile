export interface DownProps {

    isLock?: boolean,//是否锁定下拉刷新，如果锁定了，则无法下拉
    isAuto?: boolean,//是否初始化时自动执行一次下拉刷新，优先级要高于上拉加载的auto，并且两个auto只会执行一次
    isAways?: boolean,//是否运行在上拉时也可以下拉，如果为false，上拉时无法触发下拉刷新
    isAllowAutoLoading?: boolean,//设置isAuto=true时生效，是否在初始化的下拉刷新触发事件中显示动画，如果是false，初始化的加载只会触发回调，不会触发动画
    isAutoResetUpLoading?: boolean,//是否每次下拉完毕后默认重置上拉，为false时下拉刷新后不会自动重置上拉状态
    isScrollCssTranslate?: boolean,//请只在定制主题时使用，是否在下拉时scroll（内容区域）跟随css translate动画，如果为false，下拉时只会回调下拉距离，scroll不会跟随动画，常用来定制自定义下拉刷新
    offset?: number,//触发下拉的阈值，当下拉距离大于这个阈值后，在松开时会触发下拉刷新
    dampRateBegin?: number,//阻尼系数，下拉小于offset时的阻尼系数，值越接近0,高度变化越小,表现为越往下越难拉
    dampRate?: number,//下拉超过阈值后的阻尼系数，越接近0，下拉高度变化越小，例如0.1时表现是超过阈值后基本就拉不动了
    bounceTime?: number,//回弹动画时间，下拉取消后或结束后到关闭时，会有一个回弹时间过渡
    successAnim?: {
        isEnable?: boolean,//是否开启成功动画，开启后，下拉结束之前会先出现成功动画
        duration?: boolean//成功动画的过度时间
    },
    onPull?: Function,//下拉过程中的持续回调，回调参数（downHight, downOffset）
    onCalcel?: Function,//取消下拉后的回调,当下拉超过阈值，并松开就会触发
    callback: Function//触发下拉刷新后的回调

}

export interface UpProps {
    isLock?: boolean,//是否锁定上，如果锁定了，则无法上拉
    isAuto?: boolean,//是否初始化时自动执行一次上拉加载（会同时有动画和回调），当下拉的down的isAuto生效时，这个不会生效
    isShowUpLoading?: boolean,//上拉加载的过程中是否显示动画，如果为false，代表静默加载，没有动画
    offset?: number,//触发上拉的阈值，当滑动到距离底部距离小于这个阈值时，会触发上拉加载
    loadFull?: {
        isEnable?: boolean,//	是否开启自动加载满屏，开启后，如果当前页面数据没有满屏，并且可以加载更多，就会自动触发上拉加载
        delay?: number//延迟加载的时间，自动加载满屏时，会延迟一定时间才加载
    },
    onScroll?: Function,//滚动时的持续回调，回调参数（scrollTop）
    callback: Function//触发上拉加载后的回调,
    
}

export default interface IRefreshProps {
    down: DownProps,//下拉的配置项
    up: UpProps,//上拉的配置项
    // container:string,
    isLockX?: boolean,//是否锁定横向滚动条
    isUseBodyScroll?: boolean,//是否使用window的滚动条
    isScrollBar?: boolean,//是否显示滚动条
    className?:string|Array<string>
}