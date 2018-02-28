

import * as React from 'react'
import NavBar from '../../components/navbar'
import Icon from '../../components/icon'
export default class NavBarExample extends React.Component<any, any>{



    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
                <NavBar
                    mode="niuniu"
                    icon={<Icon type="left" />}
                    onLeftClick={() => console.log('onLeftClick')}
                    rightContent={[
                        <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
                        <Icon key="1" type="ellipsis" />,
                    ]}
                >NavBar</NavBar>
            </div>
        );
    }
}