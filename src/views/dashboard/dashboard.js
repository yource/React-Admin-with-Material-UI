// 欢迎页，默认显示
import React from 'react';
import "./dashboard.scss"
// import { withRouter } from 'react-router-dom';
import { dashboard as i18n} from '../../i18n/index.js'

export default class welcome extends React.Component {
    componentDidMount(){
        
    }
    render (){
        return (
            <div className="DashboardPage">
                <img className="logo" alt="MENUSIFU" src={require('../../static/images/logo.png')} />
                <p className="title">{i18n.title}</p>
                <p className="subTitle">{i18n.subTitle}</p>
            </div>
        )
    }
}
