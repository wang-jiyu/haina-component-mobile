import * as React from 'react'
import BScroll from 'better-scroll/src'
import Bubble from '../bubble'
import Loading from '../loading'
import { getRect } from '../common/dom'
import './scroll.scss'
const COMPONENT_NAME = 'scroll'
const DIRECTION_H = 'horizontal'
const DIRECTION_V = 'vertical'
export interface IScrollProps {
    probeType?: number
    click?: boolean
    listenScroll?: boolean
    listenBeforeScroll?: boolean
    direction?: string
    //这个配置可以开启滚动条
    scrollbar?: boolean | {
        fade?: boolean,//fade 为 true 表示当滚动停止的时候滚动条是否需要渐隐
        interactive?: boolean // interactive 表示滚动条是否可以交互
    }
    //这个配置用于做下拉刷新功能
    pullDownRefresh?: boolean | {
        threshold?: number,//可以配置顶部下拉的距离（threshold） 来决定刷新时机
        stop?: number,//回弹停留的距离（stop）,
        stopTime?: number,
        txt?: string
    }
    //这个配置用于做上拉加载功能
    pullUpLoad?: boolean | {
        threshold?: number,//可以配置离（threshold）来决定开始加载的时机
        txt?: {
            more?: string,
            noMore?: string
        }
    }
    startY?: number
    refreshDelay?: number
    freeScroll?: boolean
    //这个配置用于 PC 端的鼠标滚轮
    mouseWheel?: boolean | {
        speed?: number,//speed 表示鼠标滚轮滚动的速度
        invert?: boolean//invert 为 true 表示滚轮滚动和时机滚动方向相反
    }
    scroll?: Function//滚动回调事件
    beforeScrollStart?: Function//滚动开始之前
    pullingDown?: Function//在一次下拉刷新的动作后，这个时机一般用来去后端请求数据
    pullingUp?: Function//在一次上拉加载的动作后，这个时机一般用来去后端请求数据
    clickItem?: Function//LIST的item被单击的时候
}
export default class Scroll extends React.Component<IScrollProps, any>{


    static defaultProps = {
        probeType: 1,
        click: true,
        listenScroll: false,
        listenBeforeScroll: false,
        direction: DIRECTION_V,
        scrollbar: false,
        pullDownRefresh: false,
        pullUpLoad: false,
        startY: 0,
        refreshDelay: 20,
        freeScroll: false,
        mouseWheel: false
    }

    state = {
        beforePullDown: true,
        isRebounding: false,
        isPullingDown: false,
        isPullUpLoad: false,
        pullUpDirty: true,
        pullDownStyle: {},
        bubbleY: 0
    }
    public ratio = parseInt(document.documentElement.dataset.dpr)
    public pullDownInitTop: number = -50 * this.ratio;
    public scroll: any


    componentDidMount() {
        setTimeout(() => {
            this.initScroll()
        }, 20)
    }

    componentDidUpdate(prevProps, prevState) {

    }

    pullUpTxt() {
        let { pullUpLoad } = this.props
        const moreTxt = pullUpLoad && (pullUpLoad as any).txt && (pullUpLoad as any).txt.more || '加载更多'

        const noMoreTxt = pullUpLoad && (pullUpLoad as any).txt && (pullUpLoad as any).txt.noMore || '没有更多数据'

        return this.state.pullUpDirty ? moreTxt : noMoreTxt
    }

    refreshTxt() {
        let pullDownRefresh = this.props
        return pullDownRefresh && (pullDownRefresh as any).txt || '加载成功'
    }

