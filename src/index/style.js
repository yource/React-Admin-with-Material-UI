import theme from '../static/css/theme.js'

const drawerWidth = 256;
const greyWhite = "rgba(255,255,225,0.8)"

export default {
  drawerWidth,
  root: {
    display: 'flex',
    minHeight: '100vh',
  },
  drawer: {
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  mainContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    background: '#eaeff1',
  },
  mainContent: {
    flex: 1,
    padding: '30px',
    height: "calc(100vh - 100px)"
  },
  paper: {
    width: "100%",
    height: "100%",
    position: "relative",
    overflow: "hidden"
  },
  dashboardPaper: {
    background: "none",
    boxShadow: "none"
  },
  categoryHeader: {
    paddingTop: 16,
    paddingBottom: 16,
    cursor: "pointer",
    color: greyWhite,
    '&:hover': {
      color: theme.palette.common.white
    }
  },
  categoryHeaderActivce:{
    color: theme.palette.primary.main
  },
  categoryHeaderText: {
    color: greyWhite,
    '&:hover': {
      color: theme.palette.common.white
    }
  },
  item: {
    paddingTop: 5,
    paddingBottom: 5,
    color: 'rgba(255, 255, 255, 0.7)',
    "&:hover": {
      color: theme.palette.common.white
    }
  },
  itemActiveItem: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white
    },
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white
    }
  },
  itemPrimary: {
    paddingLeft: "28px",
    color: 'inherit',
    fontSize: theme.typography.fontSize
  },
  divider: {
    marginTop: 0,
    backgroundColor: "rgba(255,255,255,0.05)"
  },
  collapse: {
    backgroundColor: "#0f161d"
  },
  mainMenu: {
    color: theme.palette.common.white
  },
  logo: {
    padding: "16px 0",
    textAlign: "center",
    backgroundColor: "#002140",
    borderBottom: "1px solid rgba(255,255,255,0.1)"
  },
  logoImg: {
    width: "32px",
    verticalAlign: "middle"
  },
  logoSpan: {
    paddingLeft: "10px",
    verticalAlign: "middle",
    fontWeight: "800",
    fontSize: "18px",
    color:theme.palette.common.white
  },
  secondaryBar: {
    zIndex: 0,
  },
  iconButtonAvatar: {
    marginLeft: "10px",
    padding: 4,
  },
  mainHeader: {
    height: "64px",
    backgroundColor: theme.palette.common.white,
    boxShadow: "0 1px 12px rgba(0,0,0,0.2)",
    padding: "12px 20px 0"
  },
  headerButtonRoot: {
    padding: "4px 15px"
  },
  headerButtonLabel: {
    fontSize: "14px"
  }
};