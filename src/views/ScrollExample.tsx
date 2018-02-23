import * as React from 'react'

import Scroll from '../../components/scroll'



class BubbleExample extends React.Component<any, any>{
    state = {
        items: 20
    }
    pullingDown() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                this.setState({
                    items: 30
                })
                resolve()
            }, 2000)
        })
    }
    pullingUp() {
        return new Promise((reslove,reject)=>{
            console.log('下拉加载更多')
            if (this.state.items >= 45) {
                reslove(false)
            } else {
                setTimeout(() => {
                    this.setState({
                        items: this.state.items + 5
                    })
                    reslove(true)
                }, 1500)
            }
        })
        
    }
    render() {
        return (
            <div>
                <h1 style={{ fontSize: 80 }}>测试滚动组件</h1>
                <div style={{ height: "100vh", borderWidth: 1, borderColor: "red", borderStyle: "solid" }}>
                    <Scroll
                        ref="scroll"
                        scrollbar={{ fade: true }}
                        pullDownRefresh={{ threshold: 90, stop: 40 }}
                        pullUpLoad={{ threshold: 0}}
                        startY={0}
                        pullingDown={() => this.pullingDown()}
                        pullingUp={() => this.pullingUp()}>
                        {Array.from(new Array(this.state.items), (el, index) => <p key={index} style={{ height: 100 }}>测试页：{`numbers:${this.state.items}`}</p>)}
                    </Scroll>
                </div>
            </div>
        )
    }
}
export default BubbleExample