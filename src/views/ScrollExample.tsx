import * as React from 'react'

import Scroll from '../../components/scroll'



class BubbleExample extends React.Component<any, any>{
    state = {
        items: 40
    }
    pullingDown() {
        setTimeout(() => {
            if (Math.random() > 0.5) {
                // 如果有新数据
                this.setState({
                    items: 40
                })
            } else {
                // 如果没有新数据
                (this.refs.scroll as any).forceUpdate()
            }
        }, 2000)
    }
    pullingUp() {
        console.log('下拉加载更多')
        setTimeout(() => {
            if (Math.random() > 0.5) {
                // 如果有新数据
                this.setState({
                    items: this.state.items + 5
                })
            } else {
                // 如果没有新数据
                (this.refs.scroll as any).forceUpdate()
            }
        }, 1500)
    }
    render() {
        return (
            <Scroll
                ref="scroll"
                scrollbar={{ fade: true }}
                pullDownRefresh={{ threshold: 90, stop: 40 }}
                pullUpLoad={{ threshold: 0 }}
                startY={0}
                pullingDown={() => this.pullingDown()}
                pullingUp={() => this.pullingUp()}>
                {Array.from(new Array(this.state.items), (el, index) => <p key={index} style={{ height: 100 }}>测试页：{`numbers:${this.state.items}`}</p>)}
            </Scroll>
        )
    }
}
export default BubbleExample