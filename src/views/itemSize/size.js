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
        list: state.itemSize.size
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setSize: param => dispatch({ type: "SET_SIZE", param }),
        setUnit: param => dispatch({ type: "SET_UNIT", param })
    }
}

class Size extends React.Component {
    state = {
        editState: null,
        editData: {},
        showDialog: false,
        deleteId: "",
        nameError: "",
        rules: {
            name: ["require"]
        }
    }
    getListData = () => {
        if (this.props.list.length === 0) {
            mask.show();
        }
        axios.get("/itemSizeApi/findItemSizes").then((data) => {
            this.props.setSize(data)
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
            [key]: e.target.value.trim()
        });
        this.setState({
            editData: data
        });
        if (this.validate[key]) {
            this.validate[key](e.target.value.trim())
        }
    }

    validate = {
        name: (value) => {
            let err = rules.required(value) || rules.maxLength(value, 99);
            this.setState({
                nameError: err
            })
            return !err;
        }
    }

    save = () => {
        if (this.validate.name(this.state.editData.name)) {
            // if (this.validate.name(this.state.editData.name)) {
            mask.show();
            axios.post("/itemSizeApi/saveItemSize", this.state.editData).then((data) => {
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
                shortName: item.shortName
            },
            nameError: " "
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
        axios.delete("/itemSizeApi/deleteItemSize", {
            params: { id: this.state.deleteId }
        }).then(() => {
            this.props.enqueueSnackbar(i18n.deleteSuccess, { variant: 'success' });
            this.getListData();
        }, (err) => {
            this.props.enqueueSnackbar(i18n.deleteFail + i18n.colon + err, { variant: 'error' });
        })
    }

    componentDidMount() {
        this.getListData();
        // 同时加载其他tab页的数据
        axios.get("/itemUnitApi/findItemUnits").then((data) => {
            this.props.setUnit({
                list: data
            })
        })
    }

    render() {
        return (
            <React.Fragment>
                <Grid item md={6} xs={12} style={{ padding: "25px" }}>
                    <div className="list">
                        <div className="listHeader">{i18n.weight}</div>
                        <div className="listCon">
                            {this.props.list.length > 0 && (
                                <List>
                                    {this.props.list.map(item => (
                                        <ListItem key={item.id} button onClick={this.editItem.bind(this, item)}>
                                            <ListItemText primary={item.shortName || item.name} />
                                            <ListItemSecondaryAction onClick={this.openDeleteDialog.bind(this, item.id)}>
                                                <IconButton aria-label="Delete">
                                                    <DeleteIcon />
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
                            <TextField fullWidth required error={this.state.nameError}
                                label={i18n.name} helperText={this.state.nameError || " "}
                                value={this.state.editData.name} onChange={this.inputChange('name')} />
                            <TextField fullWidth style={{ marginTop: "20px" }}
                                label={i18n.shortName} multiline
                                value={this.state.editData.shortName} onChange={this.inputChange('shortName')} />
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
                            <TextField fullWidth required error={this.state.nameErr}
                                label={i18n.name} helperText={this.state.nameError || " "}
                                value={this.state.editData.name} onChange={this.inputChange('name')} />
                            <TextField fullWidth style={{ marginTop: "20px" }}
                                label={i18n.shortName} multiline
                                value={this.state.editData.shortName} onChange={this.inputChange('shortName')} />
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

export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(Size))
