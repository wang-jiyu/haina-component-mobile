import * as React from 'react';
import './index.scss';
import { IRefreshProps } from '../PropsType'
interface ILoadMore {
  isRefreshing
}
export default class LoadMore extends React.Component<IRefreshProps, any> {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="text-load-more">
        正在加载数据...
    </div>
    )
  }
}
