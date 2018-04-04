import * as React from 'react'

import Toast from '../../components/toast'



class ToastExample extends React.Component<any, any>{
 
    render() {
        return (
            <div style={{display:'flex',alignContent:'center',justifyContent:'center',flexDirection:'column'}}>
                <h1 style={{ fontSize: 80 }}>测试toast组件</h1>
                <button style={{width:'80%',height:80,backgroundColor:'#e4e3e5'}} onClick={()=>{
                    Toast.show("测试toast组件aaaaaaaaaaaaaaaa")
                }}>测试show</button>
                <button style={{width:'80%',height:80,backgroundColor:'#e4e3e5'}} onClick={()=>{
                    Toast.info("测试toast组件",true)
                }}>测试info</button>
                 <button style={{width:'80%',height:80,backgroundColor:'#e4e3e5'}} onClick={()=>{
                    Toast.success("测试toast组件",true)
                }}>测试success</button>
                 <button style={{width:'80%',height:80,backgroundColor:'#e4e3e5'}} onClick={()=>{
                    Toast.warning("测试toast组件",true)
                }}>测试warning</button>
                 <button style={{width:'80%',height:80,backgroundColor:'#e4e3e5'}} onClick={()=>{
                    Toast.loading("")
                }}>测试loading</button>
                 <button style={{width:'80%',height:80,backgroundColor:'#e4e3e5'}} onClick={()=>{
                    Toast.error("测试toast组件")
                }}>测试error</button>
            </div>
        )
    }
}
export default ToastExample