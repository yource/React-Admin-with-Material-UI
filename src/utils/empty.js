import React from 'react';
import {common as i18n} from '../i18n'

class Empty extends React.Component {
    render() {
        return (
            <div className="emptyComponent">
                <img src={require("../static/images/empty.png")} />
                <p>{i18n.empty}</p>
            </div>
        )
    }
}

export default Empty;