    initScroll() {
        let { pullDownRefresh, pullUpLoad, probeType, click, freeScroll, direction, scrollbar, startY, mouseWheel, listenScroll, scroll, listenBeforeScroll, beforeScrollStart } = this.props
        if (!this.refs.wrapper) {
            return
        }
        if (this.refs.listWrapper && (pullDownRefresh || pullUpLoad)) {
            (this.refs.listWrapper as HTMLDivElement).style.minHeight = `${getRect(this.refs.wrapper).height + 1}px`
        }

        let options = {
            probeType: probeType,
            click: click,
            scrollY: freeScroll || direction === DIRECTION_V,
            scrollX: freeScroll || direction === DIRECTION_H,
            scrollbar: scrollbar,
            pullDownRefresh: pullDownRefresh,
            pullUpLoad: pullUpLoad,
            startY: startY,
            freeScroll: freeScroll,
            mouseWheel: mouseWheel
        }

        this.scroll = new BScroll((this.refs.wrapper as HTMLElement), options)

        if (listenScroll) {
            this.scroll.on('scroll', (pos) => {
                scroll(pos)
            })
        }

        if (listenBeforeScroll) {
            this.scroll.on('beforeScrollStart', () => {
                beforeScrollStart()
            })
        }

        if (pullDownRefresh) {
            console.log('pullDownRefresh')
            this._initPullDownRefresh()
        }

        if (pullUpLoad) {
            console.log('pullUpLoad')
            this._initPullUpLoad()
        }
    }
    _initPullDownRefresh() {
        this.scroll.on('pullingDown', () => {
            console.log("pullingDown ing")
            this.setState({
                beforePullDown: false,
                isPullingDown: true
            }, () => {
                this.props.pullingDown()
            })
        })

        this.scroll.on('scroll', (pos) => {
           
            if (this.state.beforePullDown) {
                console.log("pos",pos.y)
                console.log("pullDownInitTop",this.pullDownInitTop)
                this.setState({
                    bubbleY: Math.max(0, pos.y + this.pullDownInitTop),
                    pullDownStyle: {
                        top: Math.min(pos.y + this.pullDownInitTop, 10) * this.ratio
                    }
                })
            } else {
                this.setState({
                    bubbleY: 0
                })
            }

            if (this.state.isRebounding) {
                this.setState({
                    pullDownStyle: {
                        top: 10 - ((this.props.pullDownRefresh as any).stop - pos.y)
                    }
                })
            }
        })
    }
    _initPullUpLoad() {
        this.scroll.on('pullingUp', () => {
            this.setState({
                isPullUpLoad: true
            }, () => {
                this.props.pullingUp()
            })
        })
    }
    disable() {
        this.scroll && this.scroll.disable()
    }
    enable() {
        this.scroll && this.scroll.enable()
    }
    refresh() {
        this.scroll && this.scroll.refresh()
    }
    scrollTo() {
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
    }
    scrollToElement() {
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    }
    clickItem(e, item) {
        console.log(e)
        this.props.clickItem(item)
    }
    destroy() {
        this.scroll.destroy()
    }
    async forceUpdate(dirty) {
        let { pullDownRefresh, pullUpLoad } = this.props
        let { isPullingDown, isPullUpLoad } = this.state
        if (pullDownRefresh && isPullingDown) {
            await this.setState({
                isPullingDown: false
            })
            this._reboundPullDown().then(() => {
                this._afterPullDown()
            })

        } else if (pullUpLoad && isPullUpLoad) {
            await this.setState({
                isPullUpLoad: false
            })
            this.scroll.finishPullUp()
            await this.setState({
                pullUpDirty: dirty
            })
            this.refresh()
        } else {
            this.refresh()
        }
    }

    _reboundPullDown() {
        const { stopTime = 600 } = (this.props.pullDownRefresh as any)
        return new Promise((resolve) => {
            setTimeout(async () => {
                await this.setState({
                    isRebounding: true
                })
                this.scroll.finishPullDown()
                resolve()
            }, stopTime)
        })
    }
    _afterPullDown() {
        setTimeout(async () => {
            await this.setState({
                pullDownStyle: {
                    top: this.pullDownInitTop,
                    beforePullDown: true,
                    isRebounding: false
                }
            })
            this.refresh()
        }, this.scroll.options.bounceTime)
    }

    render() {
        const { pullUpLoad, pullDownRefresh } = this.props
        const { isPullUpLoad, pullDownStyle, beforePullDown, bubbleY, isPullingDown } = this.state
        return (
            <div ref="wrapper" className="list-wrapper">
                <div className="scroll-content">
                    <div ref="listWrapper">
                        {this.props.children}
                    </div>
                    {pullUpLoad ? (
                        <div className="pullup-wrapper">
                            {isPullUpLoad ? (
                                <div className="before-trigger">
                                    <span>{this.pullUpTxt()}</span>
                                </div>
                            ) : (
                                    <div className="after-trigger">
                                        <Loading />
                                    </div>
                                )}

                        </div>
                    ) : null}
                </div>
                {pullDownRefresh ? (
                    <div ref="pulldown" className="pulldown-wrapper" style={pullDownStyle}>
                        {beforePullDown ? (
                            <div className="before-trigger">
                                <Bubble y={bubbleY} />
                            </div>
                        ) : (
                                <div className="after-trigger">
                                    {isPullingDown ? (
                                        <div className="loading">
                                            <Loading />
                                        </div>
                                    ) : (
                                            <div>
                                                <span>
                                                    {this.refreshTxt()}
                                                </span>
                                            </div>
                                        )}
                                </div>
                            )}
                    </div>
                ) : null}
            </div>
        )
    }
}