import * as React from 'react'
import Dialog from '../../components/dialog';




class DialogExample extends React.Component<any, any>{
    modalInput: any;

    state = {
        visible: false,
        visible2: false,
        center: false,
    };

    dialog: Dialog;

    componentDidMount() {
        this.dialog.componentWillUnmount();
    }

    onClick = () => {
        this.setState({
            visible: true,
        });
    }
    onClose = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }
    center = (e) => {
        this.setState({
            center: e.target.checked,
        });
    }
    showDialog2 = () => {
        this.setState({
            visible2: true,
        });
    }
    showDialog = ()=>[

    ]
    render() {
        let dialog;
        let wrapClassName = '';
        if (this.state.center) {
            wrapClassName = 'center';
        }
        // if (!this.state.visible) {
        // dialog = null;
        // } else {
        dialog = (
            <Dialog
                ref={(dom: any) => this.dialog = dom}
                visible={this.state.visible}
                wrapClassName={wrapClassName}
                animation="zoom"
                maskAnimation="fade"
                closable={true}
                onClose={this.onClose}
            >
                <input ref={el => this.modalInput = el} />
                <p onClick={this.showDialog2}>click to show dialog2</p>
                <div style={{ height: 200 }}></div>
            </Dialog>
        );
        const dialog2 = (
            <Dialog
                visible={this.state.visible2}
                animation="zoom"
                maskAnimation="fade"
                onClose={() => {
                    this.setState({
                        visible2: false,
                    });
                }}
            >
                <input ref={el => this.modalInput = el} />
                <p>basic modal</p>
                <div style={{ height: 200 }}></div>
            </Dialog>
        );
        // }
        return (
            <div style={{ width: '90%', margin: '0 auto',fontSize:60 }}>
                <style>
                    {
                        `
              .center {
                display: flex;
                align-items: center;
                justify-content: center;
              }
              `
                    }
                </style>
                <p>
                    <button
                        style={{fontSize:30}}
                        onClick={this.onClick}
                    >
                        show dialog
            </button>
                    &nbsp;
            <label>center
              <input
                            type="checkbox"
                            checked={this.state.center}
                            onChange={this.center}
                        />
                    </label>
                </p>
                {dialog}
                {dialog2}
            </div>
        );
    }
}

export default DialogExample