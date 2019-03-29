import React from 'react';
import { itemSize as i18n } from '../../i18n/index.js'
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withSnackbar } from 'notistack';
import { connect } from 'react-redux';
import mask from '../../utils/mask'
import axios from '../../utils/axios'
import Empty from '../../utils/empty'
import rules from '../../utils/formRules'

const mapStateToProps = state => {
    return {
        list: state.itemSize.unit
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setUnit: param => dispatch({ type: "SET_UNIT", param })
    }
}

class Unit extends React.Component {
    state = {
        editState: null,
        editData: {},
        showDialog: false,
        deleteId: ""
    }
    getListData = () => {
        if (this.props.list.length === 0) {
            mask.show();
        }
        axios.get("http://192.168.1.196:8080/itemUnitApi/findItemUnits").then((data) => {
            this.props.setUnit(data)
            mask.hide();
        }, (err) => {
            this.props.enqueueSnackbar(i18n.loadFail + i18n.colon + err, { variant: 'error' });
            mask.hide();
        })
    }

    createItem = () => {
        this.setState({
            editState: "create",
            editData: {}
        })
    }

    inputChange = (key) => (e) => {
        let data = Object.assign({}, this.state.editData, {
            [key]: e.target.value
        });
        this.setState({
            editData: data
        });
        if (this.fromCheck[key]) {
            this.fromCheck[key](e.target.value)
        }
    }

    fromCheck = {
        name: (value) => {
            let err = rules.required(value) || rules.maxSize(value, 99);
            if (err) {
                this.setState({
                    nameError: err,
                    nameShowErr: true
                })
                return false
            } else {
                this.setState({
                    nameError: " ",
                    nameShowErr: false
                })
                return true
            }
        }
    }

    save = () => {
        if (this.fromCheck.name(this.state.editData.name)){
            mask.show();
            axios.post("/itemUnitApi/saveItemUnit", this.state.editData).then((data) => {
                mask.hide();
                this.props.enqueueSnackbar(i18n.saveSuccess, { variant: 'success' });
                this.getListData();
                this.setState({
                    editState: null
                })
            }, (err) => {
                mask.hide();
                this.props.enqueueSnackbar(i18n.saveFail + i18n.colon + err, { variant: 'error' });
            })
        }
    }

    cancelEdit = () => {
        this.setState({
            editState: null
        })
    }

    editItem = (item) => {
        this.setState({
            editState: "edit",
            editData: {
                id: item.id,
                name: item.name,
            }
        })
    }

    openDeleteDialog = (id) => {
        this.setState({
            showDialog: true,
            deleteId: id
        })
    }

    closeDeleteDialog = () => {
        this.setState({
            showDialog: false
        })
    }

    deleteItem() {
        this.setState({
            showDialog: false
        })
        mask.show()
        axios.delete("/itemUnitApi/deleteItemUnit", {
            params: { id: this.state.deleteId }
        }).then(() => {
            this.props.enqueueSnackbar(i18n.deleteSuccess, { variant: 'success' });
            this.getListData();
        }, (err) => {
            this.props.enqueueSnackbar(i18n.deleteFail + i18n.colon + err, { variant: 'error' });
        })
    }

    componentDidMount() {
        this.getListData()
    }

    render() {
        return (
            <React.Fragment>
                <Grid item md={6} xs={12} style={{ padding: "25px" }}>
                    <div className="list">
                        <div className="listHeader">{i18n.unit}</div>
                        <div className="listCon">
                            {this.props.list.length > 0 && (
                                <List>
                                    {this.props.list.map(item => (
                                        <ListItem key={item.id} button onClick={this.editItem.bind(this, item)}>
                                            <ListItemText primary={item.name} />
                                            <ListItemSecondaryAction onClick={this.openDeleteDialog.bind(this, item.id)}>
                                                <IconButton aria-label="Delete">
                                                    <DeleteIcon/>
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    ))}
                                </List>
                            )}
                            {this.props.list.length === 0 && (<Empty />)}
                        </div>
                    </div>
                </Grid>
                <Grid item md={6} xs={12} style={{ padding: "25px" }}>
                    {!this.state.editState && (
                        <div className="editWaitWrap">
                            <div className="editWait">
                                <p>{i18n.editOrCreate}</p>
                                <Button variant="contained" color="primary" className="formButton" onClick={this.createItem.bind(this)}>
                                    {i18n.new}
                                </Button>
                            </div>
                        </div>
                    )}
                    {this.state.editState === "create" && (
                        <div className="editCon">
                            <TextField fullWidth required error={this.state.nameShowErr}
                                label={i18n.name} helperText={this.state.nameError}
                                value={this.state.editData.name} onChange={this.inputChange('name')} />
                            <p style={{ textAlign: "center", paddingTop: "20px" }}>
                                <Button variant="contained" onClick={this.save.bind(this)} style={{ marginRight: "20px" }} color="primary" className="formButton">
                                    {i18n.save}
                                </Button>
                                <Button variant="contained" onClick={this.cancelEdit.bind(this)} className="formButton">
                                    {i18n.cancel}
                                </Button>
                            </p>
                        </div>
                    )}
                    {this.state.editState === "edit" && (
                        <div className="editCon">
                            <TextField fullWidth required error={this.state.nameShowErr}
                                label={i18n.name} helperText={this.state.nameError}
                                value={this.state.editData.name} onChange={this.inputChange('name')} />
                            <p style={{ textAlign: "center", paddingTop: "20px" }}>
                                <Button variant="contained" onClick={this.save.bind(this)} style={{ marginRight: "20px" }} color="primary" className="formButton">
                                    {i18n.save}
                                </Button>
                                <Button variant="contained" onClick={this.cancelEdit.bind(this)} className="formButton">
                                    {i18n.cancel}
                                </Button>
                            </p>
                        </div>
                    )}
                </Grid>
                <Dialog open={this.state.showDialog} onClose={this.closeDeleteDialog} >
                    <DialogTitle>{i18n.notice}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {i18n.confirmDelete}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.deleteItem.bind(this)} color="secondary">
                            {i18n.confirm}
                        </Button>
                        <Button onClick={this.closeDeleteDialog}>
                            {i18n.cancel}
                        </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(Unit))
