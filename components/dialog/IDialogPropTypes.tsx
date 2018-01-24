import * as React from 'react';
interface IDialogPropTypes {
  className?: string;//对话框的class
  style?: {};//对话框的内联样式
  mask?: boolean;//是否需要对话框外层的mask，默认true
  children?: any;
  afterClose?: () => void;//关闭之后的回调
  onClose?: (e: any) => void;//关闭
  closable?: boolean;//是否显示关闭按钮
  maskClosable?: boolean;//mask点击是否可以关闭,默认false
  visible?: boolean;//控制是否显示
  title?: React.ReactNode;//title
  footer?: React.ReactNode;//footer
  transitionName?: string;// ReactCSSTransitionGroup 过度效果
  maskTransitionName?: string;// ReactCSSTransitionGroup
  animation?: any;//默认时zooms，可自定义缩放的动画clas
  maskAnimation?: any;//默认为fade，可以自定义
  wrapStyle?: {};//wrap的样式
  bodyStyle?: {};//body的样式
  maskStyle?: {};//mask的样式
  prefixCls?: string;
  wrapClassName?: string;//wrap的class
  onAnimateLeave?: () => void;//对话离开的回掉
  zIndex?: number;//zindx
  wrapProps?: any;
}

export default IDialogPropTypes;
