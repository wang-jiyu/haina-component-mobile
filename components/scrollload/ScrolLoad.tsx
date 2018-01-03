import * as React from 'react';
import * as ReactDom from 'react-dom';


const defaultBoundingClientRect = { top: 0, right: 0, bottom: 0, left: 0, width: 0, height: 0 };

const LISTEN_FLAG = 'data-lazyload-listened';
const listeners = [];
let pending = [];

let passiveEventSupported = false;
try {
    const opts = Object.defineProperty({}, 'passive', {
        get() {
            passiveEventSupported = true;
        }
    });
    window.addEventListener('test', null, opts);
}
catch (e) { }
const passiveEvent = passiveEventSupported ? { capture: false, passive: true } : false;

export default class ScrolLoad extends React.Component<any, any>{
    constructor(props) {
        super(props)
    }

    checkOverflowVisible(component, parent) {
        const node = ReactDom.findDOMNode(component);

        let parentTop;
        let parentHeight;

        try {
            ({ top: parentTop, height: parentHeight } = parent.getBoundingClientRect());
        } catch (e) {
            ({ top: parentTop, height: parentHeight } = defaultBoundingClientRect);
        }

        const windowInnerHeight = window.innerHeight || document.documentElement.clientHeight;

        const intersectionTop = Math.max(parentTop, 0); 
        const intersectionHeight = Math.min(windowInnerHeight, parentTop + parentHeight) - intersectionTop; 

        let top;
        let height;

        try {
            ({ top, height } = node.getBoundingClientRect());
        } catch (e) {
            ({ top, height } = defaultBoundingClientRect);
        }

        const offsetTop = top - intersectionTop; 

        const offsets = Array.isArray(component.props.offset) ?
            component.props.offset :
            [component.props.offset, component.props.offset]; 

        return (offsetTop - offsets[0] <= intersectionHeight) &&
            (offsetTop + height + offsets[1] >= 0);
    }

    checkNormalVisible(component){
        const cnode = ReactDom.findDOMNode(component);
        let node = cnode as any
        if (!(node.offsetWidth || node.offsetHeight || node.getClientRects().length)) return false;
      
        let top;
        let elementHeight;
      
        try {
          ({ top, height: elementHeight } = node.getBoundingClientRect());
        } catch (e) {
          ({ top, height: elementHeight } = defaultBoundingClientRect);
        }
      
        const windowInnerHeight = window.innerHeight || document.documentElement.clientHeight;
      
        const offsets = Array.isArray(component.props.offset) ?
                      component.props.offset :
                      [component.props.offset, component.props.offset]; 
      
        return (top - offsets[0] <= windowInnerHeight) &&
               (top + elementHeight + offsets[1] >= 0);
    }
}

