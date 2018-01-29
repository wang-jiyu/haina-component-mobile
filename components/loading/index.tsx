

import * as React from 'react'
import './loading.scss'
export interface ILoadingProps {
    size?: number
}
export default class Loading extends React.Component<ILoadingProps, any>{

    static defaultProps = {
        size: 40
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
            width: value,
            height: value
        })
    }
    componentWillReceiveProps(nextProps) {
        let value = 40
        if (!nextProps.size) {
            value = 40
        } else {
            value = nextProps.size
        }
        this.setStyle({
            width: value,
            height: value
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