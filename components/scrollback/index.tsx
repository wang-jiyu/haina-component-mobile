
import * as React from 'react';
import LazyLoad from 'react-lazyload'
import ILazyLoad from './PropsTypes'
class ScrollBackItem extends React.Component<any, any>{
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const { loaded, callback } = this.props
        if (loaded) {
            callback()
        }
    }

    componentWillReceiveProps(nextProps) {
        const { callback } = this.props
        if (nextProps.loaded) {
            callback()
        }
    }

    render(){
        return (
            this.props.children
        )
    }
}

export default class ScrollBack extends React.Component<ILazyLoad, any>{
    static defaultProps = {
        offset: -50,
        overflow: false,
        resize: true,
        scroll: true,
        loaded: false
    }

    constructor(props) {
        super(props)
    }

    render() {
        const { offset, overflow, resize, scroll,loaded,callback,height } = this.props
        return (
            <LazyLoad height={height} offset={offset} overflow={overflow} resize={resize} scroll={scroll}>
                <ScrollBackItem loaded={loaded} callback={callback}>
                    {this.props.children}
                </ScrollBackItem>
            </LazyLoad>
        )
    }




}