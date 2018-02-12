

import * as React from 'react'
import Dialog from '../../components/dialog'
import LazyLoad from '../../components/lazyload/LazyLoad'
import Loading from '../../components/loading'
export default class Home extends React.Component<any, any>{



    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
                <Loading size={20} />
                <Loading size={24} />
                <Loading size={30} />
            </div>
        );
    }
}