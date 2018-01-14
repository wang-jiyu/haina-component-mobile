//此组件是滚动一定位置,改组件包裹的组件的才去创建，
import LazyLoad from 'react-lazyload';
import { lazyload as decorator } from 'react-lazyload';
export const lazyload = decorator;
export default LazyLoad;
