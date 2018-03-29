import * as React from 'react'
import Modal from '../../components/modal';




class ModalExample extends React.Component<any, any>{

    constructor(props) {
        super(props);
        this.state = {
            modal1: false,
            modal2: false,
        };
    }

    showModal = key => (e) => {
        e.preventDefault(); // 修复 Android 上点击穿透
        this.setState({
            [key]: true,
        });
    }

    onClose = key => () => {
        this.setState({
            [key]: false,
        });
    }

    onWrapTouchStart(){

    }

    render() {
        return (
            <div style={{ display: 'flex', alignContent: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                <button style={{fontSize:24,height:60}} onClick={this.showModal('modal1')}>basic</button>

                <Modal
                    visible={this.state.modal1}
                    transparent
                    closable
                    maskClosable={false}
                    onClose={this.onClose('modal1')}
                    title="Title"
                    footer={[{ text: 'Ok', onPress: () => { console.log('ok'); this.onClose('modal1')(); } }]}
                    wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                >
                    <div style={{ height: 100, overflow: 'scroll' }}>
                        scoll content...<br />
                        scoll content...<br />
                        scoll content...<br />
                        scoll content...<br />
                        scoll content...<br />
                        scoll content...<br />
                    </div>
                </Modal>
                <button style={{fontSize:24,height:60}} onClick={this.showModal('modal2')}>popup</button>
                <Modal
                    popup
                    visible={this.state.modal2}
                    onClose={this.onClose('modal2')}
                    animationType="slide-up"
                >
                    <div style={{backgroundColor:'#fff',height:500}}>
                        我的天
                    </div>
                </Modal>
            </div>
        )
    }
}
export default ModalExample