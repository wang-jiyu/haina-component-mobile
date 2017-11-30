import * as React from 'react';
import './index.scss';
import {IRefreshProps} from '../PropsType'

export default class SpinnerRefresh extends React.Component<IRefreshProps,any> {
  constructor(props) {
    super(props);
  }
  conditionRender() {
    const props = this.props;

    if (props.isRefreshing) {
      return (
        <div
          className="spinner-refresh__animation"
        >
          <div className="spinner-refresh__loader" />
        </div>
      );
    }
    return (
      <div className="spinner-refresh__text">
        { props.progress >= 100 ? '松手更新...' : '下拉更新...' }
      </div>
    )
  }
  render() {
    const props = this.props;
    return (
      <div
        className="spinner-refresh"
      >
        {
          this.conditionRender()
        }
      </div>
    );
  }
}

