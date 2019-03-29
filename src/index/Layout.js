/**************** import all the dependencies ****************/
import React from 'react';
import { connect } from 'react-redux';

// 引入样式组件和自定义主题
import { MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import theme from '../static/css/theme'
import style from './style'

// 引入react-router和自定义路由
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import route from '../router'

// 引入Material组件
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Tooltip from '@material-ui/core/Tooltip';

// 引入Material Icon
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

// 引入其他组件
import { withSnackbar } from 'notistack';
import PageFrame from './PageFrame'
import Dashboard from '../views/dashboard/dashboard'
import axios from '../utils/axios'
import date from '../utils/date'

// 引入国际化字段
import { layout as i18n } from '../i18n'

/**************** import END ****************/

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
    setVersionTags: param => dispatch({ type: "SET_VERSIONTAGS", param })
  }
}
// 可选的国际化语言
const languages = [{
  label: "English",
  key: "en"
}, {
  label: "中文",
  key: "zh-cn"
}, {
  label: "繁體中文",
  key: "zh-Hant"
}, {
  label: "español",
  key: "es"
}, {
  label: "한국어",
  key: "ko"
}, {
  label: "tiếng việt",
  key: "vi"
}]

class Layout extends React.Component {
  state = {
    mobileOpen: false,
    menuOpen: "",
    menuSelect: "",
    breadcrumb: [],
    languageAnchorEl: null,
    userAnchorEl: null,
    language: "Englash",
    showTagDialog: false,
    tagName: ""
  };

  // 根据url解析当前指向的路由
  getCrumb = () => {
    let pathname = window.location.pathname;
    if (pathname === "/") {
      this.setState({
        menuOpen: "Restaurant"
      })
    } else if ((pathname !== "") && (pathname !== this.state.menuSelect)) {
      Object.keys(route).forEach((parentKey) => {
        const children = route[parentKey].children;
        Object.keys(children).forEach((subKey) => {
          if (children[subKey].url === pathname) {
            this.setState({
              breadcrumb: [i18n[route[parentKey].id], i18n[children[subKey].id]],
              menuOpen: route[parentKey].id,
              menuSelect: children[subKey].url
            })
          }
        })
      })
    }
  }

  // 菜单点击事件
  clickMenuTitle = (id) => {
    this.setState({
      menuOpen: this.state.menuOpen === id ? "" : id
    })
  }
  toLink = (parentId, item) => {
    if (item) {
      this.setState({
        menuSelect: item.url,
        breadcrumb: [i18n[parentId], i18n[item.id]],
        menuOpen: parentId,
        mobileOpen: false
      })
    } else {
      this.setState({
        menuSelect: "",
        breadcrumb: [""],
        menuOpen: "Restaurant",
        mobileOpen: false
      })
    }
  }

