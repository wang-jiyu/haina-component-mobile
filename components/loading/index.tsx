

import * as React from 'react'
import './loading.scss'
export interface ILoadingProps {
    size?: number
}
export default class Loading extends React.Component<ILoadingProps, any>{

    public ratio = parseInt(document.documentElement.dataset.dpr)

    static defaultProps = {
        size: 20
    }

    state = {
        balde: 12,
        style: {}
    }

    constructor(props){
        super(props)
    }
    componentDidMount(){
        let value = this.props.size
        this.setStyle({
            width: this.ratio*value,
            height: this.ratio*value
        })
    }
    componentWillReceiveProps(nextProps) {
        let value = 20
        if (!nextProps.size) {
            value = 20
        } else {
            value = nextProps.size
        }
        this.setStyle({
            width: this.ratio*value,
            height: this.ratio*value
        })
    }
    setStyle(style) {
        this.setState({
            style
        })
    }
    render() {
        const { balde, style } = this.state
        return (
            <div className="haina-loading">
                <span className="haina-loading-spinners" style={style}>
                    {Array.from(new Array(balde), (el, index) => {
                        return <i key={index} className="haina-loading-spinner"></i>
                    })}
                </span>
            </div>
        )
    }

}