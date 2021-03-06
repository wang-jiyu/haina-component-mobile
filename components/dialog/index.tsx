import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Dialog from './Dialog'
import IDialogPropTypes from './IDialogPropTypes'
import './dialog.scss'
import './mask.scss'
function noop() {
}

const IS_REACT_16 = true

class DialogWrap extends React.Component<IDialogPropTypes, any> {
  static defaultProps = {
    visible: false,
    prefixCls: 'haina-dialog',
    onClose: noop
  };

  _component: any;
  container: any;

  componentDidMount() {
    if (this.props.visible) {
      this.componentDidUpdate();
    }
  }

  shouldComponentUpdate({ visible }) {
    return !!(this.props.visible || visible);
  }

  componentWillUnmount() {
    if (this.props.visible) {
      if (!IS_REACT_16) {
        this.renderDialog(false);
      } else {
        // TODO for react@16 createPortal animation
        this.removeContainer();
      }
    } else {
      this.removeContainer();
    }
  }

  componentDidUpdate() {
    if (!IS_REACT_16) {
      this.renderDialog(this.props.visible);
    }
  }

  saveRef = (node) => {
    if (IS_REACT_16) {
      this._component = node;
    }
  }

  getComponent = (visible) => {
    const props = {...this.props};
    ['visible', 'onAnimateLeave'].forEach(key => {
      if (props.hasOwnProperty(key)) {
        delete props[key];
      }
    });
    return (
      <Dialog {...props} visible={visible} onAnimateLeave={this.removeContainer} ref={this.saveRef} />
    );
  }

  removeContainer = () => {
    if (this.container) {
      if (!IS_REACT_16) {
        ReactDOM.unmountComponentAtNode(this.container);
      }
      (this.container as any).parentNode.removeChild(this.container);
      this.container = null;
    }
  }

  getContainer = () => {
    if (!this.container) {
      const container = document.createElement('div');
      const containerId = `${this.props.prefixCls}-container-${(new Date().getTime())}`;
      container.setAttribute('id', containerId);
      container.setAttribute("class",`${this.props.prefixCls}`)
      document.body.appendChild(container);
      this.container = container;
    }
    return this.container;
  }

  renderDialog(visible) {
    ReactDOM.unstable_renderSubtreeIntoContainer(
      this,
      this.getComponent(visible),
      this.getContainer(),
    );
  }

  render() {
    const { visible } = this.props;
    if (IS_REACT_16 && (visible || this._component)) {
      return (ReactDOM as any).createPortal(this.getComponent(visible), this.getContainer());
    }
    return (null as any);
  }
}

export default DialogWrap;