  // 小屏模式下，菜单的收缩/展开
  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  }

  // 选择语言 用户菜单
  showLanguages = event => {
    this.setState({ languageAnchorEl: event.currentTarget });
  };
  showUserMenu = (e) => {
    this.setState({ userAnchorEl: e.currentTarget });
  }
  chooseLanguage = (item) => {
    this.setState({
      languageAnchorEl: null,
      language: item.label
    });
    if (window.storage.getItem("locale") !== item.key) {
      window.storage.setItem("locale", item.key);
      window.location.reload()
    }
  };
  closeMenu = () => {
    this.setState({
      languageAnchorEl: null,
      userAnchorEl: null
    })
  }
  logout = () => {
    window.storage.removeItem("merchantId");
    window.location = window.location.href + "login.html"
  }

  openTagDialog = () => {
    this.setState({
      showTagDialog: true
    })
  }

  closeTagDialog = () => {
    this.setState({
      showTagDialog: false
    })
  }

  inputChange = (e) => {
    this.setState({
      tagName: e.target.value
    })
  }

  makeTag = () => {
    this.setState({
      showTagDialog: false
    });
    axios.post("/tagManagementApi/saveTagManagement", { name: this.state.tagName }).then(() => {
      this.props.enqueueSnackbar(i18n.saveSuccess, { variant: 'success' });
      axios.get("/tagManagementApi/findTagManagements").then((data) => {
        this.props.setVersionTags(data.map((item) => {
          item.time = date.getUTC(item.createdOn)
          return item;
        }).reverse())
      })
    }, (err) => {
      this.props.enqueueSnackbar(i18n.saveFail + i18n.colon + err, { variant: 'error' });
    })
  }

  componentDidMount() {
    this.getCrumb();
    for (var i = 0; i < languages.length; i++) {
      if (languages[i].key === window.storage.getItem("locale")) {
        this.setState({ language: languages[i]["label"] })
        return;
      }
    }
  }

  render() {
    const { classes } = this.props;
    const drawer = (
      <React.Fragment>
        <Link to="/" onClick={this.toLink.bind(this, "", "")}>
          <div className={classes.logo}>
            <img alt="Menusifu" src={require('../static/images/logo.png')} className={classes.logoImg} />
            <span className={classes.logoSpan}>Menusifu Cloud</span>
          </div>
        </Link>
        <List disablePadding>
          {route.map(({ id, icon, children }) => (
            <React.Fragment key={id}>
              <ListItem className={classes.categoryHeader} onClick={this.clickMenuTitle.bind(this, id)}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText inset primary={i18n[id]} classes={{
                  primary: classes.categoryHeaderText
                }} />
                {this.state.menuOpen === id ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse key={id} in={this.state.menuOpen === id} timeout="auto" unmountOnExit className={classes.collapse}>
                {children.map((item) => {
                  return (
                    <Link key={item.id} to={item.url}>
                      <ListItem button className={classNames(classes.item, this.state.menuSelect === item.url && classes.itemActiveItem)}
                        onClick={this.toLink.bind(this, id, item)}>
                        <ListItemText classes={{ primary: classes.itemPrimary }} >
                          {i18n[item.id]}
                        </ListItemText>
                      </ListItem>
                    </Link>
                  )
                })}
              </Collapse>
              <Divider className={classes.divider} />
            </React.Fragment>
          ))}
        </List>
      </React.Fragment>
    )

    return (
      <MuiThemeProvider theme={theme}>
        <React.Fragment>
          <Router>
            <div className={classes.root}>

              <nav className={classes.drawer}>
                <Hidden mdUp>
                  <Drawer variant="temporary" PaperProps={{ style: { width: style.drawerWidth } }} open={this.state.mobileOpen} onClose={this.handleDrawerToggle}>{drawer} </Drawer>
                </Hidden>
                <Hidden smDown>
                  <Drawer variant="permanent" PaperProps={{ style: { width: style.drawerWidth } }}>{drawer} </Drawer>
                </Hidden>
              </nav>

              <div className={classes.mainContainer}>
                <div className={classes.mainHeader}>
                  <Grid container alignItems="center">
                    <Hidden mdUp>
                      <Grid item>
                        <IconButton aria-label="Open drawer" onClick={this.handleDrawerToggle} >
                          <MenuIcon />
                        </IconButton>
                      </Grid>
                    </Hidden>
                    <Grid item xs>
                      {this.state.breadcrumb && this.state.breadcrumb.length > 1 ? (<span style={{ color: "rgba(0,0,0,0.75)", fontSize: "14px" }}><i style={{ fontStyle: "normal", color: "rgba(0,0,0,0.45)" }}>{this.state.breadcrumb[0] + " / "} </i>{this.state.breadcrumb[1]}</span>) : ""}
                    </Grid>
                    <Grid item>
                      <Tooltip title={i18n.tagDescription}>
                        <Button variant="contained" color="primary" style={{ marginRight: "20px" }} 
                          classes={{ label: classes.headerButtonLabel,root:classes.headerButtonRoot}}
                          onClick={this.openTagDialog.bind(this)}>
                          {i18n.backup}
                        </Button>
                      </Tooltip>
                      <Button variant="contained" aria-owns={this.state.languageAnchorEl ? 'languageMenu' : undefined}
                        aria-haspopup="true" onClick={this.showLanguages.bind(this)} 
                        classes={{ label: classes.headerButtonLabel, root: classes.headerButtonRoot }}>
                        {this.state.language}
                      </Button>
                    </Grid>
                    <Grid item>
                      <IconButton className={classes.iconButtonAvatar} aria-owns={this.state.userAnchorEl ? 'userMenu' : undefined}
                        aria-haspopup="true" onClick={this.showUserMenu.bind(this)}>
                        <Avatar className={classes.avatar} src={require('../static/images/user.png')} />
                      </IconButton>
                    </Grid>
                  </Grid>
                  <Menu id="languageMenu" anchorEl={this.state.languageAnchorEl} open={!!this.state.languageAnchorEl} onClose={this.closeMenu} >
                    {
                      languages.map((item) => (
                        <MenuItem key={item.key} onClick={this.chooseLanguage.bind(this, item)}>{item.label}</MenuItem>
                      ))
                    }
                  </Menu>
                  <Menu id="userMenu" anchorEl={this.state.userAnchorEl} open={!!this.state.userAnchorEl} onClose={this.closeMenu} >
                    <MenuItem onClick={this.logout.bind(this)}>{i18n.logout}</MenuItem>
                  </Menu>
                </div>

                <main className={classes.mainContent}>
                  <Paper id="paper" className={classNames(classes.paper, !this.state.menuSelect && classes.dashboardPaper)}>
                    <Route exact path="/" component={Dashboard} />
                    {
                      route.map((items) => {
                        return items.children.map((item) => {
                          if (typeof item.page !== "string") {
                            return (
                              <Route key={item.id} path={item.url} component={item.page} />
                            )
                          }
                        });
                      })
                    }
                    <Route path="/oldPages" component={PageFrame} />
                  </Paper>
                </main>
              </div>
            </div>
          </Router>
          <Dialog open={this.state.showTagDialog} onClose={this.closeTagDialog} aria-labelledby="dialog-title" >
            <DialogTitle id="customized-dialog-title" onClose={this.closeTagDialog}>
              {i18n.notice}
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                {i18n.tagTip}
              </DialogContentText>
              <TextField onChange={this.inputChange.bind(this)} autoFocus margin="dense" label={i18n.description} fullWidth vuale={this.state.tagName} />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.makeTag} color="primary">
                {i18n.confirm}
              </Button>
              <Button onClick={this.closeTagDialog}>
                {i18n.cancel}
              </Button>
            </DialogActions>
          </Dialog>
        </React.Fragment>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(style)(connect(mapStateToProps, mapDispatchToProps)(withSnackbar(Layout)));
