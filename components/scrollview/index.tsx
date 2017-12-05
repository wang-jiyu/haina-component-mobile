import * as React from 'react';
import * as classNames from 'classnames';
import './index.scss';
import IScrollViewProps from './PropsType'
import LoadMore from './loadmore-component/LoadMore'
import Refresh from './refresh-component/Refresh'
import before from './fn/before';


function isIphone() {
  return /iphone/i.test(window.navigator.userAgent);
}

export default class ScrollView extends React.Component<IScrollViewProps, any> {

  static defaultProps = {
    threshold: 10,
    useWindowScroll: false,
    disableInfiniteScroll: false,
    disableRefresh: false,
    refresh: ():Promise<any>=>Promise.resolve(),
    loadMore: ():Promise<any>=>Promise.resolve(),
    refreshComponent: LoadMore,
    loadMoreComponent: Refresh
  }
  public startYPos: number = 0;
  public prevYPos: number = 0;
  public rootDom: any = null;
  public refreshDom: any = null;
  public scrollTarget: any = null;
  public isRefreshing: any = true;
  public isPulling: any = false;


  constructor(props) {
    super(props);
    this.state = {
      translateY: 0,
      transition: false,
      topPosition: 100,
      isLoadingMore: false
    };
    function disableRefreshBefore() {
      return !this.props.disableRefresh;
    }
    this.onTouchStart = before(disableRefreshBefore, this.onTouchStart).bind(this);

    this.onTouchMove = before(disableRefreshBefore, this.onTouchMove).bind(this);

    this.onTouchEnd = before(disableRefreshBefore, this.onTouchEnd).bind(this);

    this.onScroll = before(function () {
      return !this.props.disableInfiniteScroll;
    }, this.onScroll).bind(this);


  }
  // before(before, next) {
  //   return function (...args) {
  //     if (before.apply(this, args)) {
  //       next.apply(this, args);
  //     }
  //   }
  // }
  componentDidMount() {
    this.rootDom.addEventListener('touchmove', this.onTouchMove, false);

    this.setState({
      topPosition: -this.refreshDom.clientHeight
    });

    // this.refresh(false);

    if (this.props.useWindowScroll) {
      this.listendScroll(window);
    } else {
      this.listendScroll(this.rootDom);
    }
  }


  isDragDown(prevY, curY) {
    return curY - prevY > 0;
  }
  onTouchStart(e) {
    this.startYPos = this.prevYPos = e.touches[0].pageY;
  }

  onTouchMove(e) {
    if (this.isRefreshing) return;

    const curYpos = e.touches[0].pageY;
    const scrollTop = this.rootDom.scrollTop

    if (
      (scrollTop === 0 && this.isDragDown(this.prevYPos, curYpos)) || this.isPulling
    ) {
      e.preventDefault();
      this.setState({
        translateY: this.calcDistance(curYpos - this.startYPos),
        transition: false
      });
      this.isPulling = true;
    }
    this.prevYPos = curYpos
  }
  onTouchEnd() {
    if (this.isRefreshing) return;
    if (this.shouldRefresh) {
      this.refresh();
    } else {
      this.resetPosition();
    }
    this.isPulling = false;
  }
  onScroll() {
    const state = this.state;
    const props = this.props;
    if (state.isLoadingMore) return;
    if (this.arriveBottom()) {
      this.setState({
        isLoadingMore: true
      });
      props.loadMore()
        .then(() => this.setState({
          isLoadingMore: false
        }));
    }
  }
  arriveBottom() {
    const props = this.props;
    const target = this.scrollTarget;
    const visibleHeight = props.useWindowScroll ? window.innerHeight : target.clientHeight;
    const scrollTop = props.useWindowScroll ? window.pageYOffset : target.scrollTop;
    const scrollHeight = props.useWindowScroll ? document.documentElement.scrollHeight : target.scrollHeight;
    return (scrollHeight - (scrollTop + visibleHeight) <= props.threshold);
  }
  calcDistance(distance) {
    return distance / 3;
  }
  get shouldRefresh() {
    return this.state.translateY >= this.refreshDom.clientHeight;
  }
  get progress() {
    if (this.refreshDom) {
      return Math.min(this.state.translateY / this.refreshDom.clientHeight * 100, 100)
    }
    return 0;
  }
  refresh(transition = true) {
    const props = this.props;
    this.setState({
      translateY: this.refreshDom.clientHeight,
      transition
    });

    this.isRefreshing = true;
    props
      .refresh()
      .then(() => {
        this.resetPosition();
        this.isRefreshing = false;
      });
  }
  resetPosition() {
    this.setState({
      translateY: 0,
      transition: true
    });
  }
  listendScroll(target) {
    this.scrollTarget = target;
    target.addEventListener('scroll', this.onScroll);
  }
  render() {
    const props = this.props;
    const state = this.state;
    const { height } = props
    return (
      <div
        className={classNames('haina-view-component', props.className)}
        ref={ref => this.rootDom = ref}
        onTouchStart={this.onTouchStart}
        onTouchEnd={this.onTouchEnd}
        style={{height:height}}
      >
        <div
          ref={ref => this.refreshDom = ref}
          className={classNames('haina-view-component__refresh', {
            'ease-out-transion': state.transition,
            // show refresh component when not scroll bouncing
            active: state.translateY > 0,
          })}
          style={{
            transform: `translateY(${state.translateY}px)`,
            WebkitTransform: `translateY(${state.translateY}px)`,
            top: `${state.topPosition}px`
          }}
        >
          {
            props.disableRefresh ? null :
              React.createElement(props.refreshComponent, {
                isRefreshing: this.isRefreshing,
                progress: this.progress
              })
          }
        </div>

        <div
          className={classNames('haina-view-component__content', {
            'ease-out-transion': state.transition
          })}
          style={{
            transform: `translateY(${state.translateY}px)`,
            WebkitTransform: `translateY(${state.translateY}px)`
          }}
        >
          {props.children}
          {
            state.isLoadingMore ? React.createElement(props.loadMoreComponent) : null
          }
        </div>
      </div>
    );
  }
}


