import * as React from 'react';
import './index.scss';
import IScrollViewProps from './PropsType'

export default class ScrollView extends React.Component<IScrollViewProps, any> {

  static defaultProps = {
    element: 'div',
    threshold: 250,
    hasMore: false,
    initialLoad: false,
    pageStart: 0,
    useWindow: true,
    isReverse: false,
    useCapture: false,
    loader: null,
    LazyLoadArr:[]
  }


  constructor(props) {
    super(props);

    this.scrollListener = this.scrollListener.bind(this);
  }

  private pageLoaded: number = 0
  private defaultLoader: any = null
  private scrollComponent: any
  componentDidMount() {
    this.pageLoaded = this.props.pageStart;
    this.attachScrollListener();
  }

  componentDidUpdate() {
    this.attachScrollListener();
  }

  componentWillUnmount() {
    this.detachScrollListener();
    this.detachMousewheelListener();
  }

  setDefaultLoader(loader) {
    this.defaultLoader = loader;
  }

  detachMousewheelListener() {
    let scrollEl = window;
    if (this.props.useWindow === false) {
      scrollEl = this.scrollComponent.parentNode;
    }

    scrollEl.removeEventListener(
      'mousewheel',
      this.mousewheelListener,
      this.props.useCapture,
    );
  }

  detachScrollListener() {
    let scrollEl = window;
    if (this.props.useWindow === false) {
      scrollEl = this.scrollComponent.parentNode;
    }

    scrollEl.removeEventListener(
      'scroll',
      this.scrollListener,
      this.props.useCapture,
    );
    scrollEl.removeEventListener(
      'resize',
      this.scrollListener,
      this.props.useCapture,
    );
  }

  attachScrollListener() {
    if(this.props.loading){
      return;
    }
    if (!this.props.hasMore) {
      return;
    }

    let scrollEl = window;
    if (this.props.useWindow === false) {
      scrollEl = this.scrollComponent.parentNode;
    }

    scrollEl.addEventListener(
      'mousewheel',
      this.mousewheelListener,
      this.props.useCapture,
    );
    scrollEl.addEventListener(
      'scroll',
      this.scrollListener,
      this.props.useCapture,
    );
    scrollEl.addEventListener(
      'resize',
      this.scrollListener,
      this.props.useCapture,
    );

    if (this.props.initialLoad) {
      this.scrollListener();
    }
  }

  mousewheelListener(e) {
    if (e.deltaY === 1) {
      e.preventDefault();
    }
  }

  scrollListener() {
    const el = this.scrollComponent;
    const scrollEl = window;
    const {LazyLoadArr} = this.props
    let offset;
    let lazyOffset;
    if (this.props.useWindow) {
      let doc =
        document.documentElement;
      doc = doc as any
      const scrollTop =
        scrollEl.pageYOffset !== undefined
          ? scrollEl.pageYOffset
          : doc.scrollTop;
      if (this.props.isReverse) {
        offset = scrollTop;
      } else {
        offset =
          this.calculateTopPosition(el) +
          (el.offsetHeight - scrollTop - window.innerHeight);
      }
      lazyOffset = scrollTop
    } else if (this.props.isReverse) {
      offset = el.parentNode.scrollTop;
    } else {
      offset =
        el.scrollHeight - el.parentNode.scrollTop - el.parentNode.clientHeight;
    }

    if (offset < Number(this.props.threshold)) {
      this.detachScrollListener();
      if (typeof this.props.loadMore === 'function') {
        this.props.loadMore((this.pageLoaded += 1));
      }
    }
    
    LazyLoadArr.forEach((item,index)=>{
      const {ref,lazyload,threshold,loaded} = item
      const elOffsetTop = ref.scrollTop
      if((elOffsetTop-lazyOffset)<Number(threshold)&&!loaded){
        this.detachScrollListener();
        lazyload()
      }
    })
  }

  calculateTopPosition(el) {
    if (!el) {
      return 0;
    }
    return el.offsetTop + this.calculateTopPosition(el.offsetParent);
  }

  render() {
    let {
      children,
      element,
      hasMore,
      initialLoad,
      isReverse,
      loader,
      loadMore,
      pageStart,
      threshold,
      useCapture,
      useWindow,
      className,
      ...props
    } = this.props;

    const childrenArray = [children];
    if (hasMore) {
      if (loader) {
        isReverse ? childrenArray.unshift(loader) : childrenArray.push(loader);
      } else if (this.defaultLoader) {
        isReverse
          ? childrenArray.unshift(this.defaultLoader)
          : childrenArray.push(this.defaultLoader);
      }
    }
    return React.createElement(element,{className:className,ref:(ref)=>this.scrollComponent=ref},...childrenArray);
  }
}


