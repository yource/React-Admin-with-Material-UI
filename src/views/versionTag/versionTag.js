import React from 'react';
import { versionTag as i18n } from '../../i18n/index.js'
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { withSnackbar } from 'notistack';
import { connect } from 'react-redux';
import axios from '../../utils/axios'
import mask from '../../utils/mask'
import date from '../../utils/date'
import Empty from '../../utils/empty'

const mapStateToProps = state => {
    return {
        list: state.versionTag
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setVersionTags: param => dispatch({ type: "SET_VERSIONTAGS", param })
    }
}

const styles = theme => ({
    root: {
        padding: "20px"
    },
    theader: {
        fontSize: "1rem"
    },
    button: {
        fontSize: "15px",
        float: "right"
    },
    header: {
        marginBottom: "20px"
    },
    table: {
        borderRadius: "6px",
        overflow: "hidden",
        boxSizing: "border-box",
        boxShadow: " 0 2px 6px rgba(0,0,0,0.2)"
    },
    tableCell: {
        borderBottom: "1px solid rgba(0,0,0,0.05)"
    },
    operateBtn: {}
});

class VersionTag extends React.Component {
    state = {
        show: false,
        tagName: "",
        deleteId: "",
        showDelete: false,
        showEdit: false,
        editData: { name: "" }
    }

    getList = () => {
        if (this.props.list.length === 0) {
            mask.show();
        }
        axios.get("/tagManagementApi/findTagManagements").then((data) => {
            this.props.setVersionTags(data.map((item) => {
                item.time = date.getUTC(item.createdOn)
                return item;
            }).reverse())
            mask.hide();
        }, (err) => {
            this.props.enqueueSnackbar(i18n.loadFail + i18n.colon + err, { variant: 'error' });
            mask.hide();
        })
    }

    showDialog = () => {
        this.setState({
            show: true
        })
    }

    closeDialog = () => {
        this.setState({
            show: false,
            showEdit: false,
            showDelete: false
        })
    }

    inputChange = (e) => {
        this.setState({
            tagName: e.target.value
        })
    }

    makeTag = () => {
        axios.post("/tagManagementApi/saveTagManagement", { name: this.state.tagName }).then(() => {
            this.props.enqueueSnackbar(i18n.saveSuccess, { variant: 'success' });
            this.setState({
                show: false
            });
            this.getList();
        }, (err) => {
            this.props.enqueueSnackbar(i18n.saveFail + i18n.colon + err, { variant: 'error' });
        })
    }

    openEditDialog = (data) => {
        this.setState({
            showEdit: true,
            editData: data
        })
    }

    editName = (e) => {
        this.setState({
            editData: Object.assign({}, this.state.editData, {
                name: e.target.value
            })
        })
    }

    updateTag = () => {
        axios.put("/tagManagementApi/updateTagManagement", this.state.editData).then(() => {
            this.props.enqueueSnackbar(i18n.saveSuccess, { variant: 'success' });
            this.closeDialog();
            this.getList();
        }, (err) => {
            this.props.enqueueSnackbar(i18n.saveFail + i18n.colon + err, { variant: 'error' });
        })
    }

    openDeleteDialog = (id) => {
        this.setState({
            showDelete: true,
            deleteId: id
        })
    }

    deleteVersion = () => {
        axios.delete("/tagManagementApi/deleteTagManagement", {
            params: { mid: this.state.deleteId }
        }).then(() => {
            this.props.enqueueSnackbar(i18n.saveSuccess, { variant: 'success' });
            this.setState({
                showDelete: false
            });
            this.getList();
        }, (err) => {
            this.props.enqueueSnackbar(i18n.saveFail + i18n.colon + err, { variant: 'error' });
        })
    }

    componentDidMount() {
        this.getList()
    }
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <div className={classes.header}>
                    <p style={{ lineHeight: "38px" }}>
                        <span>{i18n.tagDescription}</span>
                        <Button variant="contained" color="primary" className={classes.button} onClick={this.showDialog}>{i18n.createBackup}</Button>
                    </p>
                </div>
                <Table className={classes.table}>
                    <TableHead style={{ backgroundColor: "rgb(247, 250, 241)" }}>
                        <TableRow>
                            <TableCell className={classes.theader}>{i18n.name}</TableCell>
                            <TableCell className={classes.theader}>{i18n.description}</TableCell>
                            <TableCell className={classes.theader}>{i18n.time}</TableCell>
                            <TableCell className={classes.theader}>{i18n.operation}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.list.length > 0 && this.props.list.map(row => (
                            <TableRow key={row.mid}>
                                <TableCell className={classes.tableCell} component="th" scope="row">{row.tag} </TableCell>
                                <TableCell className={classes.tableCell}>{row.name}</TableCell>
                                <TableCell className={classes.tableCell}>{row.time}</TableCell>
                                <TableCell className={classes.tableCell} style={{ width: "180px" }}>
                                    <Tooltip title={i18n.edit}>
                                        <IconButton onClick={this.openEditDialog.bind(this, row)} className={classes.operateBtn} aria-label={i18n.edit}>
                                            <EditIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title={i18n.delete}>
                                        <IconButton onClick={this.openDeleteDialog.bind(this, row.mid)} className={classes.operateBtn} aria-label={i18n.delete}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        ))}
                        {this.props.list.length === 0 && (
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell><Empty /></TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>

                <Dialog open={this.state.show} onClose={this.closeDialog} aria-labelledby="dialog-title" >
                    <DialogTitle id="customized-dialog-title">
                        {i18n.notice}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {i18n.tagTip}
                        </DialogContentText>
                        <TextField onChange={this.inputChange.bind(this)} autoFocus margin="dense" label={i18n.description} fullWidth value={this.state.tagName} />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.makeTag} color="primary">
                            {i18n.confirm}
                        </Button>
                        <Button onClick={this.closeDialog}>
                            {i18n.cancel}
                        </Button>
                    </DialogActions>
                </Dialog>

                <Dialog open={this.state.showDelete} onClose={this.closeDialog} aria-labelledby="dialog-title" >
                    <DialogTitle id="customized-dialog-title">
                        {i18n.notice}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {i18n.confirmToDelete}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.deleteVersion} color="secondary">
                            {i18n.confirm}
                        </Button>
                        <Button onClick={this.closeDialog}>
                            {i18n.cancel}
                        </Button>
                    </DialogActions>
                </Dialog>

                <Dialog open={this.state.showEdit} onClose={this.closeDialog} aria-labelledby="dialog-title" >
                    <DialogTitle id="customized-dialog-title">
                        {i18n.edit}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {i18n.tagTip}
                        </DialogContentText>
                        <TextField onChange={this.editName.bind(this)} autoFocus margin="dense" label={i18n.description} fullWidth value={this.state.editData.name} />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.updateTag} color="primary">
                            {i18n.confirm}
                        </Button>
                        <Button onClick={this.closeDialog}>
                            {i18n.cancel}
                        </Button>
                    </DialogActions>
                </Dialog>

            </div>
        )
    }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(withSnackbar(VersionTag)))