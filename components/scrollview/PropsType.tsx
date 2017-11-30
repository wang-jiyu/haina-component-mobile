
  export default interface IScrollViewProps {
      className?:Array<string>|string|object,
      refresh?:Function,
      loadMore?:Function,
      refreshComponent?:any,
      loadMoreComponent?:any,
      threshold:number,
      useWindowScroll:boolean,
      disableInfiniteScroll:boolean,
      disableRefresh:boolean
  }

  export interface IRefreshProps {
    isRefreshing:boolean,
    progress:number
  }