import * as React from 'react'

import Toast from '../../components/toast'



class ToastExample extends React.Component<any, any>{
 
    render() {
        return (
            <div style={{display:'flex',alignContent:'center',justifyContent:'center',flexDirection:'column'}}>
                <h1 style={{ fontSize: 80 }}>测试toast组件</h1>
                <button style={{width:'80%',height:80,backgroundColor:'#e4e3e5'}} onClick={()=>{
                    Toast.show("测试toast组件")
                }}>测试show</button>
                <div style={{height:2800,backgroundColor:'red'}}>

                </div>
                <button style={{width:'80%',height:80,backgroundColor:'#e4e3e5'}} onClick={()=>{
                    Toast.show("测试toast组件",true)
                }}>测试show</button>
            </div>
        )
    }
}
export default ToastExample