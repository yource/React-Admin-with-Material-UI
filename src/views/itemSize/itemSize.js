import React from 'react';
import { itemSize as i18n } from '../../i18n/index.js'
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Size from './size'
import Unit from './unit'

class ItemSize extends React.Component {
    state = {
        tab: 0
    };
    changeTab = (event, newTab) => {
        this.setState({ tab: newTab });
    };

    componentDidMount() {}

    render() {
        return (
            <Grid container direction="column" className="Page">
                <Grid item>
                    <Tabs value={this.state.tab} onChange={this.changeTab} variant="scrollable" scrollButtons="off">
                        <Tab label={i18n.weight} />
                        <Tab label={i18n.unit} />
                    </Tabs>
                </Grid>
                <Grid item container style={{ flex: 1 }}>
                    {this.state.tab === 0 && (
                        <Size/>
                    )}
                    {this.state.tab === 1 && (
                        <Unit/>
                    )}
                </Grid >
            </Grid>
        )
    }
}

export default ItemSize;